const wrapper = document.querySelector('.wrapper');
// const loginLink = document.querySelector('.login-link');
// const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');


// registerLink.addEventListener('click', () => {
//   wrapper.classList.add('active');
  
// });

// loginLink.addEventListener('click', () => {
//   wrapper.classList.remove('active');
// });

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
});


// function validate() {
//   const usernameField = document.getElementById("username").value;
//   const passwordField = document.getElementById("password").value;

//   const username = usernameField.value
//   const password = passwordField.value

//   fetch('http://ch-lead.onrender.com/users/login', {
//     method:'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       username: username,
//       password: password
//     })
//     })

//     .then(res => res.json())
//     .then (res => {
//       if (res.ok) {}
//       window.location="./customerHome.html";
//       alert ("Login successfully")
//     })
// } 

function validate() {
  const usernameField = document.getElementById("username").value;
  const passwordField = document.getElementById("password").value;

  const username = usernameField
  const password = passwordField;
  
  fetch('http://ch-lead.onrender.com/users/read')
  
  .then(res => res.json())
  .then(res => {
   
    const userFound = res.users.some(user => 
      user.username === username && user.password === password
    )
    if(userFound === true){
     
      window.location = "./customerHome.html";
      alert("Login successfully");
      }
  })
  fetch('http://ch-lead.onrender.com/users/loginData', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
  
  .then(()=> {
    fetch('http://ch-lead.onrender.com/adminUsers/readAllAdmin')
    .then(res => res.json())
    .then(res => {
      if(!usernameField){
        alert('Username is required');
        return;
      }
      if(!passwordField){
        alert('Password is required');
        return;
      }
      const adminFound = res.adminUser.some(user => 
      user.username === username && user.password === password
    )
    if(adminFound === true){
        window.location = "./Admin-home.html";
        alert("Login successfully");
      }else{
        alert('Username and password is incorrect!')
      } 
   })
    .catch(error => {
      console.error("An error occurred: " + error);
      });
      
    })
  .catch(error => {
    console.error("An error occurred: " + error);
  });
  }
    



// function fetchMessages(){
//   fetch('http://ch-lead.onrender.com/inbox/readAllMessage')
//   .then(res => res.json())
//   .then(messageData => {
//     saveMessage(messageData);
//   })
//   .catch(error => {
//     console.error('Error', error)
//   });
// }

// function saveMessage(data){ 
//     data.messages.forEach(newMessage => {
    
//   });
// }

// function addNewMessage() {
//   const nameField = document.getElementById('messageName');
//   const emailField = document.getElementById('messageEmail');
//   const messageTypeField = document.getElementById('messageType');
//   const messageBodyField = document.getElementById('messageBody');
  
//   const requiredFields = {
//     name: nameField.value,
//     email: emailField.value,
//     messageType: messageTypeField.value,
//     messageBody: messageBodyField.value
//   };

//   const requiredFieldName = {
//     name: "Name",
//     email: "Email",
//     messageType: "Message Type",
//     messageBody: "Message Body"
//   }

//   for (let fieldKey in requiredFields) {
//     if (!requiredFields[fieldKey]) {
//       alert(`${requiredFieldName[fieldKey]} is required`);
//       console.log(requiredFields);
//       return;
//     }
//   }

//   fetch('http://ch-lead.onrender.com/inbox/addMessageInbox', {
//     method:'POST',
//     headers: {
//       'Content-type': 'application/json'
//     },
//     body: JSON.stringify({
//       name: requiredFields.name,
//       email: requiredFields.email,
//       messageType: requiredFields.messageType,
//       messageBody: requiredFields.messageBody
//     })
//   })

//   .then(res => res.json())
//   .then(data => {
//     if(data.status) {
//       fetchMessages()
//       console.log(data)
//     }
//       alert('Message successfuly sent');
//   }).catch(error => {
//     console.error(`Error: ${error}`);
//   }) 
// }

// fetchMessages();

function fetchMessages() {
  fetch('http://ch-lead.onrender.com/inbox/readAllMessage')
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .catch((error) => {
      console.error('Error', error);
    });
}


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
