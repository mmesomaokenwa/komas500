"use client";

import { getUser } from "@/lib/server-actions/user";
import { User } from "@/lib/types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState: User = {
  fullName: "",
  emailAddress: "",
  profileUrl: "",
  phoneNumber: "",
  address: "",
  postCode: "",
  state: "",
  country: "",
  geolocation: {
    latitude: 0,
    longitude: 0,
  },
  dateOfBirth: "",
  gender: "",
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await getUser();
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => action.payload,
    updateUser: (state, action: PayloadAction<Partial<User>>) => ({
      ...state,
      ...action.payload,
    }),
    resetUser: () => initialState,
  },
  extraReducers: (builder) => { 
    builder
      .addCase(fetchUser.fulfilled, (state, action) => ({
        ...state,
        ...action.payload
      }))
  }
});

export default userSlice;
export const userActions = {...userSlice.actions, fetchUser};