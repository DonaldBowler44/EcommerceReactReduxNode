import { setUserDetails, apiError } from "../actions/authActions";
import { createReducer } from "@reduxjs/toolkit";

// import auth actions
const initialState = {
    user: null,
    userId: null,
    // token: null,
    error: null,
  };

  const authReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(setUserDetails, (state, action) => {
        state.user = action.payload.userDetails;
        state.userId = action.payload.userId;
        // state.token = action.payload.token;
        state.error = null;
      })
      .addCase(apiError, (state, action) => {
        state.error = action.payload;
      })
      .addDefaultCase((state) => {
        return state;
      });
  });
  

export default authReducer;