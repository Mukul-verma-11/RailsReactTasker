import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000', 
});

apiClient.interceptors.request.use((request) => {

    // try {
    //     axios.interceptors.request.use((request) => {
    //       if (localStorage.getItem("authtoken")) {
    //         request.headers.Authorization = `Bearer ${
    //           JSON.parse(localStorage.getItem("authtoken")).token
    //         }`;
    //       }
    //       console.log(request,'>>>>>>>>>>><<<<<<<<<<<<<<');
    //       return request;
    //     });
    //   } catch (err) {
    //     (err) => console.log(err);
    //   }


  if (localStorage.getItem('authtoken')) {
    request.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('authtoken')).token}`;
  }
  console.log(request);
  return request;
}, (error) => {
  // Handle request error
  return Promise.reject(error);
});

export default apiClient;
