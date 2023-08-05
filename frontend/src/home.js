import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productPaginationAction } from './store/actions/prodActions';
import { sendCartAction } from './store/actions/cartAction';
import { getUserCartAction, getImagesforCartAction } from './store/actions/cartAction';
import menFash from './assets/VexMain.png';
import * as api from "./api";
import "./styles/home.css";

const Home = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const products = useSelector((state) => state.prod.products);
  const cart = useSelector((state) => state.cart.cart);
  const orderProductDetails = useSelector((state) => state.cart.images);
  //console.log('orderProductDetails in homepage:', orderProductDetails);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [totalAmountWithTax, setTotalAmountWithTax] = useState(0);

  //sorting state
  const [sortState, setSortState] = useState('none');
  const [searchTerm, setSearchTerm] = useState('');
  //const [cartProductCount, setCartProductCount] = useState(cart?.products.length || 0);

  // Instead of directly using cart?.products.length, we check if cart is null first
  //const [cartProductCount, setCartProductCount] = useState(cart ? cart.products.length : 0);
  const [cartProductCount, setCartProductCount] = useState(cart?.products?.length || 0);

  const sortMethods = {
    none: { method: (a, b) => null},
    name: { method: (a, b) => a.title.localeCompare(b.title) },
    nameTwo: { method: (a, b) => b.title.localeCompare(a.title) },
    price: { method: (a, b) => b.price - a.price },
    priceTwo: { method: (a, b) =>a.price - b.price },
    quant: { method: (a, b) =>a.quantity - b.quantity },
    quantTwo: { method: (a, b) =>b.quantity - a.quantity },
  }
 
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
      const taxAmount = cart.totalAmount * 0.0825;
      const totalAmountWithTax = cart.totalAmount + taxAmount;
      setTotalAmountWithTax(totalAmountWithTax);

      // Use optional chaining here to handle the case when cart.products is undefined
      setCartProductCount(cart.products?.length || 0);
    } else 
    {
      // If cart is null, set cartProductCount to 0
      setCartProductCount(0);
    }
    //setCartProductCount(cart?.products.length || 0);
  }, [cart]);
  
  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePromo = async () => {
   
    await api.applyDiscount(userId);
    window.location.reload(false);
};

  const handleCartOrder = async (product) => {

    const UserIdData = {
      userId: userId,
      productId: product._id,
      quantity: product.quantity,
      price: product.price,
  };
  console.log('This is the handleCart data: ',UserIdData);
  dispatch(sendCartAction(UserIdData));
  // handleCartOps();

  // Refresh the page after adding the product to the cart
  window.location.reload(false);
};

const HandleRemove = async (productId) => {
  await api.deleteOrderfromCart(userId, productId);
  window.location.reload(false);
   
};

// Function to handle changes in the search input
const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};

// Modify the product rendering to filter based on the search input
const filteredProducts = products
.filter((product) =>
  product.title.toLowerCase().includes(searchTerm.toLowerCase())
)
.sort(sortMethods[sortState].method);

// Sort the filtered products using the selected sort method
const sortedProducts = filteredProducts.slice().sort(sortMethods[sortState].method);



return (

  // css box
  <div className='home-box'>

    {/* topbar */}
    <div className='topnav'>
      <a className='active' href='/home'>Home</a>
      {/* <a href='/cart'>Cart</a> */}
      {/* <a href='/cart'>Cart <span className='cart-counter'>{cartProductCount}</span></a> */}
      <a href='/cart'>Cart <span className='cart-counter'>{cartProductCount}</span></a>
      <input
        type="text"
        placeholder='Search..'
        value={searchTerm}
        onChange={handleSearch} // Attach the handleSearch function to the input's onChange event
      />
    </div>

    {/* title card */}
    <div className='titlecard'>
      <div className='titlecardCont'>
        <h1 className='vexhex'>VEXED</h1>
        <img src={menFash} className='menimg' alt="man icon" />
      </div>
    </div>

    {/* select bar */}
    <div className='selnav'>
      {/* select option value */}
    <select className="custom-select" defaultValue="DEFAULT" onChange={(e) => setSortState(e.target.value)}>
      <option value="DEFAULT" disabled>Sort by...</option>
      <option value="name">NAME A-Z</option>
      <option value="nameTwo">NAME Z-A</option>
      <option value="price">HIGHEST PRICE</option>
      <option value="priceTwo">LOWEST PRICE</option>
      <option value="quant">LOWEST QUANTITY</option>
      <option value="quantTwo">HIGHEST QUANTITY</option>
    </select>
    </div>
  <div className='container'>

    {/* product page */}
    {sortedProducts.map((product) => (
      <div className="Cardborder" key={product._id}>
        <img className='productimg' src={`${product.imageUrl}`} alt={product.title} />
        <h3 className='prodTitle'>{product.title}</h3>
        <p className='prodDesc'>{product.desc}</p>
        {/* <p className='quantity'>Quantity: {product.quantity}</p> */}

        {/* Dropdown menu for selecting quantity */}
        <label className='quantity' htmlFor={`quantity-${product._id}`}>Quantity:</label>
        <select
          id={`quantity-${product._id}`}
          name="quantity"
          defaultValue={1}
        >
        {/* Generate options dynamically based on available quantity */}
        {Array.from({ length: product.quantity }, (_, index) => index + 1).map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
        </select>

        <p className='prodprice'>${product.price}</p>
        <button className='prodButton' onClick={() => handleCartOrder(product)}>Add to Cart</button>
      </div>
    ))}

  </div>

  {/* footer */}
  <div className='footer'>
      <p>@VEXED Industries</p>
  </div>
  </div>
);

  }
  
  export default Home;
  