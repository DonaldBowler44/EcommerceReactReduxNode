import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productPaginationAction } from './store/actions/prodActions';
import { sendCartAction } from './store/actions/cartAction';
import { getUserCartAction, getImagesforCartAction } from './store/actions/cartAction';
import * as api from "./api";
import "./styles/cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const cart = useSelector((state) => state.cart.cart);
  const orderProductDetails = useSelector((state) => state.cart.images);
  //console.log('orderProductDetails in homepage:', orderProductDetails);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [totalAmountwithoutTax, setTotalAmountWithoutTax] = useState(0);
  const [totalAmountWithTax, setTotalAmountWithTax] = useState(0);

  const formatDecimal = (number, decimalPlaces) => {
    const factor = 10 ** decimalPlaces;
    return Math.round(number * factor) / factor;
  };

 
  useEffect(() => {
    dispatch(getUserCartAction(userId));
    dispatch(getImagesforCartAction(userId));
  }, [dispatch, userId]);
  
  useEffect(() => {
    // If userId is null, it means the state is not yet initialized
    if (userId === null) {
      setLoading(true);
    } else {
      setLoading(false);
    }

  }, [userId]);

  useEffect(() => {
    dispatch(productPaginationAction());
     // createCart with userId
     api.createCart(userId);
  }, [dispatch]);

  useEffect(() => {
    if (cart) {
      const taxAmount = formatDecimal(cart.totalAmount * 0.0825, 2);
      const totalAmountwithoutTax = formatDecimal(cart.totalAmount, 2);
      const totalAmountWithTax = formatDecimal(cart.totalAmount + taxAmount, 2);
      setTotalAmountWithTax(totalAmountWithTax);
      setTotalAmountWithoutTax(totalAmountwithoutTax);
    }
  }, [cart]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePromo = async () => {
   
    await api.applyDiscount(userId);
    window.location.reload(false);
};


const HandleRemove = async (productId) => {
  await api.deleteOrderfromCart(userId, productId);
  window.location.reload(false);
   
};


return (

  // css box
  <div className='cart-box'>

    {/* topbar */}
    <div className='topnav'>
      <a className='active' href='/home'>Home</a>
      <a href='/cart'>Cart</a>
      {/* <a href='/cart'>Cart <span className='cart-counter'>{cartProductCount}</span></a> */}
      <input type="text" placeholder='Search..'></input>
    </div>
    
  <div className='cartcontainer'>

      {/* cart page */}
      <h1 className='cartHOne'>Cart</h1>
      {cart ? (
        <div className='cartBorder'>

          <p className='cartPOne'>UserID: {cart.userId}</p>
          <div className='cartTotalBorder'>
            <h className='sumStyle'>Summary:</h>
          <p className='cartPTwo'>Total Amount: ${totalAmountwithoutTax}</p>
          {/* <p>Total Amount: {cart.totalAmount}</p> */}
          {/* <p>Total Amount: {cart.totalAmount.toFixed(2)}</p> */}
          <p className='cartPThree'>Total Amount with Tax: ${totalAmountWithTax}</p>
          </div>
          <div className='prodSection'>
          <h1>Products:</h1>
          <ul>
            {cart.products && cart.products.length > 0 ? (
              cart.products.map((product) => (
                <li key={product.productId}>
                  <div className='cartProdBord'>
                    <p>
                      productId: {product.productId}</p>
                    <p>Price: {product.price}</p>
                    <p>Quantity: {product.quantity}</p>
                    <button className='cartRemoveBut' onClick={() => HandleRemove(product.productId)}>Remove from cart</button>
                  </div>
                </li>
              ))
            ) : (
              <li>No details found.</li>
            )}
          </ul>
          </div>
        </div>
      ) : (
        <p>No cart found.</p>
      )}

{orderProductDetails && orderProductDetails.imageUrls.length > 0 ? (
  <div className='orderProdBox'>
    {/* <h2>Order Product Details:</h2> */}
    <p>Product details:</p>
    <ul>
      {orderProductDetails.imageUrls.map((imageUrl, index) => (
        <li className='prodList' key={index}>
          <img className='orderprodimg' src={imageUrl} alt="Product" style={{ width: '20%' }}  />

          <div className='flextitle'>
            <p className='orderProdTitle'>{orderProductDetails.titles[index]}</p>
            <p className='orderProdPRice'>${orderProductDetails.prices[index]}</p>
          </div>
        </li>
      ) )}
    </ul>
  </div>
) : (
  <p>No order product details found.</p>
)}


    <div className='promoPosition'>
    <input
        className='promoCodeInput'
        type="text"
        placeholder="Enter promo code..."
        value={promoCode}
        onChange={(e) => setPromoCode(e.target.value)}
        />
        <button 
        className="promoCodeButton"
        onClick={handlePromo}>Apply</button>
        </div>

  </div>

  {/* footer */}
  <div className='footer'>
      <p>@VEXED Industries</p>
  </div>
  </div>
);

  }
  
  export default Cart;
  