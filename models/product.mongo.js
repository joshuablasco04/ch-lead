const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    productAmount: {
        type: Number,
        required: true
    },productImage: {
        type: String,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    }, 
    productName: {
        type: String,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    productAmount: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    unitPrice: {
        type: Number,
        required: true
    }
   
})


const historySchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    productImage: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productAmount: {
        type: Number,
        required: true
    },
    productQuantity: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('product', productSchema);
const cartProduct = mongoose.model('cartProduct', cartSchema);
const cartHistory = mongoose.model('historyProduct', historySchema);

module.exports = { Product, cartProduct, cartHistory };
