const wrapper = document.querySelector('.wrapper');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');


// function fetchMessages() {
//   fetch('http://ch-lead.onrender.com/inbox/readAllMessage')
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return res.json();
//     })

//     .catch((error) => {
//       console.error('Error', error);
//     });
// }


function addNewMessage() {
  const nameField = document.getElementById('messageName');
  const emailField = document.getElementById('messageEmail');
  const messageTypeField = document.getElementById('messageType');
  const messageBodyField = document.getElementById('messageBody');

  const requiredFields = {
    name: nameField.value,
    email: emailField.value,
    messageType: messageTypeField.value,
    messageBody: messageBodyField.value,
  };

  const requiredFieldName = {
    name: 'Name',
    email: 'Email',
    messageType: 'Message Type',
    messageBody: 'Message Body',
  };

  for (let fieldKey in requiredFields) {
    if (!requiredFields[fieldKey]) {
      alert(`${requiredFieldName[fieldKey]} is required`);
      return;
    }
  }

  fetch('http://ch-lead.onrender.com/inbox/addMessageInbox', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(requiredFields),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => {
      if (data.status) {
        fetchMessages();
        console.log(data);
      }
      alert('Message successfully sent');
    })
    .catch((error) => {
      console.error(`Error: ${error}`);
    });
}


// fetchMessages();
function addElement(){
  const body = document.querySelector('body')
  
  body.classList.toggle('adjust-container');
}
