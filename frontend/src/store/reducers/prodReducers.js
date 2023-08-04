import { createReducer } from "@reduxjs/toolkit";
import { retrieveProductDetails, apiError } from "../actions/prodActions";

// import auth actions
const initialState = {
    products: [],
    load: false,
    error: null,
  };

  const prodReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(retrieveProductDetails, (state, action) => {
        state.products = action.payload;
        // console.log('A Reducer for prod: ', action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(apiError, (state, action) => {
        state.error = action.payload.message; // Access the error message from the payload
        state.loading = false;
        state.error = null;
      })      
  });
  

export default prodReducer;

