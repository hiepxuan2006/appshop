import createAPIServices from "./httpRequest"

const baseUrl = "https://api-hx-cellphone.onrender.com/product"

const api = createAPIServices({ baseUrl })

export const getProducts = (params) => {
  return api.makeRequest({
    url: `/get-products?${params}`,
    method: "get",
  })
}

export const getProduct = (params) => {
  return api.makeRequest({
    url: `/get-product?${params}`,
    method: "get",
  })
}

export const searchProducts = (params) => {
  return api.makeRequest({
    url: `/search-product?${params}`,
    method: "get",
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
