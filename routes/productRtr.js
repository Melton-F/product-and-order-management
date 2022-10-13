const express = require('express')
const productController = require('../controllers/prdctCtrl')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const fileUpload = multer({
    storage:storage,
    limits: {
        fileSize: 1024*1024*5
    }
})

router.route('/').get(productController.getPrdcts).post(checkAuth, fileUpload.single('productImage'), productController.createPrdcts)

router.route('/:id')
    .get(productController.getbyID)
    .patch(checkAuth, productController.updatebyID)
    .delete(checkAuth, productController.deletebyID)

module.exports = router