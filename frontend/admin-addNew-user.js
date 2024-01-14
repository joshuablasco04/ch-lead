function fetchAllUsers() {
    fetch('http://ch-lead.onrender.com/adminUsers/readAllAdmin')
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error ('Something went wrong');
        }
    }).then(userData => {
        console.log(userData);

    }).catch(error => {
        console.error('Error',error)
    });
}

function clearFormFields(mode){

    if (mode === 'create'){
        document.getElementById('name').value = '';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';       
    }

    if (mode === 'update'){
        document.getElementById('updateName').value = '';
        document.getElementById('updateUsername').value = '';
        document.getElementById('updateEmployeeID').value = '';
        document.getElementById('updatePassword').value = '';
    }

}
function showFields(){

    form.style.display = (form.style.display === 'none' || form.style.display === '') ?
        'block' :
        'none';
}

function addUser() {
    const nameField = document.getElementById('name');
    const employeeIdField = document.getElementById('employeeId');
    const designationField = document.getElementById('designation');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');

    const formFields = {
        name: nameField.value,
        employeeId: employeeIdField.value,
        designation: designationField.value,
        username: usernameField.value,
        password: passwordField.value
    }

    const fieldName = {
        name: 'name',
        employeeId: 'employeeId',
        designation: 'designation',
        username: 'username',
        password: 'password'
    }

    for (let fieldkey in formFields) {
        if (!formFields[fieldkey]){
            alert(`Field ${fieldName[fieldkey]} is required`);
            return;
        }
    }

    fetch('http://ch-lead.onrender.com/adminUsers//createAdmin', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            name: formFields.name,
            employeeId: formFields.employeeId,
            designation: formFields.designation,
            username: formFields.username,
            password: formFields.password,
        })
    }).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error ('Something went wrong');
        }
    }).then(data => {
        if (data.status) {
            fetchAllUsers();
            clearFormFields('create');
        } 
        alert('User successfully registered!');
    }).catch(error => {
        console.error(`Error: ${error}`);
    })
}

fetchAllUsers();