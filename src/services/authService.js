import createAPIServices from "./httpRequest"

const baseUrl = "http://localhost:5005/account"

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
