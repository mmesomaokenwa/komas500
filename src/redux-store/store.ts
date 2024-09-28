'use client'

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./store-slices/CartSlice";
import userSlice from "./store-slices/UserSlice";
import deliverySlice from "./store-slices/DeliverySlice";
import toastSlice from "./store-slices/ToastSlice";


const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    delivery: deliverySlice.reducer,
    toast: toastSlice.reducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch