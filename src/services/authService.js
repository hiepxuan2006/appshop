import createAPIServices from "./httpRequest"

const baseUrl = "https://api-hx-cellphone.onrender.com/account"

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
