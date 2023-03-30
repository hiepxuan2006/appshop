import createAPIServices from "./httpRequest"

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/category`

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
