import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import logger from 'redux-logger';

import authReducer from "./reducers/authReducer";
import prodReducer from "./reducers/prodReducers";
import cartReducer from "./reducers/cartReducer";

// configure redux persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
};

// Combine the reducers using combineReducers
const rootReducer = combineReducers({
    auth: authReducer,
    prod: prodReducer,
    cart: cartReducer,
  });

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger),
});

// Create the persisted store
const persistor = persistStore(store);

export { store, persistor }
//export default store;