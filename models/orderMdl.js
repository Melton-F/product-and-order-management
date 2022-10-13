const mongoose = require('mongoose')

const orderScema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    product: [
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required:true
    }],
    quantity:{
        type:Number,
        // required:true,
        default:1
    }

})

const Order = mongoose.model('Order', orderScema)

module.exports = Order