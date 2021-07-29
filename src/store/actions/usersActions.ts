import { usersAction } from '../slices/usersSlice'

import { AppDispatch } from '../'

import Cookies from 'universal-cookie'
import api from '../../services/api'

export function saveUser() {
  return function (dispatch: AppDispatch) {
    const cookies = new Cookies()

    const config = {
      headers: {
        Authorization: `Bearer ${cookies.get('token')}`,
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
