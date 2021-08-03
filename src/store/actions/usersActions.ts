import { usersAction } from '../slices/usersSlice'

import { AppDispatch } from '../'

import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'

export function saveUser() {
  return async function (dispatch: AppDispatch) {
    const value = await AsyncStorage.getItem('@storage_token')
    if (value !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      }

      api
        .get('users', config)
        .then((response) => {
          return response.data
        })
        .then((data) => {
          dispatch(usersAction.saveUser(data))
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
