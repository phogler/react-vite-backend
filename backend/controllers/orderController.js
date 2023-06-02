const router = require('express').Router()
const orderModel = require('../models/orderModel')
const auth = require('../authentication/auth')

router.get('/', auth.verifyToken, orderModel.getOrders)   //GET api/orders/ - Gets orders the logged in user has created
router.get('/:id', auth.verifyToken, orderModel.getOrderById) //GET api/orders/id - Gets order based on id 
router.post('/', auth.verifyToken, orderModel.createNewOrder)  //POST api/orders/ - Create a new order if logged in
router.put('/:id', auth.verifyToken, orderModel.updateOrderStatus) //PUT - /api/orders/id Updates order status  JSON: "status": 1

module.exports = router

/*JSON example POST =
{
    "orderRows": [
    {
    "product": "646265f45d3555e1e6d971fd",
    "quantity": 2
    },
    {
    "product": "646267405d3555e1e6d97200",
    "quantity": 13
    },
    {
    "product": "6462697e5d3555e1e6d9720c",
    "quantity": 44
    }
    ]
}
*/