import createAPIServices from "./httpRequest"

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/banner`

const api = createAPIServices({ baseUrl })

export const getBannerSlider = (data) => {
  return api.makeRequest({
    url: `/get-banner?${data}`,
    method: "get",
  })
}
