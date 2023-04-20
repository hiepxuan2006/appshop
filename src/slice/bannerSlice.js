import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import queryString from "query-string"
import { getBannerSlider } from "~/services/bannerService"

export const _getBannerSlider = createAsyncThunk(
  "banner/bannerSlier",
  async (params, thunkAPI) => {
    const query = queryString.stringify(params, {
      skipNull: true,
      skipEmptyString: true,
    })
    const { data, success, message } = await getBannerSlider(query)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data, success, message }
  }
)

export const _getBannerCategory = createAsyncThunk(
  "banner/bannerCategory",
  async (params, thunkAPI) => {
    const { category } = params
    const query = queryString.stringify(
      { category },
      {
        skipNull: true,
        skipEmptyString: true,
      }
    )
    const { data, success, message } = await getBannerSlider(query)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data, id: category, success, message }
  }
)

export const _getBannerAds = createAsyncThunk(
  "banner/bannerAds",
  async (params, thunkAPI) => {
    const { data, success, message } = await getBannerSlider(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data, success, message }
  }
)

const product = createSlice({
  name: "banner",

  initialState: {
    loading: false,
    bannerSlider: [],
    bannerCategory: {},
    banner: [],
  },

  extraReducers: {
    [_getBannerSlider.fulfilled]: (state, action) => {
      state.bannerSlider = action.payload.list
      state.loading = false
    },
    [_getBannerSlider.pending]: (state, action) => {
      state.loading = false
    },
    [_getBannerSlider.rejected]: (state, action) => {
      state.bannerSlider = []
      state.loading = false
    },
    [_getBannerCategory.fulfilled]: (state, action) => {
      state.bannerCategory[action.payload.id] = action.payload.list
      state.loading = false
    },
    [_getBannerCategory.pending]: (state, action) => {
      state.loading = false
    },
    [_getBannerCategory.rejected]: (state, action) => {
      state.bannerCategory[action.payload.id] = []
      state.loading = false
    },
    [_getBannerAds.fulfilled]: (state, action) => {
      state.banner = action.payload.list
      state.loading = false
    },
    [_getBannerAds.pending]: (state, action) => {
      state.loading = false
    },
    [_getBannerAds.rejected]: (state, action) => {
      state.banner = []
      state.loading = false
    },
  },
})
const { reducer, actions } = product

export default reducer
