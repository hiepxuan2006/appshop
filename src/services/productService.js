import createAPIServices from "./httpRequest"

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? `${process.env.REACT_APP_BASE_URL_DEV}/product`
    : `${process.env.REACT_APP_BASE_URL_API}/product`

const api = createAPIServices({ baseUrl })

export const getProducts = (params) => {
  return api.makeRequest({
    url: `/get-products?${params}`,
    method: "get",
  })
}

export const getProductBySlug = (data) => {
  return api.makeRequest({
    url: `/get-product`,
    method: "post",
    data,
  })
}

export const searchProducts = (params) => {
  return api.makeRequest({
    url: `/search-product?${params}`,
    method: "post",
  })
}

export const getProductsByCategory = (params) => {
  return api.makeRequest({
    url: `/get-products-category?${params}`,
    method: "get",
  })
}

export const getProductGroupCategory = (params) => {
  return api.makeRequest({
    url: `/get-product-group`,
    method: "get",
  })
}

export const getProductSpecial = (params) => {
  return api.makeRequest({
    url: `/get-product-special?category=${params}`,
    method: "get",
  })
}
