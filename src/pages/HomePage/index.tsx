import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import AsyncStorage from '@react-native-async-storage/async-storage'

// import { Container } from './styles';

const HomePage: React.FC = () => {
  const [token, setToken] = useState('')

  useEffect(() => {
    getData()
  }, [])

  async function getData() {
    try {
      const value = await AsyncStorage.getItem('@storage_token')
      if (value !== null) {
        setToken(value)
      }
    } catch (e) {
      setToken('Nothing here')
    }
  }

  return <SafeAreaView />
}

export default HomePage
