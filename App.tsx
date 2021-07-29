import { StatusBar } from 'expo-status-bar'
import React from 'react'

import { Provider } from 'react-redux'
import store from './src/store'

import AppStack from './src/routes/AppStack'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <AppStack />
    </Provider>
  )
}
