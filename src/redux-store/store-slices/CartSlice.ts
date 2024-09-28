'use client'

import { Product } from "@/lib/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  products: Product[];
};

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<InitialState>) => {
      state.products = action.payload.products;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity;
      } else {
        state.products = [...state.products, action.payload];
      }
    },
    removeFromCart: (state, action: PayloadAction<{ productId: string, quantity?: number }>) => {
      const existingProduct = state.products.find(
        (product) => product._id === action.payload.productId
      );

      if (!existingProduct) return;
      
      if (action.payload.quantity) { 
        existingProduct.quantity -= action.payload.quantity
      } else {
        state.products = state.products.filter(product => product._id !== action.payload.productId)
      }
    },
  },
});

export default cartSlice;
export const cartActions = cartSlice.actions;