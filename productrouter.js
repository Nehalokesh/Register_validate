const router = require('express').Router();
const productController = require('../controller/productcontroller');

router.get('/getall', productController.getProducts);

router.post('/add', productController.AddProduct);

router.put('/editProduct/:prodId',productController.editProduct);

router.delete('/delete/:prodId',productController.delete)

module.exports = router;