import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AntDesign } from '@expo/vector-icons'

import Header from '../../components/Header'

import { RootState } from '../../store'
import { saveUser } from '../../store/actions/usersActions'

import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'

import {
  Card,
  Container,
  Button,
  FormContainer,
  Text,
  TextInput,
  TextSubmitButton,
  Title,
} from './styles'

const AccountPage: React.FC = () => {
  const dispatch = useDispatch()
  const users = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(saveUser())
  }, [])

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  async function submitAction() {
    const data = {
      username: !!username ? username : users?.username,
      email: !!email ? email : users?.email,
    }

    const value = await AsyncStorage.getItem('@storage_token')
    if (value !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${value}`,
        },
      }

      api
        .put(`users/${users?.id}`, data, config)
        .then((response) => {
          return response.data
        })
        .then((data) => {
          console.log(`users/${users?.id}`)
          dispatch(saveUser())
          alert('Dados atualizados')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return (
    <Container>
      <Header />
      <Text>Name: {users?.username}</Text>
      <Text>Email: {users?.email}</Text>

      <FormContainer>
        <Title>Change your user</Title>

        <Card>
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
            placeholderTextColor="#9D9D9D"
          />

          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType={'email-address'}
            placeholder="Email"
            placeholderTextColor="#9D9D9D"
          />

          <Button onPress={submitAction}>
            <TextSubmitButton>Save</TextSubmitButton>
            <AntDesign name="arrowright" size={28} color="#b5c401" />
          </Button>
        </Card>
      </FormContainer>
    </Container>
  )
}

export default AccountPage
