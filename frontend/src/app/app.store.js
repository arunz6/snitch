import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/state/auth.slice";
import productReducer from "../feature/products/state/product.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
  },
});
