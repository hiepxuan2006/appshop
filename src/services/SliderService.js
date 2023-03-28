import createAPIServices from "./httpRequest"

const baseUrl = "https://api-hx-cellphone.onrender.com/slider"

const api = createAPIServices({ baseUrl })

export const getSliders = () => {
  return api.makeRequest({
    url: "/get-Sliders",
    method: "get",
  })
}
