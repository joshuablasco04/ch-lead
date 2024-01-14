
function displayHistory() {
    const tableBody = document.querySelector('tbody');
    fetch('http://ch-lead.onrender.com/customers/getHistory')
    .then(res => res.json())
    .then(productData => {    
        console.log(productData)        
        productData.products.forEach(product => {
            const purchaseTable = document.createElement('tr');
            
            purchaseTable.innerHTML = `            
                <td><p id="currentDate">${product.date}</p></td>                        
                <td class="image-name"><img src="/Images/${product.productImage}">${product.productName}</td>
                <td>${product.productAmount}</td>
                <td>${product.productQuantity}</td>
                <td>${product.totalAmount}</td>
                <td>For delivery</td> 
                
            `;
            
            tableBody.append(purchaseTable);
            
        })
    })
    .catch(error => {
        console.error('Error', error)
    })
}

displayHistory()



