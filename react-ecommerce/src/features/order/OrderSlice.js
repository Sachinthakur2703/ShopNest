import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders,ReplaceOrder } from './OrderApi';

const initialState = {
  orders:[],
  status: 'idle',
  currentOrderPlaced:null,
  totalOrders:0
};

export const createOrderAsync = createAsyncThunk(
  'order/createOrder',
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  'order/fetchAllOrders',
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort,pagination);
    return response.data;
  }
);

export const ReplaceOrderAsync = createAsyncThunk(
  'order/ReplaceOrder',
  async (order) => {
    const response = await ReplaceOrder(order); // You should call the correct function here
    return response.data;
  }
);

export const OrderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder:(state)=>{
      state.currentOrderPlaced=null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders.push(action.payload)
        state.currentOrderPlaced=action.payload
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.orders=action.payload.orders
        state.totalOrders=action.payload.totalItems
      })
      .addCase(ReplaceOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ReplaceOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index =  state.orders.findIndex(order=>order.id===action.payload.id)
        state.orders[index] = action.payload;
      })
  },
});

export const {resetOrder}=OrderSlice.actions;
export const selectOrderPlaced=(state)=>state.order.currentOrderPlaced
export const selectOrders=(state)=>state.order.orders
export const selectOrderStatus=(state)=>state.order.status
export const selectTotalOrders=(state)=>state.order.totalOrders
export default OrderSlice.reducer;