function fetchUser(){
    const nameFormFields = document.getElementById('name');
    const emailFormFields = document.getElementById('email');
    const addFormFields = document.getElementById('address');
    const genderFormFields = document.getElementById('gender');
    const birthdatFormFields = document.getElementById('bday');
    const headerName= document.getElementById('header-name')
    

    fetch('https://ch-lead.onrender.com/users/loginUser')
    .then(res => res.json())
    .then(users => {
        users.user.forEach(user => {
            const nameUser = document.createElement('h2');
            nameUser.innerHTML = `
                Welcome!  ${user.firstName}
            `;
            headerName.appendChild(nameUser);
           
            const name = user.firstName
            const lastName = user.lastName
            const email = user.email
            const birthday = user.birthDate
            const address = user.address
            const gender = user.gender
    
    
            nameFormFields.value = `${name} ${lastName}`;
            emailFormFields.value = email;
            birthdatFormFields.value = birthday
            addFormFields.value = address
            genderFormFields.value = gender
        })
    })
    .catch(error => {
        console.error('Error', error)
    })
}
fetchUser()