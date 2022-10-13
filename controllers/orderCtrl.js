const mongoose = require('mongoose')
const Product = require('../models/productMdl')
const Order = require('../models/orderMdl')

const getOrders = (req, res, next)=>{
    Order
        .find()
        .select('_id product quantity')
        .populate('product')
        .then(AllOrders=>{
            res.status(200).json({
                status:"success",
                no_of_orders:AllOrders.length,
                orders:{
                    AllOrders
                }
            })
        })
        .catch(e=>{
            res.send({error:e})
        })
}

const createOrders = (req, res, next)=>{
    // console.log(req.body)
    Product.findById(req.body.productId)
        .then(product=>{
            if(!product){
                return res.status(404).json({
                    message:"Product not found"
                })
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            })
            return order.save()
        })
        .then(resolve =>{
            console.log(resolve);
            res.status(201).json({
                message:"order created",
                createdOrder:resolve
        })
        
        
    })
    // res.status(201).json({
    //     message:"order created",
    //     // createdOrder:order
    // })
}

const getbyID = (req, res, next)=>{
    Order
        .findById(req.params.id)
        .populate('product')
        .then(order =>{
            if(!order){
                return res.status(400).json({
                    message:"order not found"
                })
            }
            res.status(200).json({
                order:order
            })
        }).catch(err =>{
            res.send({Error_message:err.message})
        })
}

const updatebyID = (req, res, next)=>{
    res.status(200).json({
        message:"order updated"
    })
}

const deletebyID = (req, res, next)=>{
    Order.remove({_id:req.params.id}).then(()=>{
        res.send("Order deleted")
    }).catch(e=>{
        res.status(404).json({
            message:e.message
        })
    })
}


module.exports ={
    getOrders, createOrders, getbyID, updatebyID, deletebyID
}