function fetchAllMessages() {
    fetch('http://ch-lead.onrender.com/inbox/readAllMessage')
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error ('Something went wrong');
        }
    }).then(inboxData => {
        // console.log(inboxData);
        setInboxTableData(inboxData);
    }).catch(error => {
        console.error('Error',error)
    });
}
const tableBody = document.querySelector('tbody');

function setInboxTableData(data) {
    tableBody.innerHTML = '';
    console.log(data)
    data.messages.forEach(message => {
        // console.log(message);
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.messageType}</td>
            <td id="MessageContent">${message.messageBody}</td>
            <td>
                <div>
                <button type = "button" class = "btn btn-danger" onclick="deleteMessage(${message.id})"> Delete </button>
                </div>
            </td>
        `;
        tableBody.append(tableRow);
    });

}

function deleteMessage(id) {
    const confirmationDialog = confirm('Are you sure you want to delete this user?');

    if(confirmationDialog){
        fetch(`http://ch-lead.onrender.com/inbox/deleteMessage/${id}`,{
            method: 'DELETE',
       }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error ('Something went wrong');
            }
        }).then(data => {
            if (data.status){
                fetchAllMessages();
            }
            alert('Message successfully removed!');
        }).catch(error =>{
            console.error(`Error: ${error}`);
        });
    }
}


fetchAllMessages();