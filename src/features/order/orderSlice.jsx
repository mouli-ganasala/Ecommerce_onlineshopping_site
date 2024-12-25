import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder} from './orderAPI';

const initialState = {
  value: 0,
  status: 'idle',
  order:[],
  currentOrder:null,
  totalOrders:0
};

export const createOrderAsync = createAsyncThunk(
  'counter/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);


export const fetchAllOrdersAsync = createAsyncThunk(
  'counter/fetchAllOrders',
  async ({pagination}) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);



export const updateOrderAsync = createAsyncThunk(
  'counter/updateOrder',
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
   resetOrder:(state)=>{
    state.currentOrder=null
   }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order.push(action.payload);
        state.currentOrder=action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.order=action.payload.order;
        state.totalOrders=action.payload.totalOrders;
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index = state.order.findIndex(
          (order) => order.id === action.payload.id
        );
        state.order[index] = action.payload;//edit order
      });;
  },
});

export const {resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.order;
export const selectTotalOrders = (state) => state.order.totalOrders;
export default orderSlice.reducer;