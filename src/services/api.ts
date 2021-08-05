import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const api = axios.create({
  baseURL: 'http://192.168.30.104:3333',
})

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('@storage_token')
    if (!!token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

export default api
