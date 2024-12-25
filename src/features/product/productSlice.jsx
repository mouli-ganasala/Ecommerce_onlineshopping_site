import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  createProduct, fetchAllProducts, fetchBrands, fetchCategories, fetchProductById, fetchProductsByFilters, updateProduct} from './productAPI';

const initialState = {
  products: [],
  status: 'idle',
  totalItems:0,
  brands:[],
  categories:[],
  selectedProduct:null,
  filterProducts:[]
};

export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    return response.data;
  }
);

export const fetchAllProductsByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {//8
    const response = await fetchProductById(id);//8
    return response.data;
  }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter,sort,pagination,search}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination,search);
    return response.data;
  }
);

export const fetchBrandsAsync= createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);


export const fetchCategoriesAsync= createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);

export const createProductAsync= createAsyncThunk(
  'product/createProduct',
  async (product) => {
    const response = await createProduct(product);
    return response.data;
  }
);

export const updateProductAsync= createAsyncThunk(
  'product/updateProduct',
  async (update) => {
    const response = await updateProduct(update);
    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
  clearSelectedProduct:(state)=>{
    state.selectedProduct=null;
  }

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products=action.payload.products;
        state.totalItems=action.payload.totalItems;
        state.products=action.payload.filterProducts;
        
      }).addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands=action.payload
     
      }).addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories=action.payload
     
      })
      .addCase(fetchAllProductsByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct=action.payload
     
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload);
     
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        state.products[index] = action.payload;//new Product
     
      })
  },
});

export const {clearSelectedProduct}=productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectedProductById= (state) => state.product.selectedProduct;


export default productSlice.reducer;