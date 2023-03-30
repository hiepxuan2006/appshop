import createAPIServices from "./httpRequest"

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/slider`

const api = createAPIServices({ baseUrl })

export const getSliders = () => {
  return api.makeRequest({
    url: "/get-Sliders",
    method: "get",
  })
}
