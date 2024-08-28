import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, createUser,signOut,checkAuth, resetPasswordRequest ,resetPassword} from './AuthAPI';

const initialState = {
  loggedInUserToken: null, //this should only contain user identity id
  status: 'idle',
  error:null,
  userChecked:false,
  mailSent:false,
  resetPassword:false,
};
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData,{rejectWithValue}) => {
    try{
      const response = await createUser(userData);
      return response.data;
    }
    catch(error){
      return rejectWithValue(error)
    }
  }
);
export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (logininfo,{rejectWithValue}) => {
    
      try{
        const response = await loginUser(logininfo);
      return response.data;
      }
      catch(error){
        console.log(error)
        return rejectWithValue(error)
        }
    } 
  
);
export const checkAuthAsync=createAsyncThunk(
  "user/checkAuth",
  async()=>{
   try{
    const response= await checkAuth()
    return response.data;
   }
   catch(error){
    console.log(error);
    
    
   }
  }
  
)
export const  resetPasswordRequestAsync=createAsyncThunk(
  "user/resetPasswordRequest",
  async(email,{rejectWithValue})=>{
   try{
    const response= await resetPasswordRequest(email)
    return response.data;
   }
   catch(error){
    console.log(error);
    return rejectWithValue(error)
    
   }
  }
  
)
export const  resetPasswordAsync=createAsyncThunk(
  "user/resetPassword",
  async(data,{rejectWithValue})=>{
   try{
    const response= await resetPassword(data)
    return response.data;
   }
   catch(error){
    console.log(error);
    return rejectWithValue(error)
    
   }
  }
  
)
export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
     const response = await signOut();
      return response.data;
    } 
  
);

export const AuthSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      
      .addCase(signOutAsync.pending, (state, action) => {
        state.status = 'loading';
      
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = null;
      })
      
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.status = 'loading';
      
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.userChecked = true;
      })
       
      .addCase(resetPasswordRequestAsync.pending, (state, action) => {
        state.status = 'loading';
      
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mailSent = true;
      })
      .addCase(resetPasswordRequestAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error=action.payload
      })
     
      .addCase(resetPasswordAsync.pending, (state, action) => {
        state.status = 'loading';
      
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.resetPassword = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error=action.payload
      })
       
    
  },
});
export const { increment } = AuthSlice.actions;
export const selectLoggedInUser=(state)=>state.auth.loggedInUserToken
export const selectError=(state)=>state.auth.error
export const selectUserChecked=(state)=>state.auth.userChecked

export const selectMailSent=(state)=>state.auth.mailSent
export const selectResetPassword=(state)=>state.auth.resetPassword


export default AuthSlice.reducer;
