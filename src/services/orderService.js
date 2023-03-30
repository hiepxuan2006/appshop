import createAPIServices from "./httpRequest"

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/order`

const api = createAPIServices({ baseUrl })

export const createOrder = (data) => {
  return api.makeRequest({
    url: "/create-order",
    method: "post",
    data: data,
  })
}
