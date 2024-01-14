// Selecting DOM elements
const addToCartButtons = document.querySelectorAll('.add-to-cart'); // Select all add-to-cart buttons
const cartIcon = document.getElementById('cart-icon'); // Select the cart icon
const cart = document.querySelector('.cart'); // Select the cart container
const closeCartButton = document.getElementById('close-cart'); // Select the close cart button
const placeOrderButton = document.getElementById('place-order'); // Select the place order button
const cartItemsContainer = document.querySelector('.cart-items'); // Select the container for cart items
const cartTotal = document.getElementById('cart-total'); // Select the cart total display
const selectedItemsCount = document.getElementById('selected-items-count'); // Select the selected items count display

// Initialize cart-related variables
let cartItems = []; // Array to store items in the cart
let total = 0; // Total price of items in the cart
let selectedTotal = 0; // Total price of selected items in the cart

// Set the initial cart total display
cartTotal.textContent = formatPrice(total);

// Function to format price as currency
function formatPrice(price) {
    return price.toLocaleString('en-PH', { style: 'currency', currency: 'PHP' });
}

// Function to get available stock from a product element
function getAvailableStock(product) {
    const stockElement = product.querySelector('.product-stock');
    const stockText = stockElement.textContent;
    const stockMatch = stockText.match(/\d+/); // Extract the number (0 to 9) from the text
    return stockMatch ? +(stockMatch[0]) : 0;
}

// Function to update the stock display for a product
function updateStockDisplay(product, availableStock) {
    const stockElement = product.querySelector('.product-stock');
    stockElement.textContent = `Available Stock: ${availableStock}`;
}

// Event listener for adding items to the cart
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productName = product.querySelector('h2').textContent;
        const productPriceElement = product.querySelector('.product-price');
        const productPrice = +(productPriceElement.textContent.replace('Price: ₱', '').replace(',', ''));
        const availableStock = getAvailableStock(product);

        const existingItemIndex = cartItems.findIndex(item => item.name === productName);

        // Check if the item already exists in the cart
        if (existingItemIndex !== -1) {
            if (cartItems[existingItemIndex].quantity < availableStock) {
                cartItems[existingItemIndex].quantity++;
            } else {
                alert(`You've reached the maximum available stock for ${productName}.`);
            }
        } else {
            // Add the item to the cart
            cartItems.push({ name: productName, price: productPrice, quantity: 1, maxStock: availableStock, selected: false });
        }

        total += productPrice;
        updateStockDisplay(product, availableStock);
        updateCartDisplay();

        cart.classList.add('active'); // Show the cart when an item is added
    });
});

