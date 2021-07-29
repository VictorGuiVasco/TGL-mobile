import { betAction } from '../slices/betsSlices'

import { AppDispatch, AppThunk } from '../'

import Cookies from 'universal-cookie'
import api from '../../services/api'

export function fetchBets(): AppThunk {
  return async function (dispatch: AppDispatch) {
    const cookies = new Cookies()
    const config = {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
      },
    }
    api
      .get('games', config)
      .then((response) => {
        return response.data
      })
      .then((data) => {
        for (let value in data.data) {
          dispatch(betAction.saveBets(data.data[value]))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
