import createAPIServices from "./httpRequest"

const baseUrl = "https://api-hx-cellphone.onrender.com/category"

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
