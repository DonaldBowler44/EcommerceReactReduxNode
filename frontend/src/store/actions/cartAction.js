import { createAction } from "@reduxjs/toolkit";
import * as api from '../../api';

export const sendCartDetails = createAction('CART.SEND_CART_DETAILS');
export const getCartOrderDetails = createAction('CART.GET_USER_CART');
export const getImagesforCart = createAction('CART.GET_IMAGES');

export const apiError = createAction('CART/CART_API_ERROR');

export const sendCartAction = (userData) => async (dispatch) => {
    try {  //createCart
      const response = await api.createCart(userData);
      console.log('This is the sendCartAction: ', response);
      if (response.error) throw response.exception;
      dispatch(sendCartDetails(response));
    } catch (error) {
      dispatch(apiError(error));
    }
  };

  export const getUserCartAction = (userId) => async (dispatch) => {
    try {
        //console.log("UserId for cart action:", userId);
        const response = await api.readCartAPI(userId);
        // console.log("Response from API:", response);
        dispatch(getCartOrderDetails(response));
        //console.log("Response from API dispatch:", response);
      } catch (error) {
        dispatch(apiError(error));
      }
  };

  export const getImagesforCartAction = (userId) => async (dispatch) => {
    try {
      const response = await api.getProdImage(userId);
      //console.log("Response from gIFCA:", response);
      dispatch(getImagesforCart(response.data));
    } catch (error) {
      dispatch(apiError(error));
    }
  };
  
