import createAPIServices from "./httpRequest"

const baseUrl = "http://localhost:5005/order"

const api = createAPIServices({ baseUrl })

export const createOrder = (data) => {
  return api.makeRequest({
    url: "/create-order",
    method: "post",
    data: data,
  })
}
