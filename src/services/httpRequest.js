import axios from "axios";
import queryString from "query-string";

const httpRequest = axios.create({
  // baseURL: 'http://localhost:8080/api/',
  baseURL: "https://hx-farm.herokuapp.com/api/",

  // headers: {
  //    'content-type': 'application.json',
  // },
  paramsSerializer: (params) => queryString.stringify(params),
});

export const get = async (path, options = {}) => {
  let response = await httpRequest.get(path, options);
  if (response.status) {
    return response.data;
  }
};
export const post = async (path, data, options = {}) => {
  let response = await httpRequest.post(path, data, options);
  if (response.status) {
    return response.data;
  }
};
export const setAuthToken = (token) => {
  if (token) {
    httpRequest.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete httpRequest.defaults.headers.common["Authorization"];
  }
};
httpRequest.interceptors.request.use(async (config) => {
  return config;
});
httpRequest.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);
export default httpRequest;
