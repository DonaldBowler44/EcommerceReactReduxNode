import { createReducer } from "@reduxjs/toolkit";
import { sendCartDetails, getCartOrderDetails, getImagesforCart, apiError } from "../actions/cartAction";

// import cart actions
const initialState = {
    orders: [],
    images: null,
    // orderProducts: {
    //     imageUrls: [],
    //     titles: [],
    //     prices: [],
    //   },
    cart: null,
    load: false,
    error: null,
  };

  const CartReducer = createReducer(initialState, (builder) => {
    builder
    .addCase(sendCartDetails, (state, action) => {
        state.orders = action.payload;
        state.load = false;
        state.error = null;
    })
    .addCase(getCartOrderDetails, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getImagesforCart, (state, action) => {
        state.images = action.payload.orderProductDetails; // Store the image details in the 'images' property
        state.loading = false;
        state.error = null;
        //console.log('getImagesForCart reducer: ', state.images);
      })
    //   .addCase(getImagesforCart, (state, action) => {
    //     const { imageUrls, titles, prices } = action.payload;
    //     console.log("Response from gIFCA reducer:", action.payload);
        // state.orderProducts.imageUrls.push(...imageUrls);
        // state.orderProducts.titles.push(...titles);
        // state.orderProducts.prices.push(...prices);
        // state.orderProducts = {
        //   imageUrls: imageUrls,
        //   titles: titles,
        //   prices: prices,
        // };

    //     state.orderProducts = {
    //         imageUrls: state.orderProducts.imageUrls.concat(imageUrls),
    //         titles: state.orderProducts.titles.concat(titles),
    //         prices: state.orderProducts.prices.concat(prices),
    //       };

    //     console.log('add case orderProducts gIFCA: ', state.orderProducts);
    //   })
    .addCase(apiError, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.error = null;
    })
  });

  export default CartReducer;
  