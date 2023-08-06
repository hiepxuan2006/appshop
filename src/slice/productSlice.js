import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCategories } from "~/services/categoryService"
import {
  getProductGroupCategory,
  getProductSpecial,
} from "~/services/productService"

export const _getProductGroupCategory = createAsyncThunk(
  "product/getProductCategory",
  async (params, thunkAPI) => {
    const { data, success, message } = await getProductGroupCategory(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data, success, message }
  }
)

export const _getCategory = createAsyncThunk(
  "product/getCategory",
  async (params, thunkAPI) => {
    const { data, success, message } = await getCategories(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data, success, message }
  }
)

export const _getProductSpecial = createAsyncThunk(
  "product/getProductSpecial",
  async (params, thunkAPI) => {
    const { data, success, message } = await getProductSpecial(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data, categoryId: params, success, message }
  }
)
const product = createSlice({
  name: "product",

  initialState: {
    loading: false,
    productsGroupCategory: [],
    categories: [],
    productSpecial: {},
  },

  extraReducers: {
    [_getProductGroupCategory.fulfilled]: (state, action) => {
      state.productsGroupCategory = action.payload.list
      state.loading = false
    },
    [_getProductGroupCategory.pending]: (state, action) => {
      state.loading = false
    },
    [_getProductGroupCategory.rejected]: (state, action) => {
      state.productsGroupCategory = []
      state.loading = false
    },
    [_getCategory.fulfilled]: (state, action) => {
      state.categories = action.payload.list
      state.loading = false
    },
    [_getCategory.pending]: (state, action) => {
      state.loading = false
    },
    [_getCategory.rejected]: (state, action) => {
      state.categories = []
      state.loading = false
    },
    [_getProductSpecial.fulfilled]: (state, action) => {
      state.productSpecial[action.payload.categoryId] = action.payload.list
      state.loading = false
    },
    [_getProductSpecial.pending]: (state, action) => {
      state.loading = false
    },
    [_getProductSpecial.rejected]: (state, action) => {
      state.productSpecial = { ...state.productSpecial }
      state.loading = false
    },
  },
})
const { reducer } = product

export default reducer
