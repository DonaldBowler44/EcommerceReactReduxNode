const Cart = require("../../models/Cart");
const Product = require("../../models/Product");


// create cart insert into cart
const createCart = async (req, res) => {
    const userId = req.body.userId;
    const productId = req.body.productId;
    const quantity = req.body.quantity;
    const price = req.body.price;

    //console.log('backend create cart: ', userId, productId, quantity, price);

    // const userId = req.params.userId;

    try {

        //try to find cart by userId
        let cart = await Cart.findOne({ userId: userId });

        //console.log('backend cc find cart: ', cart);

        //if cart doesn't exist
        if (!cart) {
            cart = new Cart({
                userId,
                products: [{ productId, quantity, price }],
                totalAmount: price * quantity,
            });

            //console.log('backend cc find cart if donesnt exist: ', cart);

        } else {
             // If a cart exists, check if the product already exists in the cart
            const productIndex = cart.products.findIndex(
                (product) => product.productId === productId
            );

            if (productIndex !== -1) {
                // If the product already exists in the cart, update the quantity
                cart.products[productIndex].quantity += quantity;
              } else {
                // If the product doesn't exist in the cart, add it as a new product entry
                cart.products.push({ productId, quantity, price });
              }

              // Recalculate the totalAmount
            cart.totalAmount = calculateTotalAmount(cart.products);
        }

        await cart.save();
    } catch (err) { 
        res.status(500).json(err); 
    }
}

const calculateTotalAmount = (products) => {
  let totalAmount = 0;
  for (const product of products) {
    totalAmount += (product.price * product.quantity);
  }
  return totalAmount;
};

//read into cart
const readCart = async (req, res) => {

    const userId = req.params.userId;

    try {

        //try to find cart by userId
        const cart = await Cart.findOne({ userId: userId });

        //console.log('backend cc read cart: ', cart);

        //if cart doesn't exist
        if (!cart) {
            return res.status(400).json({ message: "No cart exist for this userId"});
        }

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}


//delete product item from cart


//cart Id product photo route
const orderProdImageForCart = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Find the cart by userId
        const cart = await Cart.findOne({ userId: userId });

        // If cart doesn't exist
        if (!cart) {
            return res.status(400).json({ message: 'Cart nto found' });
        }

        //find products Ids by cart
        const productIds = cart.products.map((product) => product.productId);

        //find products by productId
        const products = await Product.find({ _id: { $in: productIds }});

        const imageUrls = products.map((product) => product.imageUrl);
        const titles = products.map((product) => product.title);
        const prices = products.map((product) => product.price);

        const orderProductDetails = {
            imageUrls: imageUrls,
            titles: titles,
            prices: prices,
        }

        ///console.log('This is Order Product details: ', orderProductDetails);
        res.status(200).json({ orderProductDetails });
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Server Error' });
    }
}

const applyDiscountToUserCount = async (req, res) => {
    const userId = req.params.userId;

    try {

        const cart = await Cart.findOne({ userId: userId });

        console.log(cart);
        if(!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Calculate the discount amount
        const discountAmount = cart.totalAmount * 0.1;
        //console.log('this is discount :', discountAmount);

        cart.totalAmount -= discountAmount;
        cart.totalAmount = cart.totalAmount.toFixed(2);
        //console.log('this is discount :', cart.totalAmount);

        const updatedCart = await cart.save();
        res.status(200).json(updatedCart);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

const deleteOrderFromCart = async (req, res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try {
        //find cart by userID
        const cart = await Cart.findOne({ userId: userId });

        if(!cart) {
            return res.status(404).json({ message: "Cart not found"});
        }

        // If a cart exists, check if the product already exists in the cart
        const productIndex = cart.products.findIndex(
            (product) => product.productId === productId
        );

        if (productIndex == -1) {
            return res.status(404).json({ message: "Order not found in the cart" });
        }

        // Decrease the totalAmount by the chosen product's price
        const chosenProduct = cart.products[productIndex];
        cart.totalAmount -= chosenProduct.price;

        // Remove the product from the cart
        cart.products.splice(productIndex, 1);

        await cart.save();
        return res.status(200).json({ message: "Product deleted from cart" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

//sorting functions
//sort by date
const sortByDate = async (req, res) => {
    try {
        const orders = await Cart.find().sort({ createdAt: 'desc' });

        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

//sort by customer
const sortByCustomer = async (req, res) => {
    try {
        const orders = await Cart.find().sort({ userId: 'asc' });

        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

//sort by orders by totalamount
const sortByTotalAmount = async (req, res) => {
    try {
        const orders = await Cart.find().sort({ amount: 'asc' });

        res.status(200).json(orders);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}

module.exports = { sortByTotalAmount, sortByCustomer, sortByDate, orderProdImageForCart, createCart, readCart, applyDiscountToUserCount, deleteOrderFromCart };