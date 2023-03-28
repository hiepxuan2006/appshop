import createAPIServices from "./httpRequest"

const baseUrl = "https://api-hx-cellphone.onrender.com/order"

const api = createAPIServices({ baseUrl })

export const createOrder = (data) => {
  return api.makeRequest({
    url: "/create-order",
    method: "post",
    data: data,
  })
}
