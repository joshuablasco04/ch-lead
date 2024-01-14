const express = require('express');

const controller = require('../controllers/controller');

const adminRouter = express.Router();

adminRouter.post('/createAdmin', controller.createAdmin);
adminRouter.get('/readAllAdmin', controller.readAllAdmin);
adminRouter.get('/readAdminById/:id', controller.readAdminById);
adminRouter.put('/updateAdmin/:id', controller.updateAdmin);
adminRouter.delete('/deleteAdmin/:id', controller.deleteAdmin);


module.exports = adminRouter;