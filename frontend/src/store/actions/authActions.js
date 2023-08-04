import { createAction } from '@reduxjs/toolkit';
import * as api from "../../api";

// export const setUserDetails = createAction('AUTH.SET_USER_DETAILS');
export const setUserDetails = createAction('AUTH.SET_USER_DETAILS', (response, userId) => {
    return {
      payload: {
        userDetails: response,
        userId: userId,
      }
    };
  });

  export const apiError = createAction('AUTH/API_ERROR');

  export const registerUserAction = (userData) => async (dispatch) => {
    try {
      const response = await api.registerUser(userData);
      if (response.error) throw response.exception;
      dispatch(setUserDetails(response));
    } catch (error) {
      dispatch(apiError(error));
    }
  };

  export const loginUserAction = (userData) => async (dispatch) => {
    try {
      const response = await api.loginUser(userData);
      console.log('Login Action: ', response);
      if (response.error) throw response.exception;
      const userId = response.userDetails.userId;
      // const token = response.userDetails.token;
      dispatch(setUserDetails(response, userId));
      // dispatch(setUserDetails(response));
    } catch (error) {
      dispatch(apiError(error));
    }
  };