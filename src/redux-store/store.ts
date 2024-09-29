'use client'

import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./store-slices/CartSlice";
import deliverySlice from "./store-slices/DeliverySlice";


const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    delivery: deliverySlice.reducer,
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch