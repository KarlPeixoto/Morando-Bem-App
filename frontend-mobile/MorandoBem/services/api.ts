import axios from "axios"
import { Alert } from "react-native"
import { router } from "expo-router"

// SUBSTITUA PELO SEU IP LOCAL
const BASE_URL = "http://192.168.15.7:8080/api" // COLOQUE SEU IP AQUI

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

api.interceptors.request.use((config) => {
  const token = global.accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = global.refreshToken
        if (!refreshToken) {
          throw new Error("No refresh token")
        }

        // Use o mesmo BASE_URL para o refresh
        const response = await axios.post(`${BASE_URL.replace("/api", "")}/api/auth/refresh`, {
          refreshToken: refreshToken,
        })

        const { accessToken, refreshToken: newRefreshToken } = response.data
        global.accessToken = accessToken
        global.refreshToken = newRefreshToken

        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        return axios(originalRequest)
      } catch (refreshError) {
        global.accessToken = undefined
        global.refreshToken = undefined
        global.userLogin = undefined

        Alert.alert("Sessão Expirada", "Faça login novamente")
        router.replace("/login")
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default api
