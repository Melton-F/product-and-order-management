const express = require('express')
const app = express()
const productRoutes = require('./routes/productRtr')
const orderRoutes = require('./routes/orderRtr')
const userRoutes = require('./routes/userRoute')
const morgan = require('morgan')
// const bodyParser = require('body-parser')

app.use(express.json())
app.use(morgan('dev'))
app.use("/uploads", express.static("uploads")); // we use the middleware to show the uploaded pics dynamicallya!zw2EXCRTVRXE


app.use('/products',productRoutes )
app.use('/orders', orderRoutes)
app.use('/users', userRoutes)
// app.use(express.urlencoded({ extended: false }))
// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json())

app.all('*', (req, res, next)=>{
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((err, req, res, next)=>{
    res.status(err.status || 500)
    console.log(err);
    res.json({
        error:{
            message:err.message
        }
    })
})

module.exports = app