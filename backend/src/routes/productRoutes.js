
const express=require('express');
const { createProduct, getAllProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');


const router=express.Router();


router.post('/createProduct',createProduct);
router.get('/getAllProduct',getAllProduct);
router.put('/updateProduct/:id',updateProduct);
router.delete('/deleteProduct/:id',deleteProduct);



module.exports=router;