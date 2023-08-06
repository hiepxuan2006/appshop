import createAPIServices from "./httpRequest"

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? `${process.env.REACT_APP_BASE_URL_DEV}/category`
    : `${process.env.REACT_APP_BASE_URL_API}/category`

const api = createAPIServices({ baseUrl })

export const getCategories = () => {
  return api.makeRequest({
    url: "/get-categories",
    method: "get",
  })
}

export const getCategoriesById = (params) => {
  return api.makeRequest({
    url: `/get-category-children/${params}`,
    method: "get",
  })
}
