
const express=require('express');
const { createProduct, getAllProduct, updateProduct, deleteProduct } = require('../controllers/ProductController');
const upload = require('../Middleware/upload');

const router=express.Router();


router.post('/createProduct',upload.single('file'),createProduct);
router.get('/getAllProduct',getAllProduct);
router.put('/updateProduct/:id',updateProduct);
router.delete('/deleteProduct/:id',deleteProduct);



module.exports=router;