const fs = require('fs');
const path = require('path');

const productDataPath = path.join(__dirname, 'products.json');
const historyDataPath = path.join(__dirname, 'history.json');
const cartDataPath = path.join(__dirname, 'cart.json')
const usersDataPath = path.join(__dirname, 'user.json');
const salesDataPath = path.join(__dirname, 'salesData.json')
const adminUsersDataPath = path.join(__dirname, 'adminUser.json');
const inboxDataPath = path.join(__dirname, 'inbox.json');
const loginDataPath = path.join(__dirname, 'userLogin.json')

function getProducts(){
    try{
        const productData = fs.readFileSync(productDataPath, 'utf-8');
        const jsonData = JSON.parse(productData);
        return jsonData.products;

    }catch(error) {
        console.error('Error reading product data', error);
        throw error;
    }
}

function saveProducts(products){
    try{
        const jsonData = { products };
        const productsData = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync(productDataPath, productsData);

    }catch(error) {
        console.error('Error writing product data', error);
        throw error;
    }
}

function getPurchaseHistory(){
    try{
        const historyData = fs.readFileSync(historyDataPath, 'utf-8');

        const Data = JSON.parse(historyData);
        return Data.history;
        
    }catch(error) {
        console.error('Error reading product data', error);
        throw error;
    }
}

function savePurchaseHistory(history){
    try{
        const Data =  { history } ;
        const historyData = JSON.stringify(Data, null, 2);
        fs.writeFileSync(historyDataPath, historyData);

    }catch(error) {
        console.error('Error writing product data', error);
        throw error;
    }
}

function getCartProduct(){
    try{
        const cartData = fs.readFileSync(cartDataPath, 'utf-8');

        const jsonData = JSON.parse(cartData);
        return jsonData.cart;

    }catch(error) {
        console.error('Error reading product data', error);
        throw error;
    }
}

function saveCartProduct(cart){
    try{
        const Data = { cart };
        const cartData = JSON.stringify(Data, null, 2);
        fs.writeFileSync(cartDataPath, cartData);

    }catch(error) {
        console.error('Error writing product data', error);
        throw error;
    }
}

function getUsers() {
  try {
    const usersData = fs.readFileSync(usersDataPath, 'utf-8');
    const jsonData = JSON.parse(usersData);
    return jsonData.users;
  } catch (error) {
    console.error("Error reading user data:", error);
    throw error;
  }
}

function saveUsers(users) {
  try {
    const jsonData = {users};
    const usersData = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(usersDataPath, usersData);
  }catch (error) {
    console.error("Error writing user data:", error);
    throw error;
  }
}

function loginUser(username, password) {
  const users = getUsers();
  const user = users.find((u) => u.username === username && u.password === password);
  console.log(user)
  if (user) {
      const jsonData = {user};
      const usersData = JSON.stringify(jsonData, null, 2);
      fs.writeFileSync(loginDataPath, usersData);
      return{
          status: true,
          message: "Login successfully"
      };
  } else { 
      return {
          status: false,
          message: "Wrong username or password"
      };
    } 
}

function loginAdmin(username, password) {
const admins = getUsersAdmin();
const admin = admins.find((adminUser) => adminUser.username === username && adminUser.password === password);

if (admin) {
    const jsonData = {admin};
    const adminData = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(adminUsersDataPath, adminData);
    return{
        status: true,
        message: "Login successfully"
    };
} else { 
    return {
        status: false,
        message: "Wrong username or password"
    };
  } 
}

function getSalesData() {
    try {
        const salesDataContent =  fs.readFileSync(salesDataPath, 'utf-8');
        return JSON.parse(salesDataContent);
    } catch (error) {
        console.error('Error reading sales data:', error);
        throw error;
    }
}

function getUsersAdmin() {
    try {
      const adminUsersData = fs.readFileSync(adminUsersDataPath, 'utf-8');
      const jsonData = JSON.parse(adminUsersData);
      return jsonData.adminUsers;
    }catch (error) {
      console.error("Error reading admin user data:", error);
      throw error;
    }
  }
  
function saveUsersAdmin(adminUsers) {
  try {
    const jsonData = {adminUsers};
    const adminUsersData = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(adminUsersDataPath, adminUsersData);
  }catch (error) {
    console.error("Error writing user data:", error);
    throw error;
  }
}

function getAllMessage() {
  try {
    const inboxData = fs.readFileSync(inboxDataPath, 'utf-8');
    const jsonData = JSON.parse(inboxData);
    return jsonData.messages;
  }catch (error) {
    console.error ("Error writing message data:", error);
    throw error;
  }
}

function saveMessage(messages) {
  try {
    const jsonData = {messages};
    const inboxData = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(inboxDataPath, inboxData);
  }catch (error) {
    console.error("Error writing message data:", error);
    throw error;
  }
}
  
function saveLoginData(user){
  try {
    const jsonData = {user};
    const userData = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(loginDataPath, userData);
  }catch (error) {
    console.error("Error writing message data:", error);
    throw error;
  }
}

function getLoginData(){
  try{
      const userData = fs.readFileSync(loginDataPath, 'utf-8');
      const jsonData = JSON.parse(userData);
      return jsonData.user;

  }catch(error) {
      console.error('Error reading product data', error);
      throw error;
  }
}

module.exports = {
    getProducts,
    saveProducts,
    getPurchaseHistory,
    savePurchaseHistory,
    getCartProduct,
    saveCartProduct,
    getUsers,
    saveUsers,
    loginUser,
    loginAdmin,
    getSalesData,
    getUsersAdmin,
    saveUsersAdmin,
    getAllMessage,
    saveMessage,
    saveLoginData,
    getLoginData
    
}