import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import prodReducer from "./ProductsSlice";
import cartReducer from "./CartSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    products: prodReducer,
    userlogin: loginReducer,
    cart: cartReducer,
    user:userReducer
  },
});
