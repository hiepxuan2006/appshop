import createAPIServices from "./httpRequest"

const baseUrl = "http://localhost:5005/product"

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
