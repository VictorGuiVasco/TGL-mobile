import React, { useState } from 'react'
import { Alert } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { saveUser } from '../../store/actions/usersActions'
import { emailValidation } from '../../utils/emailValidation'

import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../../services/api'

import {
  Card,
  Container,
  BackTextButton,
  Button,
  PasswordButton,
  PasswordButtonText,
  TextButton,
  TextInput,
  TextSubmitButton,
  Title,
} from './styles'

const Form: React.FC = () => {
  const dispatch = useDispatch()
  const nav = useNavigation()

  const [type, setType] = useState('auth')
  const [submitText, setSubmitText] = useState('Log In')
  const [title, setTitle] = useState('Authentication')

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function clearStates() {
    setUsername('')
    setEmail('')
    setPassword('')
  }

  function changeFormToRegisterType() {
    setType('register')
    setSubmitText('Register')
    setTitle('Registration')

    clearStates()
  }

  function changeFormToForgetPasswordType() {
    setType('forget-password')
    setSubmitText('Send Link')
    setTitle('Reset password')

    clearStates()
  }

  function changeFormToAuthType() {
    setType('auth')
    setSubmitText('Log In')
    setTitle('Authentication')

    clearStates()
  }

  function registerUser() {
    if (email.length === 0 || password.length === 0 || username.length === 0) {
      Alert.alert('Alert', 'Preencha todos os campos', [{ text: 'OK' }], {
        cancelable: false,
      })
      return
    }

    if (!emailValidation(email)) {
      Alert.alert('Alert', 'Email invalido', [{ text: 'OK' }], {
        cancelable: false,
      })
    }

    api
      .post('users', {
        username,
        email,
        password,
      })
      .then((response) => {
        Alert.alert(
          'Success',
          'Cadastro realizado com sucesso',
          [{ text: 'OK' }],
          {
            cancelable: false,
          }
        )
      })
      .catch((error) => {
        Alert.alert('Error', 'Erro ao cadastrar', [{ text: 'OK' }], {
          cancelable: false,
        })
      })
    clearStates()
  }

  function sendEmail() {
    if (email.length === 0) {
      Alert.alert('Alert', 'Preencha todos os campos', [{ text: 'OK' }], {
        cancelable: false,
      })
      return
    }

    if (!emailValidation(email)) {
      Alert.alert('Alert', 'Email invalido', [{ text: 'OK' }], {
        cancelable: false,
      })
    }

    api
      .post('password', {
        email,
        redirect_url: 'http://localhost:3000',
      })
      .then(() => {
        Alert.alert('Success', 'Email enviado', [{ text: 'OK' }], {
          cancelable: false,
        })
      })
      .catch((error) => {
        Alert.alert('Err', 'Email invalido', [{ text: 'OK' }], {
          cancelable: false,
        })
      })
    clearStates()
  }

  async function saveSession() {
    if (email.length === 0 || password.length === 0) {
      Alert.alert('Alert', 'Preencha todos os campos', [{ text: 'OK' }], {
        cancelable: false,
      })
      return
    }

    if (!emailValidation(email)) {
      Alert.alert('Alert', 'Email invalido', [{ text: 'OK' }], {
        cancelable: false,
      })
    }

    api
      .post('session', { email, password })
      .then((response) => response.data)
      .then((data) => {
        clearStates()
        dispatch(saveUser())
        AsyncStorage.setItem('@storage_token', data.token).then(() => {
          nav.navigate('App')
        })
      })
      .catch((error) => {
        clearStates()
        console.log(error)
        Alert.alert('Error', 'Erro ao logar', [{ text: 'OK' }], {
          cancelable: false,
        })
      })
  }

  async function submitAction() {
    if (type === 'register') {
      registerUser()
    } else if (type === 'forget-password') {
      sendEmail()
    } else if (type === 'auth') {
      saveSession()
    }
  }

  return (
    <Container>
      <Title>{title}</Title>

      <Card>
        {type === 'register' && (
          <TextInput
            value={username}
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
            placeholderTextColor="#9D9D9D"
          />
        )}
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType={'email-address'}
          placeholder="Email"
          placeholderTextColor="#9D9D9D"
        />
        {type !== 'forget-password' && (
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            placeholder="Password"
            placeholderTextColor="#9D9D9D"
          />
        )}

        {type === 'auth' && (
          <PasswordButton onPress={changeFormToForgetPasswordType}>
            <PasswordButtonText>I forget my password</PasswordButtonText>
          </PasswordButton>
        )}

        <Button onPress={submitAction}>
          <TextSubmitButton>{submitText}</TextSubmitButton>
          <AntDesign name="arrowright" size={28} color="#b5c401" />
        </Button>
      </Card>

      {type === 'auth' && (
        <Button onPress={changeFormToRegisterType}>
          <TextButton>Sign Up</TextButton>
          <AntDesign name="arrowright" size={28} color="#707070" />
        </Button>
      )}

      {type === 'register' && (
        <Button onPress={changeFormToAuthType}>
          <AntDesign name="arrowleft" size={28} color="#707070" />
          <BackTextButton>Back</BackTextButton>
        </Button>
      )}

      {type === 'forget-password' && (
        <>
          <Button onPress={changeFormToAuthType}>
            <AntDesign name="arrowleft" size={28} color="#707070" />
            <BackTextButton>Back</BackTextButton>
          </Button>

          <Button onPress={changeFormToRegisterType}>
            <TextButton>Sign Up</TextButton>
            <AntDesign name="arrowright" size={28} color="#707070" />
          </Button>
        </>
      )}
    </Container>
  )
}

export default Form
