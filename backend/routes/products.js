const express = require('express');
const router = express.Router();
const { getProductById, showallProducts, upload, uploadProduct } = require('../controllers/products/prodController');

router.post('/uploadProduct',
upload.single('imageUrl'),  
uploadProduct
);

router.get('/showallProducts',
showallProducts
);

router.get('/getProduct/:prodId',
getProductById
);

module.exports = router;