const model = require('../models/user.model');
const fs = require('fs');
const {Product, cartProduct, cartHistory} = require('../models/product.mongo')

// CART FUNCTIONS

const getAllProducts = (req,res) =>{
    try {      
      Product.find({})
        .then(async (products) => {
          await res.status(200).json({
                status: true,
                products: products
            });
        })
    } catch (error){
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

const addProduct = (req,res) =>{
    const {category, productName, productAmount , productImage} = req.body;
    
    if (!category){
        res.status(400).json({status: false, message: 'Product category is required'});
        return;
    }    
    if (!productName){
        res.status(400).json({status: false, message: 'Product name is required'});
        return;
    }
    if(!productAmount){
        res.status(400).json({status: false, message: 'Product amount is required'});
        return;
    }
    if(!productImage){
        res.status(400).json({status: false, message: 'Product image is required'});
        return;
    }

    Product.find({productName: productName}).then(async(product) => {
      if(!product.length){
        await Product.create({productName, productAmount, category, productImage});
        res.status(200).json ({
          status: true,
          message: 'Product successfully added'
      });
      }else{
        res.status(400).json ({
          status: false,
          message: 'Already exist'
         
        });
        return;
      }
  });
}

const updateProduct = (req, res) => {
    const productsId = Number(req.params.id);
    const {productName, productAmount , productImage} = req.body;
    const products = model.getProducts();

    const productIndex = products.findIndex(product => product.id == productsId);

    if (productIndex == -1){
        res.status(400).json({
            status: false,
             message: 'Product ID not found'});
        return;
    }
    if (productName){
        products[productIndex].productName = productName;
    }
    if (productAmount){
        products[productIndex].productAmount = productAmount;
    }
    if (productImage){
        products[productIndex].productImage = productImage;
    }

 
    model.saveProducts(products);

    res.status(200).json({
        status: true,
        message: 'User Updated'
    });
}

const deleteProduct = (req, res) => {
    const productsId = Number(req.params.id);
    const {productName, productAmount , productImage} = req.body;
    const products = model.getProducts();

    const productIndex = products.findIndex(product => product.id == productsId);

    if (productIndex == -1){
        res.status(400).json({status: failed, message: 'Product ID not found'});
        return;
    }

    products.splice(productIndex, 1);

    model.saveProducts(products);
    res.status(200).json({
        status: true,
        message: 'User successfully deleted'
    });
}

const addingToCart = (req, res) => {
    
    const {_id, productName, productAmount, productImage, productQuantity, unitPrice}= req.body
    const productsId = req.params.id;   
    
    Product.find({_id: productsId}).then(async() => {
      if(_id == productsId){
        const productOnCart = await cartProduct.findOne({_id: productsId})
        if( productOnCart){
          const newQuantity = productQuantity + 1;
          console.log(newQuantity)
          await cartProduct.updateOne({_id: productsId}, {$set: {productQuantity: newQuantity}})
          return;
        }else{
          await cartProduct.create({_id, productName, productAmount, productQuantity, productImage, unitPrice});
          res.status(200).json ({
           status: true,
           message: 'Product successfully added'
       });
        }
      }else{
        res.status(400).json ({
          status: false,
          message: 'Already exist'
         
        });
        
      }
  })
}


const addQuantity = async (req, res) => {
  const { _id, productQuantity, productAmount } = req.body;
  const productId = req.params.id;

  try {
      const product = await cartProduct.findOne({ _id: productId });

      if (product) {
          const newQuantity = parseInt(product.productQuantity, 10) + 1;

          await cartProduct.updateOne({ _id: productId }, { $set: {productAmount: productAmount, productQuantity: newQuantity } });

          res.status(200).json({
              status: true,
              message: 'Product quantity successfully updated',
              newQuantity: newQuantity
          });
      } else {
          res.status(400).json({
              status: false,
              message: 'Product not found in the cart'
          });
      }
  } catch (error) {
      res.status(500).json({
          status: false,
          message: 'Internal server error',
          error: error.message
      });
  }
};



const minusQuantity = async (req, res) => {
  const { _id, productQuantity, productAmount } = req.body;
  const productId = req.params.id;

  try {
      const product = await cartProduct.findOne({ _id: productId });
      
      if (product) {
        
          const newQuantity = parseInt(product.productQuantity) - 1;

          await cartProduct.updateOne(
              { _id: productId },
              { $set: { productQuantity: newQuantity, productAmount: productAmount } }
          );
          if(newQuantity == 0){
            await cartProduct.deleteOne({_id: productId});
           
            return res.status(200).json({
                     status: true,
                     message: 'Product quantity successfully updated',
                     newQuantity: newQuantity
                 });
           }
         
         return res.status(200).json({
              status: true,
              message: 'Product quantity successfully updated',
              newQuantity: newQuantity
          });
      }
      
       else {
          return res.status(400).json({
              status: false,
              message: 'Product not found in the cart'
          });
      }
  } catch (error) {
      res.status(500).json({
          status: false,
          message: 'Internal server error',
          error: error.message
      });
  }
};

const populateCart = (req, res) => {
    try {
        cartProduct.find({})
        .then(async(cart) => {
          await res.status(200).json({
              status: true,
              cart: cart
          });

        })
    } catch (error){
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

const getHistory =async(req,res) => {
  try {      
    cartHistory.find({})
      .then(async (products) => {
        await res.status(200).json({
              status: true,
              products: products
          });
      })
  } catch (error){
      res.status(400).json({
          status: false,
          message: error.message
      });
  }
}

const deleteCartProduct = async(req, res) => {
 
  const purchasedProduct = await cartProduct.deleteMany({})
   
}

const addToHistory = async(req, res) => {
    const {productName, productAmount, productQuantity, totalAmount, productImage , productTotalAmount, date} = req.body;
  
    if (!productName){
        res.status(400).json({status: false, message: 'Product name is required'});
        return;
    }
    if (!productAmount){
        res.status(400).json({status: false, message: 'Product Amount is required'});
        return;
    }
    if (!productQuantity){
        res.status(400).json({status: false, message: 'Product Quantity is required'});
        return;
    }
    if (!totalAmount){
        res.status(400).json({status: false, message: 'Total amount is required'});
        return;
    }

    try {      
      const purchasedProduct = await cartHistory.create({productName, productAmount, productImage, totalAmount, date, productQuantity,productTotalAmount });
     
      if(purchasedProduct){
        res.status(200).json({
          status: true,
          message: 'Product cart has been cleared'
      });
       deleteCartProduct();
      }
    } catch (error){
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
}

//USER FUNCTIONS

const createUser = (req, res) => {
    const { firstName, middleName, lastName, gender, birthDate, address, email, username, password } = req.body;
    
    const userExist = users.some(user => user.email === email || user.username === username);

    if (userExist) {
      res.status(400).json ({
        status: false,
        message: 'Email or Username already exist'
      });

      return;
    }

    if (!firstName) {
      res.status(400).json ({
        status: false,
        message: 'Firstname is required'
      });

      return;
    }

    if (!lastName) {
      res.status(400).json ({
        status: false,
        message: 'Lastname is required'
      });

      return;
    }

    if (!username) {
      res.status(400).json ({
        status: false,
        message: 'Desired Username is required'
      });

      return;
    }

    if (!email) {
      res.status(400).json ({
        status: false,
        message: 'Email is required'
      });

      return;
    }

    if (!password) {
      res.status(400).json ({
        status: false,
        message: 'Password is required'
      });

      return;
    }

    productMongo.find({productName: productName}).then(async(product) => {
        if(!product.length){
          await productMongo.create({productName, productAmount, productQuantity, productImage});
          res.status(200).json ({
            status: true,
            message: 'User successfully added'
        });
        }else{
          res.status(400).json ({
            status: false,
            message: 'Already exist'
           
          });
          return;
        }
    });



    // const user = {id: users.length +1, firstName, middleName, lastName, gender, birthDate, address, email, username, password };

    // users.push(user);
    // model.saveUsers(users);
    // res.status(200).json ({
    //   status: true,
    //   message: 'User successfully added'
    // });
}

const readUser = (req, res) => {
  try {
    const users = model.getUsers();
    res.status(200).json ({
      status: true,
      users: users
    });
    
  } catch (error) {
    res.status(400).json ({
      status: false,
      message: error
    });
  }
}

const readUserById = (req, res) => {
  const userId = Number(req.params.id);
  const users = model.getUsers();

  const user = users.find(user => user.id === userId);

  if (user) {
    res.status(200).json ({
      status: true,
      user: user
    });
  }else {
    res.status(400).json ({
      status: false, 
      message: 'User not found'
    });

    return
  }
}

const updateUser = (req, res) => {
  const userId = Number(req.params.id);
  const { firstName, middleName, lastName, gender, birthDate, address, email, username, password } = req.body;
  const users = model.getUsers();

  const userIndex = users.findIndex(user => user.id === userId);

  if(userIndex === -1) {
    res.status(400).json ({
      status: false,
      message: 'User is not found'
    });
   
    return;
  }

  if (firstName) {
    users[userIndex].firstName = firstName;
  }

  if (middleName) {
   users[userIndex].middleName = middleName;
  }

  if (lastName) {
    users[userIndex].lastName = lastName;
  }

  if (gender) {
    users[userIndex].gender = gender;
  }

  if (birthDate) {
    users[userIndex].birthDate = birthDate;
  }

  if (address) {
    users[userIndex].address = address;
  }

  if (email) {
    users[userIndex].email = email;
  }

  if (username) {
    users[userIndex].username = username;
  }

  if (password) {
    users[userIndex].password = password;
  }

  model.saveUsers(users);

  res.status(200).json ({
    status: true,
    message: 'User updated'
  });
}

const deleteUser = (req, res) => {
  const userId = Number(req.params.id);
  const users = model.getUsers();

  const userIndex = users.findIndex(user => user.id === userId);

  if(userIndex === -1) {
    res.status(400).json ({
      status: false,
      message: 'User is not found'
    });
   
    return;
  }

  users.splice(userIndex, 1);
  model.saveUsers(users);
  res.status(200).json ({
    status: true,
    message: 'User Deleted'
  });

}

// const userLogin = (req, res) => {
//   const {username, password} = req.body;
//   const loginCredential = model.loginUser(username, password);

//   if (loginCredential) {
//     res.status(200).json(loginCredential);
//   } else {
//     res.status(400).json (loginCredential);
//   }
// }

const userLogin = (req, res) => {
  const {username, password} = req.body;
  const loginCredential = model.loginUser(username, password);
  const adminLoginCredential = model.loginAdmin(username, password);
 

  if (loginCredential) {
    
    res.status(200).json(loginCredential);
    
  } else if (adminLoginCredential) {
    res.status(200).json(adminLoginCredential);
  }else {
    res.status(400).json (loginCredential);
  }
}

const getAllSalesData = (req, res) => {
  try {
    const { ytd, mtd, years, values } = model.getSalesData();
    res.status(200).json({
        status: true,
        salesData: { ytd, mtd, years, values }
    });
} catch (error) {
    res.status(400).json({
        status: false,
        message: error.message
    });
}

}

const createAdmin = (req, res) => {
  const { employeeId, name, designation, username, password } = req.body;
  const adminUser = model.getUsersAdmin();

  const adminUserExist = adminUser.some(adminUser => adminUser.username === username || adminUser.employeeId === employeeId);

  if (adminUserExist) {
    res.status(400).json({
      status: false,
      message: 'Username or Employee ID is already existing'
    });

    return;
  }

  if (!employeeId) {
    res.status(400).json({
      status: false,
      message: 'Employee ID is required'
    });
    return;
  }

  if (!name) {
    res.status(400).json({
      status: false,
      message: 'Employee name is required'
    });
    return;
  }

  if (!designation) {
    res.status(400).json({
      status: false,
      message: 'Employee Designation is required'
    });
    return;
  }

  if (!username) {
    res.status(400).json({
      status: false,
      message: 'Username is required'
    });
    return;
  }

  if (!password) {
    res.status(400).json({
      status: false,
      message: 'Password name is required'
    });
    return;
  }

  const newAdminUser = { id: adminUser.length +1, employeeId, name, designation, username, password };

  adminUser.push(newAdminUser);
  model.saveUsersAdmin(adminUser);
  res.status(200).json ({
    status: true,
    message: 'User successfully added'
  });
}

const readAllAdmin = (req, res) => {
  try {
    const adminUser = model.getUsersAdmin();
    res.status(200).json({
      status: true, 
      adminUser: adminUser
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error
    });
  }
}

const updateAdmin = (req, res) => {
  const adminUserId = Number(req.params.id);
  const { employeeId, name, designation, username, password } = req.body;
  const adminUser = model.getUsersAdmin();

  const adminUserIndex = adminUser.findIndex(adminUser => adminUser.id === adminUserId);

  if (adminUserIndex === -1) {
    res.status(400).json ({
      status: false,
      message: 'User ID not found'
    });

    return;
  }

  if (employeeId) {
    adminUser[adminUserIndex].employeeId = employeeId;
  }

  if (name) {
    adminUser[adminUserIndex].name = name;
  }

  if (designation) {
    adminUser[adminUserIndex].designation = designation;
  }

  if (username) {
    adminUser[adminUserIndex].username = username;
  }

  if (password) {
    adminUser[adminUserIndex].employeeId = password;
  }

  model.saveUsersAdmin(adminUser);

  res.status(200).json({
    status: true,
    message: 'Admin user updated'
  })
}

const deleteAdmin = (req, res) => {
  const adminUserId = Number(req.params.id);
  const adminUser = model.getUsersAdmin();
  const adminUserIndex = adminUser.findIndex(adminUser => adminUser.id === adminUserId);
 

  
  if (adminUserIndex === -1) {
    res.status(400).json ({
      status: false,
      message: 'User ID not found'
    });

    return;
  }

  adminUser.splice(adminUserIndex, 1);
  model.saveUsersAdmin(adminUser);
  res.status(200).json({
    status: true,
    message: 'Admin deleted'
  });
}

const readAdminById = (req, res) => {
  const adminUserId = Number(req.params.id);
  const adminUsers = model.getUsersAdmin();

  const adminUser = adminUsers.find(adminUser => adminUser.id === adminUserId);

  if (adminUser) {
    res.status(200).json ({
      status: true,
      user: adminUser
    });
  }else {
    res.status(400).json ({
      status: false, 
      message: 'Admin user not found'
    });

    return
  }
}

const addMessageInbox = (req, res) => {
  const { name, email, messageType, messageBody } = req.body;
  const messages = model.getAllMessage();

  if (!name) {
    res.status(400).json ({
      status: false,
      message: 'Name is required'
    });

    return;
  }

  if (!email) {
    res.status(400).json ({
      status: false,
      message: 'Email is required'
    });

    return;
  }

  if (!messageType) {
    res.status(400).json ({
      status: false,
      message: 'Message Type is required'
    });

    return;
  }

  if (!messageBody) {
    res.status(400).json ({
      status: false,
      message: 'Message is required'
    });

    return;
  }

  const message = { id: messages.length +1, name, email, messageType, messageBody };

  messages.push(message);
  model.saveMessage(messages);
  res.status(200).json({
    status: true,
    message: 'Message successfully added'
  });
}

const readAllMessage = (req, res) => {
  try {
    const messages = model.getAllMessage();
    res.status(200).json ({
      status: true,
      messages: messages
    });
  }catch (error) {
    res.status(400).json ({
      status: false,
      message: error.message
    });
  }
}

const deleteMessage = (req, res) => {
  const messageId = Number(req.params.id);
  const messages = model.getAllMessage();

  const messageIndex = messages.findIndex(message => message.id === messageId);

  if (messageIndex === -1) {
    res.status(400).json ({
      status:false,
      message: 'Message is not found'
    });

    return;
  }

  messages.splice(messageIndex, 1);
  model.saveMessage(messages);
  res.status(200).json ({
    status: true,
    message: 'Message Deleted'
  });
}

const saveLoginUser = (req, res) => {
  const {username, password} = req.body;
  const users = model.getUsers();

  const  userFound = users.filter(user => user.username == username && user.password == password)
 
    model.saveLoginData(userFound);
    res.status(200).json ({
      status: true,
      message: 'User successfully added',
      user: userFound
    });
}

const getLoginUser = (req,res) => {
  try {
    const user = model.getLoginData();
    res.status(200).json({
        status: true,
        user: user
    });
} catch (error){
    res.status(400).json({
        status: false,
        message: error.message
    });
}
}



module.exports = {
    getAllProducts,
    getHistory,
    addProduct,
    updateProduct,
    deleteProduct,
    addToHistory,
    addingToCart,
    addQuantity,
    minusQuantity,
    deleteCartProduct,
    populateCart,
    createUser,
    readUser,
    readUserById,
    updateUser,
    deleteUser,
    readAdminById,
    userLogin,
    saveLoginUser,
    getAllSalesData,
    createAdmin,
    readAllAdmin,
    updateAdmin,
    deleteAdmin,
    addMessageInbox,
    readAllMessage,
    deleteMessage,
    getLoginUser
};
