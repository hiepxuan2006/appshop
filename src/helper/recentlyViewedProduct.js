import { getLocalData, setLocalData } from "~/services/StoreageServices"

export const setRecentlyViewedProducts = (product) => {
  let recentlyViewedProducts = getLocalData("recentlyViewedProducts")
  if (!recentlyViewedProducts) {
    recentlyViewedProducts = [product]
  } else {
    recentlyViewedProducts = recentlyViewedProducts.filter(
      (item) => item._id !== product._id
    )
    recentlyViewedProducts.unshift(product)
  }

  setLocalData("recentlyViewedProducts", recentlyViewedProducts.slice(0, 7))
  return recentlyViewedProducts
}
