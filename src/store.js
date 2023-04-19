import { configureStore, applyMiddleware, compose } from "@reduxjs/toolkit"

import productReducer from "~/slice/productSlice"
import sliderReducer from "~/slice/sliderSlice"
import bannerSlice from "~/slice/bannerSlice"
import categorySlice from "~/slice/categorySlice"

const rootReducer = {
  product: productReducer,
  slider: sliderReducer,
  banner: bannerSlice,
  category: categorySlice,
}
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
})

export default store
