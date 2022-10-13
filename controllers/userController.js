// const mongoose = require('mongoose')
const { default: mongoose } = require('mongoose')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next)=>{
    bcrypt.hash(req.body.password, 10, (error, hash)=>{
        if(error){
            res.status(500).json({
                error:error
            })
        }
        else{
            const user = new User({
                _id:new mongoose.Types.ObjectId(),
                email:req.body.email,
                password: hash //it will save the hashed password in the mongoose
            })
            user.save().then(response=>{   //user.save() used to save it in the database
                res.status(201).json({
                    message:"user created successfully",
                    userData:response
                }).catch(e=>{
                    res.send(e)
                })
            })
        }
    })

}

exports.login = (req, res, next)=>{
    User.findOne({email:req.body.email}).then(user =>{
        if(user){
            bcrypt.compare(req.body.password, user.password, (err, result)=>{   //this method will compare the db password and the password we enter while login to verify
                console.log(user);
                // console.log(err);
                if(err){
                    return res.status(401).json({
                        message:"Auth failed",
                        // err
                    })
                }
                if(result){  //the secons params here will give true when the password compared and return correctly
                    const payloadData = {
                        userMail: user.email,
                        userId: user._id,
                        // userMessage: "keep quite"
                    }
                    const token = jwt.sign(payloadData, "secretMessage", {expiresIn:"1h"})
                    return res.status(200).json({
                        message:"Auth Successful",
                        token
                    })
                }
                res.status(401).json({
                    message:"Auth failed"
                })
            })
        }
        else{
            res.status(404).json({
                message:"user not found"
            })
        }
    }).catch(err=>{
        res.status(500).json({
            error:err
        })
    })
}