import axios from 'axios'
import { getToken } from "../utils/token";
import { config } from '../settings'

const axiosApiInstance = axios.create({ baseURL: config.API_URL })

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = token
    }
    return config
  },
)

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
  response => response,
  async error => {
    console.log('axios.interceptors.response', error)
    return Promise.reject(error)
  }
)

export default axiosApiInstance;
