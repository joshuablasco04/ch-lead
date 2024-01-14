function fetchAllUsers(){
  fetch('http://ch-lead.onrender.com/users/read')
  .then(res => res.json())
  .then(userData => {
    saveUser(userData);
  })
  .catch(error => {
    console.error('Error', error)
  });
}

function saveUser(data){ 
    data.users.forEach(user => {
    
  });
}

function registerUser() {
  const firstNameField = document.getElementById('firstName');
  const middleNameField = document.getElementById('middleName');
  const lastNameField = document.getElementById('lastName');
  const genderField = document.getElementById('gender');
  const birthDateField = document.getElementById('birthDate');
  const addressField = document.getElementById('address');
  const emailField = document.getElementById('email');
  const usernameField = document.getElementById('username');
  const passwordField = document.getElementById('password');

  const middleName = middleNameField.value
  const gender = genderField.value
  const birthDate = birthDateField.value
  const address = addressField.value

  const requiredFields = {
    firstName: firstNameField.value,
    lastName: lastNameField.value,
    email: emailField.value,
    username: usernameField.value,
    password: passwordField.value
  };

  const requiredFieldName = {
    firstName: 'Firstname',
    lastName: 'Lastname',
    email: 'Email',
    username: 'Username',
    password: 'Password'
  }

  for (let fieldKey in requiredFields) {
    if (!requiredFields[fieldKey]) {
      alert(`${requiredFieldName[fieldKey]} is required`);
      return;
    }
  }

  fetch('http://ch-lead.onrender.com/users/create', {
    method:'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      firstName:requiredFields.firstName,
      middleName,
      lastName:requiredFields.lastName,
      gender,
      birthDate,
      address,
      email:requiredFields.email,
      username: requiredFields.username,
      password: requiredFields.password
    })
  })

  .then(res => res.json())
  .then(data => {
    if(data.status) {
      fetchAllUsers()
    }
    window.location="homepage.html";
      alert('User succesfully registered');
  }).catch(error => {
    console.error(`Error: ${error}`);
  }) 
}

fetchAllUsers();