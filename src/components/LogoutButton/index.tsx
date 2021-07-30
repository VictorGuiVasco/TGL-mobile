import React from 'react'
import { RectButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'

const LogoutButton: React.FC = () => {
  const nav = useNavigation()

  async function logoutHandler() {
    await AsyncStorage.setItem('@storage_token', '').then(() => {
      nav.navigate('Landing')
    })
  }

  return (
    <RectButton style={{ marginRight: 20 }} onPress={logoutHandler}>
      <Feather name="log-out" size={30} color="#C1C1C1" />
    </RectButton>
  )
}

export default LogoutButton
