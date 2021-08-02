import { gameAction } from '../slices/gamesSlice'

import { AppDispatch, AppThunk } from '../'

import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'

export function fetchGames(): AppThunk {
  return async function (dispatch: AppDispatch) {
    let token = ''
    const value = await AsyncStorage.getItem('@storage_token')
    if (value !== null) {
      token = value
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    api
      .get('games', config)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        for (let value in data.data) {
          dispatch(gameAction.saveGames(data.data[value]))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
