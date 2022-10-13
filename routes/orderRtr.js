const express = require('express')
const orderController = require('../controllers/orderCtrl')
const checkAuth = require('../middleware/check-auth')

const router = express.Router()

router.route('/').get(checkAuth, orderController.getOrders).post(checkAuth, orderController.createOrders)

router.route('/:id')
    .get(checkAuth, orderController.getbyID)
    .patch(checkAuth, orderController.updatebyID)
    .delete(checkAuth, orderController.deletebyID)



module.exports = router