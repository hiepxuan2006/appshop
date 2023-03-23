import createAPIServices from "./httpRequest"

const baseUrl = "http://localhost:5005/slider"

const api = createAPIServices({ baseUrl })

export const getSliders = () => {
  return api.makeRequest({
    url: "/get-Sliders",
    method: "get",
  })
}
