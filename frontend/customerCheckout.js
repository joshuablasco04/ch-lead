let tabs = document.querySelectorAll(".tabs h3");
let tabContents = document.querySelectorAll(".tab-content div");
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabContents[index].classList.add("active");
    tabs[index].classList.add("active");
  });
});

populateCart();

function populateCart(){   
  const listElement = document.querySelector('.summary-item')
  const total = document.getElementById('total-value');
  const COD = document.querySelector('.cashOD');

  listElement.innerHTML = "";

    fetch('http://ch-lead.onrender.com/customers/getCart')
    .then(res => res.json())
    .then(data => {
        data.cart.find((value, key) => {
            if (value._id) {
                let newDiv2 = document.createElement('li');
                newDiv2.className = `cartItem${value._id}`
                newDiv2.id = `cartItem${value._id}`
                newDiv2.innerHTML = `
                    <img src="/Images/${value.productImage}">
                    <div class="item-name">${value.productName}</div>   
                        <div class="unit-price${value._id}" id="unit-price">
                            <span>₱</span>
                            <div id="price${value._id}"> ${value.unitPrice}
                            </div> 
                        </div>  
                        <div class="itemTotalPrice"> 
                            <span>₱</span>
                            <div id="amount${value._id}"> ${value.productAmount}
                            </div>
                        </div> 
                        <div class="cartFunction">
                        <button onclick="minus('${value._id}')" type="submit">-</button>
                        <span id="quantity${value._id}" class="count">${value.productQuantity}
                        </span>
                        <button onclick="add('${value._id}')" type="submit">+</button>
                    </div>
                    `;
                listElement.appendChild(newDiv2);
            }
        })
        
        let cartTotalAmount = data.cart.map(value => value.productAmount)
        cartTotalValue = cartTotalAmount.reduce((accu,curr) => accu + curr)
        
        total.innerText = cartTotalValue
        COD.innerHTML = `Kindly prepare ₱ <span>${total.innerText} </span>`
    })
}


// function add(key) {
//   const itemQuantity = document.getElementById(`quantity${key}`);
//   const itemTotalAmount = document.getElementById(`amount${key}`);
//   const itemAmount = document.getElementById(`product-id${key}`);
//   const total = document.getElementById('total-value');

//   itemQuantity.innerText = parseFloat(itemQuantity.innerText) + 1;
//   cartQuantity.innerText = parseFloat(cartQuantity.innerText) + 1;
//   itemTotalAmount.innerText = parseFloat(itemQuantity.innerText) * parseFloat(itemAmount.innerText);
//   total.innerText = parseFloat(total.innerText) + parseFloat(itemAmount.innerText);


//   fetch(`http://ch-lead.onrender.com/customers/getCart/${key}`, {
//           method: 'PUT',
//           headers: {
//               'Content-type': 'application/json'
//           },
//           body: JSON.stringify({ 
//               _id: key,
//               productAmount: +itemTotalAmount.innerText,
//           })    
//       }) 
//       .catch((error) => {
//           console.error('Error', error);
//           return;
//         });  
// }

// function minus(key) {
  
//   const itemQuantity = document.getElementById(`quantity${key}`);
//   const itemTotalAmount = document.getElementById(`amount${key}`);
//   const itemAmount = document.getElementById(`product-id${key}`);
//   const total = document.getElementById('total-value');
//   const  cartQuantity = document.getElementById('cart-quantity');

//   itemQuantity.innerText = parseFloat(itemQuantity.innerText) - 1;
//   cartQuantity.innerText = parseFloat(cartQuantity.innerText) - 1;
//   itemTotalAmount.innerText = parseFloat(itemQuantity.innerText) * parseFloat(itemAmount.innerText);
//   total.innerText = parseFloat(total.innerText) - parseFloat(itemAmount.innerText);

//   if (itemQuantity.innerText == 0 ) {        
//       const deleteDiv = document.getElementById(`cartItem${key}`);
//       alert(`Are you sure you want to remove this item?`);        
//       listCard.removeChild(deleteDiv);
//       const addButton = document.getElementById(key);
//       addButton.disabled = false;
//   }
  
//   fetch(`http://ch-lead.onrender.com/customers/getCart/${key}`, {
//           method: 'DELETE',
//           headers: {
//               'Content-type': 'application/json'
//           },
//           body: JSON.stringify({ 
//               _id: key,
//               productAmount: itemTotalAmount.innerText
//           })
//       })
//       .catch((error) => {
//           console.error('Error', error);
//         });
// }



function add(key) {

  const itemAmount = document.getElementById(`price${key}`);
  
  const itemQuantity = document.getElementById(`quantity${key}`);
  const itemTotalAmount = document.getElementById(`amount${key}`);            
  const total = document.getElementById('total-value');
  const COD = document.querySelector('.cashOD');
  
  itemQuantity.innerText = parseFloat(itemQuantity.innerText) + 1;
  
  itemTotalAmount.innerText = parseFloat(itemQuantity.innerText) * parseFloat(itemAmount.innerText);
  total.innerText = parseFloat(total.innerText) + parseFloat(itemAmount.innerText);
 
 
  fetch(`http://ch-lead.onrender.com/customers/getCart/${key}`, {
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify({ 
            _id: key,
            productAmount: parseFloat(itemTotalAmount.innerText)
                      
          })
  
      })
      COD.innerHTML = `Kindly prepare ₱ <span>${total.innerText} </span>`
}

function minus(key) {    
    const itemQuantity = document.getElementById(`quantity${key}`);
    const itemTotalAmount = document.getElementById(`amount${key}`);
    const itemAmount = document.getElementById(`price${key}`);
    const total = document.getElementById('total-value');
    const listElement = document.querySelector('.summary-item');
    const COD = document.querySelector('.cashOD');

    itemQuantity.innerText = parseFloat(itemQuantity.innerText) - 1;
    
    itemTotalAmount.innerText = parseFloat(itemQuantity.innerText) * parseFloat(itemAmount.innerText);
    total.innerText = parseFloat(total.innerText) - parseFloat(itemAmount.innerText);

    fetch(`http://ch-lead.onrender.com/customers/getCart/${key}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ 
              _id: key,
              productAmount: Number(itemTotalAmount.innerText)
            })
        })
    
        
    if (itemQuantity.innerText == 0 ) {        
        const deleteDiv = document.getElementById(`cartItem${key}`);
        alert(`Are you sure you want to remove this item?`);        
        listElement.removeChild(deleteDiv);
    }
    COD.innerHTML = `Kindly prepare ₱ <span>${total.innerText} </span>`
}

function confirmCheckout() {
    const totalAmount = document.getElementById('total-value');
    
    fetch('http://ch-lead.onrender.com/customers/getCart')
      .then((res) => res.json())
      .then((data) => {
         data.cart.map((product) => {
          fetch('http://ch-lead.onrender.com/customers/addToHistory', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              date: new Date().toISOString().split('T')[0],
              productName: product.productName,
              productAmount: product.unitPrice,
              productImage: product.productImage,
              productQuantity: product.productQuantity,
              totalAmount: product.productAmount,
              overallAmount: totalAmount.innerText,
            }),
          })           
          .catch(error => {
              console.error('Error', error);
          });
        });
        if (!data.cart.length) {
          alert('Your cart is empty.');
          return;
        }else{
          window.location = 'customerHistory.html'
           alert('Purchased successfully');
        }
      })  
      .catch((error) => {
        console.error('Error', error);
      });
}
 




 