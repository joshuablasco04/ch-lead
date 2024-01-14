const express = require('express');
const controller = require('../controllers/controller');
const userRouter = express.Router();

    userRouter.post('/create', controller.createUser);
    userRouter.get('/read', controller.readUser);
    userRouter.get('/read/:id', controller.readUserById);
    userRouter.put('/update/:id', controller.updateUser);
    userRouter.delete('/delete/:id', controller.deleteUser);
    userRouter.post('/login', controller.userLogin);
    userRouter.get('/loginUser', controller.getLoginUser);
    userRouter.post('/loginData', controller.saveLoginUser);


module.exports = userRouter;