import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HeaderLogo from '../components/HeaderLogo'
import LogoutButton from '../components/LogoutButton'

import AppTabs from './AppTabs'
import LandingPage from '../pages/LandingPage'

import AsyncStorage from '@react-native-async-storage/async-storage'

const { Navigator, Screen } = createStackNavigator()

function AppStack() {
  const [token, setToken] = useState('')

  useEffect(() => {
    getData()
  }, [token])

  async function getData() {
    try {
      const value = await AsyncStorage.getItem('@storage_token')
      if (value !== null) {
        setToken(value)
      }
    } catch (e) {
      setToken('')
    }
  }

  let routeName = !!token ? 'App' : 'Landing'

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName={routeName}
          screenOptions={{ headerShown: false }}
        >
          <Screen name="Landing" component={LandingPage} />
          <Screen
            name="App"
            component={AppTabs}
            options={{
              headerShown: true,
              headerStyle: {
                height: 110,
              },
              headerTitle: () => <HeaderLogo />,
              headerRight: () => <LogoutButton />,
            }}
          />
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppStack
