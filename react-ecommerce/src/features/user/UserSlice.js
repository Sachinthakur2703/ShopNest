import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLoggedInOrder,fetchLoggedInUser,UpdateUser } from './UserApi';

const initialState = {

  status: 'idle',
  userInfo:null
};
export const fetchLoggedInOrderAsync = createAsyncThunk(
  'user/fetchLoggedInOrder',
  async () => {
    const response = await fetchLoggedInOrder();
    
    return response.data;
  }
);
export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async () => {
    const response = await fetchLoggedInUser();
    console.log(response)
    return response.data;
  }
);
export const UpdateUserAsync = createAsyncThunk(
  'user/UpdateUser',
  async (update) => {
    
      const response = await UpdateUser(update);
      return response.data;
    } 
  
);

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this indo can be different or more form logged in user info
        state.userInfo.orders = action.payload;
      })
      .addCase(UpdateUserAsync.pending, (state, action) => {
        state.status = 'loading';
        
      })
      .addCase(UpdateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // this indo can be different or more form logged in user info
        state.userInfo = action.payload;
        
      })
      
     
  },
});

export const { increment } = UserSlice.actions;
export const selectOrder = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus=(state)=>state.user.status
export default UserSlice.reducer;
