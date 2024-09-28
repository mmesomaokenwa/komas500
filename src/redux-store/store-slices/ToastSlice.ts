'use client'

import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type Toast = {
  id?: string
  title?: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

const initialState: Toast[] = []

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.push(action.payload)
    },
    removeToast: (state, action: PayloadAction<string>) => {
      return state.filter((toast) => toast.id !== action.payload)
    }
  }
})

export const toastActions = toastSlice.actions

export default toastSlice