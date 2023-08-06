import { configureStore } from "@reduxjs/toolkit"

import bannerSlice from "~/slice/bannerSlice"
import categorySlice from "~/slice/categorySlice"
import productReducer from "~/slice/productSlice"
import sliderReducer from "~/slice/sliderSlice"

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
