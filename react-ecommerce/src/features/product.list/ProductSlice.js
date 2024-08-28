import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {createProduct,UpdateProduct, fetchAllProducts,fetchAllProductsByFilters,fetchBrand,fetchCategory,fetchProductById} from './ProductAPI';

const initialState = {
  products:[],
  brand:[],
  category:[],
  status: 'idle',
  totalItems:0,
  selectedProduct:null
  
};

export const fetchProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
    try {
      const response = await fetchProductById(id);
      return response.data;
    } catch (error) {
      throw error; 
    }
  }
);

export const createProductAsync = createAsyncThunk(
  'product/createProduct',
  async (product) => {
    try {
      const response = await createProduct(product);
      return response.data;
    } catch (error) {
      throw error; 
    }
  }
);
export const UpdateProductAsync = createAsyncThunk(
  'product/UpdateProduct',
  async (update) => {
    try {
      const response = await UpdateProduct(update);
      return response.data;
    } catch (error) {
      throw error; 
    }
  }
);
export const fetchAllProductsByFiltersAsync = createAsyncThunk(
  'product/fetchAllProductsByFilters',
  async ({filter,sort,pagination,admin}) => {
    try {
      const response = await fetchAllProductsByFilters(filter,sort,pagination,admin);
      return response.data;
    } catch (error) {
      throw error; 
    }
  }
);
export const fetchBrandAsync = createAsyncThunk(
  'product/fetchBrand',
  async () => {
    try {
      const response = await fetchBrand();
      return response.data;
    } catch (error) {
      throw error; 
    }
  }
);
export const fetchCategoryAsync = createAsyncThunk(
  'product/fetchCategory',
  async () => {
    try {
      const response = await fetchCategory();
      return response.data;
    } catch (error) {
      throw error; 
    }
  }
);
export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearSelectedReducer:(state)=>{
      state.selectedProduct=null
    }
  },
  extraReducers: (builder) => {
    builder
     
      .addCase(fetchAllProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products 
        state.totalItems = action.payload.totalItems 
      })


      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload); 
      })
      .addCase(UpdateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(UpdateProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index=state.products.findIndex(el=>el.id===action.payload.id)
        state.products[index]=action.payload
      })
      
      .addCase(fetchBrandAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brand = action.payload; 
      })
      
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.category = action.payload; 
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload; 
      })
      
  },
});
export const{clearSelectedProduct}=ProductSlice.actions
export const selectAllProducts = (state) => state.product.products;
export const selectBrand = (state) => state.product.brand;
export const selectCategory = (state) => state.product.category;
export const selecttotalItems = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectedProduct;
export const selectProductStatus = (state) => state.product.status;

 export default ProductSlice.reducer;