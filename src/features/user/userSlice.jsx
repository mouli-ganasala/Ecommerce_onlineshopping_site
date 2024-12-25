import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  fetcheLoggedInUser,
  fetcheLoggedInUserOrders,
  updateUser,
} from "./userAPI";

const initialState = {
  value: 0,
  status: "idle",
  userOrders: [],
  userInfo:null
};

export const fetcheLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetcheLoggedInUserOrders",
  async (userId) => {
    const response = await fetcheLoggedInUserOrders(userId);
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetcheLoggedInUser",
  async (userId) => {
    const response = await fetcheLoggedInUser(userId);
    return response.data;
  }
);

export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (id) => {
    const response = await updateUser(id);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetcheLoggedInUserOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetcheLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectUserOrder = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;



export default userSlice.reducer;
