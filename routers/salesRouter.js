const express = require('express');
const controller = require('../controllers/controller');
const salesRouter = express.Router();


salesRouter.get('/salesData', controller.getAllSalesData);

module.exports = salesRouter;