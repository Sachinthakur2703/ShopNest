import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,fetchItemsByUserId, UpdateCart,DeleteCart, ResetCart } from './CartAPI';

const initialState = {
 status:"idle",
  items:[],
  cartLoaded:false
  
};
export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  }
);
export const UpdateCartAsync = createAsyncThunk(
  'cart/UpdateCart',
  async (update) => {
    const response = await UpdateCart(update);
    return response.data;
  }
);
export const DeleteCartAsync = createAsyncThunk(
  'cart/DeleteCart',
  async (itemId) => {
    const response = await DeleteCart(itemId);
    return response.data;
  }
);
export const ResetCartAsync = createAsyncThunk(
  'cart/ResetCart',
  async () => {
    const response = await ResetCart();
    return response.data;
  }
);
export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload)
      })
      .addCase(fetchItemsByUserIdAsync .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync .fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=action.payload
        state.cartLoaded=true
      })
      .addCase(fetchItemsByUserIdAsync .rejected, (state, action) => {
        state.status = 'idle';
       state.cartLoaded=true
      })
      .addCase(UpdateCartAsync .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateCartAsync .fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index]=action.payload
      })
      .addCase(DeleteCartAsync .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(DeleteCartAsync  .fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1)
      })
      .addCase(ResetCartAsync .pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ResetCartAsync  .fulfilled, (state, action) => {
        state.status = 'idle';
        state.items=[]
      });
  },
});

export const { increment } = CartSlice.actions;

export const selectItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;
export const selectCartLoaded = (state) => state.cart.cartLoaded;
export default CartSlice.reducer;
