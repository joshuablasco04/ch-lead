const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const body = document.querySelector('body');
const list = document.querySelector('.list');
const list2 = document.querySelector('.list-2');
const list3 = document.querySelector('.list-3');
const list4 = document.querySelector('.list-4');
const list5 = document.querySelector('.list-5');
const listCard = document.querySelector('.listCard')
const cartQuantity = document.querySelector('.cart-quantity')


const products = [
    {
        id: 1,
        productName: 'Ball Valve',
        productAmount: 9800,
        productImage: '1.webp',
    },
    {
        id: 2,
        productName: 'Butterfly Valve',
        productAmount: 12000,
        productImage: '2.webp',
    },
    {
        id: 3,
        productName: 'Check Valve',
        productAmount: 15800,
        productImage: '3.webp',
    },
    {
        id: 4,
        productName: 'Gate Valve',
        productAmount: 13800,
        productImage: '4.webp',
    },
    {
        id: 5,
        productName: 'Globe Valve',
        productAmount: 10800,
        productImage: '5.webp',
    },
    {
        id: 6,
        productName: 'Plug Valve',
        productAmount: 9800,
        productImage: '6.webp',
    },
    {
        id: 7,
        productName: 'Diaphragm Pump',
        productAmount: 9800,
        productImage: '7.webp',
    },
    {
        id: 8,
        productName: 'Engine Driven Pump',
        productAmount: 12000,
        productImage: '8.webp',
    },
    {
        id: 9,
        productName: 'Submersible Pump',
        productAmount: 15800,
        productImage: '9.webp',
    },
    {
        id: 10,
        productName: 'Centrifugal Pump',
        productAmount: 13800,
        productImage: '10.webp',
    },
    {
        id: 11,
        productName: 'AC Gear Motor',
        productAmount: 10800,
        productImage: '11.webp',
    },
    {
        id: 12,
        productName: 'Gear Box',
        productAmount: 9800,
        productImage: '12.webp',
    },
    {
        id: 13,
        productName: 'Analyzer',
        productAmount: 9800,
        productImage: '13.webp',
    },
    {
        id: 14,
        productName: 'Pressure Gauge',
        productAmount: 12000,
        productImage: '14.webp',
    },
    {
        id: 15,
        productName: 'Temperature Gauge',
        productAmount: 15800,
        productImage: '15.webp',
    },
    {
        id: 16,
        productName: 'Actuators',
        productAmount: 13800,
        productImage: '16.webp',
    },
    {
        id: 17,
        productName: 'Transmitters',
        productAmount: 10800,
        productImage: '17.webp',
    },
    {
        id: 18,
        productName: 'Fittings',
        productAmount: 9800,
        productImage: '18.webp',
    },
    {
        id: 19,
        productName: 'Air Couplers',
        productAmount: 9800,
        productImage: '19.webp',
    },
    {
        id: 20,
        productName: 'Industrial Air Gun',
        productAmount: 12000,
        productImage: '20.webp',
    },
    {
        id: 21,
        productName: 'Drill Bits',
        productAmount: 15800,
        productImage: '21.webp',
    },
    {
        id: 22,
        productName: 'Handle Sockets',
        productAmount: 13800,
        productImage: '22.webp',
    },
    {
        id: 23,
        productName: 'Calipers',
        productAmount: 10800,
        productImage: '23.webp',
    },
    {
        id: 24,
        productName: 'Tool Set',
        productAmount: 9800,
        productImage: '24.webp',
    },
    {
        id: 25,
        productName: 'Circuit Breaker',
        productAmount: 9800,
        productImage: '25.webp',
    },
    {
        id: 26,
        productName: 'Enclosures',
        productAmount: 12000,
        productImage: '26.webp',
    },
    {
        id: 27,
        productName: 'Contactors and Relays',
        productAmount: 15800,
        productImage: '27.webp',
    },
    {
        id: 28,
        productName: 'Meters',
        productAmount: 13800,
        productImage: '28.webp',
    },
    {
        id: 29,
        productName: 'Switches',
        productAmount: 10800,
        productImage: '29.webp',
    },
    {
        id: 30,
        productName: 'Push Buttons',
        productAmount: 9800,
        productImage: '30.webp',
    },

];

const cartItems = [];

