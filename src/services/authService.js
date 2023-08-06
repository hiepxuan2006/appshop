import createAPIServices from "./httpRequest"

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? `${process.env.REACT_APP_BASE_URL_DEV}/account`
    : `${process.env.REACT_APP_BASE_URL_API}/account`

const api = createAPIServices({ baseUrl })

export const authGoogle = (data) => {
  return api.makeRequest({
    url: "/auth/google",
    method: "post",
    data: data,
  })
}

export const secretAccount = () => {
  return api.makeAuthRequest({
    url: "/secret",
    method: "get",
  })
}

export const loginLocal = (data) => {
  return api.makeRequest({
    url: "/login",
    method: "post",
    data,
  })
}
