const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const body = document.querySelector('body');
const listCard = document.querySelector('.listCard')
const cartQuantity = document.querySelector('.cart-quantity')
const container = document.getElementById('products-container');
const checkoutCard = document.querySelector('.checkoutCard')

function fetchAllProducts() {
    fetch('https://ch-lead.onrender.com/customers/getAllProducts')
        .then(res => res.json())
        .then(productData => {
            populateProduct(productData);
            populateCart();
        })
        .catch(error => {
            console.error('Error', error)
        })
}
fetchAllProducts();

function populateProduct(data) {
    const list = document.querySelector('.list');
    const list2 = document.querySelector('.list-2');
    const list3 = document.querySelector('.list-3');
    const list4 = document.querySelector('.list-4');
    const list5 = document.querySelector('.list-5');
    const listCard = document.querySelector('.listCard');
    const cartQuantity = document.querySelector('.cart-quantity');
   

    data.products.forEach((value) => {
        if (value.category == 'Valve') {
            let newDiv = document.createElement('div');
            newDiv.className = 'productItem'; 
            console.log(value.productImage);
                      
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${value._id}"> ${value.productAmount}</div></div> 
                <button onclick="addToCart('${value._id}')" id="${value._id}" class="btnProduct" >Add to Cart</button>            
                `;
            list.appendChild(newDiv);

        } else if (value.category == 'Pumps') {
            let newDiv = document.createElement('div');
            newDiv.className = 'productItem'; 
                       
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${value._id}"> ${value.productAmount}</div></div>              
                <button onclick="addToCart('${value._id}')" id="${value._id}"  class="btnProduct" type="button">Add to Cart</button>            
                `;
            list2.appendChild(newDiv);

        } else if (value.category == 'Automation') {
            let newDiv = document.createElement('div');
            newDiv.className = 'productItem'; 
                       
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${value._id}"> ${value.productAmount}</div></div>            
                <button onclick="addToCart('${value._id}')" id="${value._id}"  class="btnProduct" type="button">Add to Cart</button> 
                            
                `;
            list3.appendChild(newDiv);
        } else if (value.category == 'Industrial') {
            let newDiv = document.createElement('div');
            newDiv.className = 'productItem';  
                      
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${value._id}"> ${value.productAmount}</div></div>          
                <button onclick="addToCart('${value._id}')" id="${value._id}"  class="btnProduct" type="button">Add to Cart</button>              
                `;
            list4.appendChild(newDiv);
        } else if (value.category == 'Electrical') {
            let newDiv = document.createElement('div');
            newDiv.className = 'productItem';    
                    
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${value._id}"> ${value.productAmount}</div></div>              
                <button onclick="addToCart('${value._id}')" id="${value._id}"  class="btnProduct" type="button">Add to Cart</button>            
                `;
            list5.appendChild(newDiv);
        }
    })
 
}

function populateCart(){   
    const listElement = document.querySelector('.listCard')
    const total = document.getElementById('total-value');

    listElement.innerHTML = "";
    fetch('https://ch-lead.onrender.com/customers/getCart')
    .then(res => res.json())
    .then(data => {
        data.cart.find(value => {
            if (value._id) {
                let newDiv2 = document.createElement('li');
                newDiv2.className = `'cartItem${value._id}'`
                newDiv2.id = `'cartItem${value._id}'`
                newDiv2.innerHTML = `
                    <img src="/Images/${value.productImage}">
                    <div>${value.productName}</div>                    
                        <span>₱</span>
                        <div id="amount${value._id}"> ${value.productAmount}
                        </div>
                        <div class="cartFunction">
                        <button onclick="minus('${value._id}')" type="button">-</button>
                        <span id="quantity${value._id}" class="count">${value.productQuantity}
                        </span>
                        <button onclick="add('${value._id}')" type="button">+</button>
                    </div>
                    `;
                    const addButton = document.getElementById(`${value._id}`);
                    addButton.disabled = true;
                   if(addButton.disabled){
                    addButton.style.backgroundColor = 'red'
                   }
                listCard.appendChild(newDiv2);
            }
            if(data.cart == ""){
                return;
            }else{
                cartTotalAmount = data.cart.map(value => value.productAmount)
        
                const cartTotalValue = cartTotalAmount.reduce((accu,curr) => accu + curr)
                quantityOnly = data.cart.map(value => value.productQuantity)
                
                totalQuantity = quantityOnly.reduce((accu, curr) => accu += curr);
                
                cartQuantity.innerText = totalQuantity
                
                total.innerText = cartTotalValue;
            }
        })
        
        
    })
    .catch((error) => {
        console.error('Error', error);
      });

}


function addToCart(productKey) {  
    console.log(productKey)
    fetch('https://ch-lead.onrender.com/customers/getAllProducts')
        .then(res => res.json())
        .then(productData => {
           
            productData.products.forEach((value) => {
                if (productKey == value._id) {
                                     
                    fetch(`https://ch-lead.onrender.com/customers/addToCart/${value._id}`, {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                    _id: value._id,  
                                    unitPrice: value.productAmount,
                                    productName: value.productName,
                                    productAmount: value.productAmount,
                                    productImage: value.productImage,
                                    productQuantity: 1
                                                    
                            })
                        })
                        .then( data => {
                            if(data.status){
                                populateCart();
                                showPopup()
                            }
                        })
                }
            })

            cartQuantity.innerText = parseFloat(cartQuantity.innerText) + 1;

        })
        
        .catch(error => {
            console.error('Error', error)
        })
    
 
}

