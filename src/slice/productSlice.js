import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCategories } from "~/services/categoryService"
import { getProductGroupCategory } from "~/services/productService"

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

const product = createSlice({
  name: "product",

  initialState: {
    loading: false,
    productsGroupCategory: [],
    categories: [],
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
  },
})
const { reducer, actions } = product

export default reducer
