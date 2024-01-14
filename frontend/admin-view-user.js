function fetchAllUsers() {
    fetch('http://localhost:3000/adminUsers/readAllAdmin')
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error ('Something went wrong');
        }
    }).then(userData => {
        // console.log(userData);
        setUserTableData(userData);
    }).catch(error => {
        console.error('Error',error)
    });
}
const tableBody = document.querySelector('tbody');

function setUserTableData(data) {
    tableBody.innerHTML = '';
    console.log(data)
    data.adminUser.forEach(user => {
        // console.log(user);
        const tableRow = document.createElement('tr');
        tableRow.innerHTML = `
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.designation}</td>
            <td>${user.employeeId}</td>
            <td>
                <div>
                <button type = "button" class = "btn btn-primary" data-bs-toggle= "modal" data-bs-target="#updateModal" onclick = "showUpdateModal(${user.id})" > Update </button>
                <button type = "button" class = "btn btn-danger" onclick="deleteUser(${user.id})"> Delete </button>
                </div>
            </td>
        `;
        tableBody.append(tableRow);
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
function getUserById(id) {
    return fetch(`http://localhost:3000/adminUsers/readAdminById/${id}`)
        .then (res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error ('Something went wrong');
            }
        }).catch(error =>{
            console.error(`Error: ${error}`);
        });
}
function showUpdateModal(id){
    getUserById(id).then(data => {
        // console.log(user);
        document.getElementById('updateName').value = data.user.name;
        document.getElementById('updateUsername').value = data.user.username;
        document.getElementById('updateEmployeeID').value = data.user.employeeId;
        document.getElementById('updatePassword').value = data.user.password;
    }).catch(error =>{
        console.error(`Error: ${error}`);
    });
    const modalFooter = document.getElementById('modal-footer-id');
    if (modalFooter){
        modalFooter.innerHTML = `
            <button 
                type="button" 
                class="btn btn-secondary" 
                data-bs-dismiss="modal"
            >Close</button>
            <button 
                type="button" 
                class="btn btn-primary" 
                id="updateUserButton"
                data-bs-dismiss="modal"
                onclick="updateUser(${id})"
            >Update</button>
        `;
    }
   
}

function updateUser(id){
    const modal = document.getElementById('updateModal');
    // console.log(id);
    const modalInit = new bootstrap.Modal(modal);

    const updateName = document.getElementById('updateName').value;
    const updateUsername = document.getElementById('updateUsername').value;
    const updateEmployeeID = document.getElementById('updateEmployeeID').value;
    const updatePassword = document.getElementById('updatePassword').value;

    getUserById(id).then(data => {
        const originalUser = data.user;

        const fieldToBeUpdated = {};

        if (updateName !== originalUser.name) {
            fieldToBeUpdated.name = updateName;
        }
        if (updateUsername !== originalUser.username) {
            fieldToBeUpdated.username = updateUsername;
        }
        if (updateEmployeeID !== originalUser.username) {
            fieldToBeUpdated.employeeId = updateEmployeeID;
        }
        if (updatePassword !== originalUser.password) {
            fieldToBeUpdated.password = updatePassword;
        }
        
        if (Object.keys(fieldToBeUpdated).length === 0) {
            alert('No fields to be updated');
            return;
        }
        console.log(fieldToBeUpdated);
        fetch(`http://localhost:3000/adminUsers/updateAdmin/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(fieldToBeUpdated)
        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).then(data => {
            if (data.status) {
                fetchAllUsers();
                modalInit.hide();
                clearFormFields('update');
            } else {
                alert(data.message);
            }
        }).catch(error => {
            console.error(`Error: ${error}`);
        });

    })

    clearFormFields('update');
}

function deleteUser(id) {
    const confirmationDialog = confirm('Are you sure you want to delete this user?');

    if(confirmationDialog){
        fetch(`http://localhost:3000/adminUsers/deleteAdmin/${id}`,{
            method: 'DELETE',
       }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error ('Something went wrong');
            }
        }).then(data => {
            if (data.status){
                fetchAllUsers();
            }
            alert('User successfully removed!');
        }).catch(error =>{
            console.error(`Error: ${error}`);
        });
    }
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

    fetch('http://localhost:3000/adminUsers//createAdmin', {
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
        } else {
            alert(data.message);
        }
    }).catch(error => {
        console.error(`Error: ${error}`);
    })
}

fetchAllUsers();