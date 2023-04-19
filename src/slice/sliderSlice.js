import { getSliders } from "~/services/SliderService"
import { getPost } from "~/services/postService"

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")

export const _getSliders = createAsyncThunk(
  "slider/getSlider",
  async (params, thunkAPI) => {
    const { data, success, message } = await getSliders(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data.sliders, success, message }
  }
)

export const _getPost = createAsyncThunk(
  "post/getPost",
  async (params, thunkAPI) => {
    const { data, success, message } = await getPost(params)
    if (!success) {
      return thunkAPI.rejectWithValue()
    }
    return { list: data.post, success, message }
  }
)

const slider = createSlice({
  name: "slider",
  initialState: {
    sliders: [],
    post: [],
  },

  extraReducers: {
    [_getSliders.fulfilled]: (state, action) => {
      state.sliders = action.payload.list
    },
    [_getSliders.rejected]: (state, action) => {
      state.sliders = []
    },
    [_getPost.fulfilled]: (state, action) => {
      state.post = action.payload.list
    },
    [_getPost.rejected]: (state, action) => {
      state.post = []
    },
  },
})

const { reducer, actions } = slider

export default reducer
