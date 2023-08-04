const express = require('express');
const router = express.Router();
const { sortByDate, sortByCustomer, sortByTotalAmount, createCart, readCart, orderProdImageForCart, applyDiscountToUserCount, deleteOrderFromCart } = require('../controllers/cart/cartController');

router.post('/createCart', createCart);
router.get('/readCart/:userId', readCart);
//orderProdImageForCart
router.get('/ImagesforCart/:userId', orderProdImageForCart);
router.post("/applyDiscount/:userId", applyDiscountToUserCount);
router.post("/deleteOrderfromCart/:userId/:productId", deleteOrderFromCart);

//sorting routes
router.get('/sortByDate', sortByDate);

router.get('/sortByUserId', sortByCustomer);

router.get('/sortByAmount', sortByTotalAmount);

module.exports = router;