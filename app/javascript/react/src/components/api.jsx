import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

apiClient.interceptors.request.use(
  (request) => {
    if (localStorage.getItem("authtoken")) {
      request.headers.Authorization = `Bearer ${
        JSON.parse(localStorage.getItem("authtoken")).token
      }`;
    }
    console.log(request);
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