// Function to update the display of items in the cart
function updateCartDisplay() {
    cartItemsContainer.innerHTML = ''; // Clear the cart container

    cartItems.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        const cartItemContent = document.createElement('div');
        cartItemContent.classList.add('cart-item-content');
        cartItemContent.innerHTML = `
            <input type="checkbox" class="item-checkbox" data-index="${index}" ${item.selected ? 'checked' : ''} />
            <span class="cart-item-name">${item.name} - ${formatPrice(item.price)}</span> <br>
            <input type="number" class="cart-quantity-input" value="${item.quantity}" min="1" max="${item.maxStock}">
            <strong><span class="cart-item-total"> = ${formatPrice(item.price * item.quantity)}</span></strong>
            <div class="cart-item-options">
                <br> <button class="delete-item" data-index="${index}">Delete</button>
            </div>
        `;

        cartItem.appendChild(cartItemContent);
        cartItemsContainer.appendChild(cartItem);

        // Event listener for quantity input change
        cartItemContent.querySelector('.cart-quantity-input').addEventListener('change', (e) => {
            const newQuantity = +(e.target.value);

            // Check if the entered quantity is within the available stock range
            if (newQuantity >= 1 && newQuantity <= item.maxStock) {
                cartItems[index].quantity = newQuantity;
                total = calculateTotal(); // Recalculate the total price
                updateCartDisplay();
            } else {
                alert(`Please enter a valid quantity for ${item.name}.`);
                e.target.value = cartItems[index].quantity;
            }
        });

        // Event listener for deleting an item from the cart
        cartItemContent.querySelector('.delete-item').addEventListener('click', () => {
            if (confirm(`Are you sure you want to delete ${item.name} from your cart?`)) {
                // Subtract the item's price from selectedTotal if it was selected
                if (item.selected) {
                    selectedTotal -= item.price * item.quantity;
                }
                cartItems.splice(index, 1); // Remove the item from the cartItems array
                total = calculateTotal(); // Recalculate the total price
                updateCartDisplay();
                updateSelectedItemsCount();

                cartTotal.textContent = formatPrice(selectedTotal);
            }
        });

        // Event listener for checkbox changes
        cartItemContent.querySelector('.item-checkbox').addEventListener('change', (e) => {
            const itemIndex = +(e.target.dataset.index);
            const isChecked = e.target.checked;

            // Update the 'selected' property based on checkbox state
            cartItems[itemIndex].selected = isChecked;

            if (isChecked) {
                // If the checkbox is checked, add the item's price to the selectedTotal.
                selectedTotal += item.price * item.quantity;
            } else {
                // If the checkbox is unchecked/deleted, subtract the item's price from selectedTotal.
                selectedTotal -= item.price * item.quantity;
            }

            // Set the cart total to the total for selected items.
            cartTotal.textContent = formatPrice(selectedTotal);

            updateSelectedItemsCount();
        });
    });
}

// Event listener for closing the cart
closeCartButton.addEventListener('click', () => {
    cart.classList.remove('active');
});

// Event listener for placing an order
placeOrderButton.addEventListener('click', () => {
    const selectedItems = cartItems.filter((item) => item.selected);

    if (selectedItems.length === 0) {
        alert('Please select items to place the order.');
        return; // Don't proceed without selected items.
    }

    const poNumber = generatePONumber(); // Generate a unique PO number

    // Create a reference to the order details page
    const orderDetailsPage = window.open('order_details.html', '_blank');

    // Calculate the total price only for selected items
    total = selectedItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);

    // Populate the order details page with the selected items and PO number
    orderDetailsPage.onload = () => {
        const orderTable = orderDetailsPage.document.getElementById('order-table');
        const orderDetailsBody = orderDetailsPage.document.getElementById('order-details-body');
        const poNumberElement = orderDetailsPage.document.getElementById('po-number');

        poNumberElement.textContent = poNumber;

        selectedItems.forEach((item) => {
            const row = orderDetailsBody.insertRow();
            const productNameCell = row.insertCell(0);
            const priceCell = row.insertCell(1);
            const quantityCell = row.insertCell(2);
            const totalCell = row.insertCell(3);

            productNameCell.textContent = item.name;
            priceCell.textContent = formatPrice(item.price);
            quantityCell.textContent = item.quantity;
            totalCell.textContent = formatPrice(item.price * item.quantity);
        });
    };

   // Remove selected items from the cartItems array
   cartItems = cartItems.filter((item) => !item.selected);
   updateCartDisplay();
   updateSelectedItemsCount();

   // Reset selectedTotal to zero
   total = 0;
   selectedTotal = 0;

   // Update text content
   cartTotal.textContent = formatPrice(total);

   cart.classList.remove('active'); // Hide the cart after placing the order
});

// Event listener for showing/hiding the cart
cartIcon.addEventListener('click', () => {
    cart.classList.toggle('active');
});

// Function to generate a unique PO number
function generatePONumber() {
    return `PO-${Math.floor(Math.random() * 1000000)}`;
}

// Function to calculate the total price of items in the cart
function calculateTotal() {
    return cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0);
}

// Function to update the selected items count display
function updateSelectedItemsCount() {
    const selectedCount = cartItems.filter((item) => item.selected).length;
    selectedItemsCount.textContent = `${selectedCount} item${selectedCount !== 1 ? 's' : ''} selected`;
}

// Initial update of the cart display
updateCartDisplay();
