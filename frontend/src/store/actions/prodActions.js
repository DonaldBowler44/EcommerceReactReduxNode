import { createAction } from "@reduxjs/toolkit";
import * as api from '../../api';

export const retrieveProductDetails = createAction('FETCH.RET_PROD_DETAILS');

export const apiError = createAction('AUTH/PROD_API_ERROR');

// Create async action creators
export const productPaginationAction = () => async (dispatch) => {
    try {
        const response = await api.showAllProducts();
        dispatch(retrieveProductDetails(response));
      } catch (error) {
        dispatch(apiError(error.message));
      }
  };