function displayItems(){
    products.forEach((value, key)=>{
        if(value.id <= 6){

            let newDiv = document.createElement('div')
            newDiv.className = 'productItem'
            newDiv.id = 'valves'
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${key}"> ${value.productAmount}</div></div>              
                <button onclick="addToCart(${key})" id="${key}" >Add to Cart</button>            
                `;
            list.appendChild(newDiv);     
              
        }else if(value.id >= 7 && value.id <= 12){
            let newDiv = document.createElement('div')
            newDiv.className = 'productItem'
            newDiv.id = 'pumps'
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${key}"> ${value.productAmount}</div></div>              
                <button onclick="addToCart(${key})" id="${key}" >Add to Cart</button>            
                `;
            list2.appendChild(newDiv); 
        }else if(value.id >= 13 && value.id <= 18){
            let newDiv = document.createElement('div')
            newDiv.className = 'productItem'
            newDiv.id = 'instrumentation'
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${key}"> ${value.productAmount}</div></div>            
                    <button onclick="addToCart(${key})" id="${key}" >Add to Cart</button> 
                            
                `;
            list3.appendChild(newDiv); 
        }else if(value.id >= 19 && value.id <= 24){
            let newDiv = document.createElement('div')
            newDiv.className = 'productItem'
            newDiv.id = 'industrial'
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${key}"> ${value.productAmount}</div></div>          
                <button onclick="addToCart(${key})" id="${key}" >Add to Cart</button>              
                `;
            list4.appendChild(newDiv); 
        }else if(value.id >= 25 && value.id <= 30){
            let newDiv = document.createElement('div')
            newDiv.className = 'productItem'
            newDiv.id = 'electrical'
            newDiv.innerHTML = `
                <img src="/Images/${value.productImage}">
                <div class="title">${value.productName}</div>
                <div class="price"><span>₱</span><div class="product-amount" id="product-id${key}"> ${value.productAmount}</div></div>              
                <button onclick="addToCart(${key})" id="${key}" >Add to Cart</button>            
                `;
            list5.appendChild(newDiv); 
        }
    })
}
displayItems()

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
});
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

function addToCart(productKey){
    
    products.forEach((value, key)=> {
        if(productKey == key){            
            let newDiv2 = document.createElement('li');
            newDiv2.className = `cartItem${key}`
            newDiv2.id = `cartItem${key}`            
                newDiv2.innerHTML =`
                    <img src="/Images/${value.productImage}">
                    <div>${value.productName}</div>                    
                        <span>₱</span>
                        <div id="amount${key}"> ${value.productAmount}
                        </div>
                        <div class="cartFunction">
                        <button onclick="minus(${productKey})">-</button>
                        <div id="quantity${key}" class="count">1
                        </div>
                        <button onclick="add(${productKey})">+</button>
                    </div>
                    `;
                    listCard.appendChild(newDiv2);   

                    const total = document.getElementById('total-value');
                   
                    const itemAmount = document.getElementById(`product-id${key}`);
                    total.innerText = parseFloat(total.innerText) + parseFloat(itemAmount.innerText) 
                  
                }   
            })
            

    const addButton = document.getElementById(productKey);
    addButton.disabled = true;

    cartQuantity.innerText = parseFloat(cartQuantity.innerText) + 1;
}

function add(key){
    const itemQuantity = document.getElementById(`quantity${key}`);
    const itemTotalAmount = document.getElementById(`amount${key}`);
    const itemAmount = document.getElementById(`product-id${key}`);
    const total = document.getElementById('total-value');

    itemQuantity.innerText = parseFloat(itemQuantity.innerText) + 1;
    cartQuantity.innerText = parseFloat(cartQuantity.innerText) + 1;
    itemTotalAmount.innerText = parseFloat(itemQuantity.innerText) * parseFloat(itemAmount.innerText);
    total.innerText = parseFloat(total.innerText) + parseFloat(itemAmount.innerText)
    
}
function minus(key){
    const itemQuantity = document.getElementById(`quantity${key}`);
    const itemTotalAmount = document.getElementById(`amount${key}`);
    const itemAmount = document.getElementById(`product-id${key}`);
    const total = document.getElementById('total-value');

    itemQuantity.innerText = parseFloat(itemQuantity.innerText) - 1;
    cartQuantity.innerText = parseFloat(cartQuantity.innerText) - 1;
    itemTotalAmount.innerText = parseFloat(itemQuantity.innerText) * parseFloat(itemAmount.innerText);
    total.innerText = parseFloat(total.innerText) - parseFloat(itemAmount.innerText)

    if(itemQuantity.innerText == 0){

        const deleteDiv = document.getElementById(`cartItem${key}`);
        alert(`Are you sure you want to remove this item?`);
        listCard.removeChild(deleteDiv);
        
        const addButton = document.getElementById(key);
        addButton.disabled = false;
    }
}
