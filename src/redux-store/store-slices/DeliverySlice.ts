"use client";

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type DeliveryAddress = {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  houseNumber: string;
  streetAddress: string;
  city: string;
  state: string;
};

type InitialState = {
  addressList: DeliveryAddress[];
}

const initialState: InitialState = {
  addressList: [],
}

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryAddressList: (state, action: PayloadAction<DeliveryAddress[]>) => {
      state.addressList = action.payload
    },
    addDeliveryAddress: (state, action: PayloadAction<DeliveryAddress>) => {
      state.addressList = [...state.addressList, action.payload];
    },
    editDeliveryAddress: (state, action: PayloadAction<DeliveryAddress>) => { 
      state.addressList = state.addressList.map((address) => address.id === action.payload.id ? action.payload : address)
    },
    removeDeliveryAddress: (state, action: PayloadAction<string>) => { 
      state.addressList = state.addressList.filter((address) => address.id !== action.payload)
    }
  },
});

export default deliverySlice;
export const deliveryActions = deliverySlice.actions