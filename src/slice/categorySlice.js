import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCategoriesById } from "~/services/categoryService"

export const _getCategoryById = createAsyncThunk(
  "category/categoryById",
  async (params, thunkAPI) => {
    const { data, success, message } = await getCategoriesById(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data, id: params, success, message }
  }
)

const category = createSlice({
  name: "category",

  initialState: {
    loading: false,

    category: {},
  },

  extraReducers: {
    [_getCategoryById.fulfilled]: (state, action) => {
      state.category[action.payload.id] = action.payload.list
      state.loading = false
    },
    [_getCategoryById.pending]: (state, action) => {
      state.loading = false
    },
    [_getCategoryById.rejected]: (state, action) => {
      state.category[action.payload.id] = []
      state.loading = false
    },
  },
})
const { reducer } = category

export default reducer
