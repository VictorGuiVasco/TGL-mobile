import React from 'react'
import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { AntDesign, Ionicons } from '@expo/vector-icons'

import HomePage from '../pages/HomePage'
import NewBetPage from '../pages/NewBetPage'
import AccountPage from '../pages/AccountPage'

import ButtonNew from '../components/ButtonNew'

import { GreenBar, IconContainer } from './styles'

const { Navigator, Screen } = createBottomTabNavigator()

function AppTabs() {
  return (
    <Navigator
      tabBarOptions={{
        style: {
          elevation: 0,
          height: 68,
          borderTopWidth: 0,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
        },
        iconStyle: {
          alignSelf: 'center',
          width: 24,
          height: 24,
        },
        labelStyle: {
          fontSize: 14,
          marginBottom: 10,
          fontWeight: 'bold',
          fontStyle: 'italic',
        },
        inactiveTintColor: '#C1C1C1',
        activeTintColor: '#707070',
      }}
    >
      <Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <IconContainer>
                {focused && <GreenBar />}
                <AntDesign
                  name="home"
                  size={size}
                  color={focused ? '#B5C401' : color}
                />
              </IconContainer>
            )
          },
        }}
      />
      <Screen
        name="NewBet"
        component={NewBetPage}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => <ButtonNew />,
        }}
      />
      <Screen
        name="Account"
        component={AccountPage}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            return (
              <IconContainer>
                {focused && <GreenBar />}
                <Ionicons
                  name="ios-person-outline"
                  size={size}
                  color={focused ? '#B5C401' : color}
                />
              </IconContainer>
            )
          },
        }}
      />
    </Navigator>
  )
}

export default AppTabs
