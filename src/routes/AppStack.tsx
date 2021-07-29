import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import SignInPage from '../pages/SignInPage'
import HomePage from '../pages/HomePage'

const { Navigator, Screen } = createStackNavigator()

function AppStack() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerShown: false }}
        >
          <Screen name="SignIn" component={SignInPage} />
          <Screen name="Home" component={HomePage} />
        </Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default AppStack
