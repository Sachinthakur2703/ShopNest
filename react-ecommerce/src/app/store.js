import { configureStore } from '@reduxjs/toolkit';
import ProductSliceReducer from "../features/product.list/ProductSlice"
import AuthReducer from "../features/Auth/AuthSlice"
import CartSlice from '../features/cart/CartSlice';
import OrderReducer from "../features/order/OrderSlice"
import UserReducer from "../features/user/UserSlice"
export const store = configureStore({
  reducer: {
    product: ProductSliceReducer,
    auth: AuthReducer,
    cart: CartSlice,
    order:OrderReducer,
    user:UserReducer
  }
});