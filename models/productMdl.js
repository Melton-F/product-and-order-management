const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    _id:mongoose.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImage:{
        type:String, //its just a url to show
        required:true
    }

})

const Product = mongoose.model('Product', productSchema)

module.exports = Product