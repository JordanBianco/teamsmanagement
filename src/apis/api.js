import axios from 'axios'
import store from '@/store'
// import router from '@/router'

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
})

api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    if (error.response.status == 401) {
        store.dispatch('auth/logout')
    }
    // else if (error.response.status == 404) {
    //     store.dispatch('auth/logout')
    //     // return Promise.reject(error);
    // }
    return Promise.reject(error)
});

export default api;