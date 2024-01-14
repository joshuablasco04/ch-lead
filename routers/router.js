const express = require('express');
const controller = require('../controllers/controller');
const router = express.Router();



    router.get('/getAllProducts',controller.getAllProducts)
    router.post('/addProduct',controller.addProduct)
    router.put('/updateProduct/:id',controller.updateProduct)
    router.delete('/updateProduct/:id',controller.deleteProduct)
    router.post('/addToCart/:id', controller.addingToCart)
    router.get('/getCart', controller.populateCart)
    router.put('/getCart/:id', controller.addQuantity)
    router.delete('/getCart/:id', controller.minusQuantity)
    router.get('/getHistory',controller.getHistory)
    router.post('/addToHistory',controller.addToHistory)
    router.delete('/deleteCart', controller.deleteCartProduct)

 
module.exports = router;