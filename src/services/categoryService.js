import createAPIServices from "./httpRequest"

const baseUrl = "http://localhost:5005/category"

const api = createAPIServices({ baseUrl })

export const getCategories = () => {
  return api.makeRequest({
    url: "/get-category",
    method: "get",
  })
}

export const getCategoriesById = (params) => {
  return api.makeRequest({
    url: `/get-category-id/${params}`,
    method: "get",
  })
}
