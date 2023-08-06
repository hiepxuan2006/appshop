import createAPIServices from "./httpRequest"

const baseUrl = "production"
  ? `${process.env.REACT_APP_BASE_URL_DEV}/post`
  : `${process.env.REACT_APP_BASE_URL_API}/post`

const api = createAPIServices({ baseUrl })

export const getPost = (params) => {
  return api.makeRequest({
    url: `/get-news-paper`,
    method: "get",
  })
}

export const getAllTopic = (params) => {
  return api.makeRequest({
    url: `/get-all-topic`,
    method: "get",
  })
}

export const getPostById = (params) => {
  return api.makeRequest({
    url: `/get-news-paper/${params}`,
    method: "get",
  })
}
export const getPostGroup = (params) => {
  return api.makeRequest({
    url: `get-news-paper/group-topic`,
    method: "get",
  })
}