openShopping.addEventListener('click', () => {
    body.classList.add('active');
   
})

closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

function add(key) {
    const itemQuantity = document.getElementById(`quantity${key}`);
    const itemTotalAmount = document.getElementById(`amount${key}`);
    const itemAmount = document.getElementById(`product-id${key}`);
    const total = document.getElementById('total-value');

    itemQuantity.innerText = parseFloat(itemQuantity.innerText) + 1;
    cartQuantity.innerText = parseFloat(cartQuantity.innerText) + 1;
    itemTotalAmount.innerText = parseFloat(itemQuantity.innerText) * parseFloat(itemAmount.innerText);
    total.innerText = parseFloat(total.innerText) + parseFloat(itemAmount.innerText);

    fetch(`https://ch-lead.onrender.com/customers/getCart/${key}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                _id: key,
                productAmount: +itemTotalAmount.innerText,
                
                           
            })    
        }) 
        .catch((error) => {
            console.error('Error', error);
            return;
          });  
}

function minus(key) {
    
    const itemQuantity = document.getElementById(`quantity${key}`);
    const itemTotalAmount = document.getElementById(`amount${key}`);
    const itemAmount = document.getElementById(`product-id${key}`);
    const total = document.getElementById('total-value');
    const  cartQuantity = document.getElementById('cart-quantity');

    itemQuantity.innerText = parseFloat(itemQuantity.innerText) - 1;
    cartQuantity.innerText = parseFloat(cartQuantity.innerText) - 1;
    itemTotalAmount.innerText = parseFloat(itemQuantity.innerText) * parseFloat(itemAmount.innerText);
    total.innerText = parseFloat(total.innerText) - parseFloat(itemAmount.innerText);

    if (itemQuantity.innerText == 0 ) {        
        const deleteDiv = document.getElementById(`'cartItem${key}'`);
        alert(`Are you sure you want to remove this item?`);        
        listCard.removeChild(deleteDiv);
        
        const addButton = document.getElementById(`${key}`);
        addButton.disabled = false;
        if(addButton.disabled == false){
            addButton.style.backgroundColor = '#0b29ec';
        }
    }
    
    fetch(`https://ch-lead.onrender.com/customers/getCart/${key}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
                _id: key,
                productAmount: itemTotalAmount.innerText
            })
        })
        .catch((error) => {
            console.error('Error', error);
          });
}

function purchaseProducts(){
    if(cartQuantity.innerText == 0){
        alert('Your cart is empty')
    }else{
        window.location = 'customerCheckout.html'
    }
}

function closeProducts(){
    body.classList.remove('active-product');
    document.querySelector('.overlay').style.display = '';
    document.querySelector('.modal').style.display = '';
}

function addElement(){
    body.classList.toggle('adjust-container');
}


function showPopup() {
    var popup = document.getElementById('popup');
    popup.style.display = 'block';

    setTimeout(function(){
        popup.style.display = 'none';
    }, 3000);
}