const router = require("express").Router();
const productModel = require('../models/productModel')
const auth = require('../authentication/auth')

router.post('/', auth.verifyToken, productModel.addProduct)   //POST - Creates new product /api/products/
router.get('/', productModel.getAllProducts)  //GET - Gets all products /api/products/
router.get('/:id', productModel.getOneProduct) //GET - Gets one product with the correct id /api/products/id
router.put('/:id', auth.verifyToken, productModel.updateProductPrice) //PUT - Updates product price /api/products/id med JSON: "price": 43
router.delete('/:id', auth.verifyToken, productModel.removeProduct) //DELETE - Deletes a product /api/products/id

module.exports = router;