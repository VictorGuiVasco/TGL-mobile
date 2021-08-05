import React, { useState } from 'react'
import { Modal } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { saveUser } from '../../store/actions/usersActions'
import { emailValidation } from '../../utils/emailValidation'

import AlertModal from '../../components/AlertModal'

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

  const [alertType, setAlertType] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [alertDescription, setAlertDescription] = useState('')

  const [showAlert, setShowAlert] = useState(false)

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

  async function registerUser() {
    if (email.length === 0 || password.length === 0 || username.length === 0) {
      setStatesToModal('error', 'Preencha todos os campos')
      return
    }

    if (!emailValidation(email)) {
      setStatesToModal('error', 'Digite um email válido')
      return
    }

    try {
      await api.post('users', { username, email, password })
      clearStates()

      setStatesToModal(
        'success',
        'Cadastrado',
        'Usuário cadastrado com sucesso'
      )
    } catch (error) {
      setStatesToModal('error', 'Erro', 'Erro ao cadastrar')
    }
  }

  async function sendEmailToResetPassword() {
    if (email.length === 0) {
      setStatesToModal('error', 'Preencha todos os campos')
      return
    }

    if (!emailValidation(email)) {
      setStatesToModal('error', 'O campo não é um email')
      return
    }

    try {
      await api.post('password', {
        email,
        redirect_url: 'http://localhost:3000',
      })
      clearStates()

      setStatesToModal(
        'success',
        'Email enviado',
        'Cheque seu email para mais informações'
      )
    } catch (error) {
      setStatesToModal('error', 'Email invalido')
    }
  }

  async function saveSession() {
    if (email.length === 0 || password.length === 0) {
      setStatesToModal('error', 'Preencha todos os campos')
      return
    }

    if (!emailValidation(email)) {
      setStatesToModal('error', 'Digite um email válido')
      return
    }

    try {
      const response = await api.post('session', { email, password })
      await AsyncStorage.setItem('@storage_token', response.data.token)

      clearStates()
      dispatch(saveUser())
      nav.navigate('App')
    } catch (error) {
      setStatesToModal(
        'error',
        'Erro ao logar',
        'Cheque se as informações estão certas'
      )
    }
  }

  async function submitAction() {
    setEmail(email.toLowerCase())
    if (type === 'register') {
      registerUser()
    } else if (type === 'forget-password') {
      sendEmailToResetPassword()
    } else if (type === 'auth') {
      saveSession()
    }
  }

  function setStatesToModal(_type = '', _title = '', _description = '') {
    setAlertType(_type)
    setAlertTitle(_title)
    setAlertDescription(_description)
    setShowAlert(true)
  }

  function closeAlert() {
    setAlertType('')
    setAlertTitle('')
    setAlertDescription('')
    setShowAlert(false)
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

      <Modal animationType="fade" transparent={true} visible={showAlert}>
        <AlertModal
          type={alertType}
          title={alertTitle}
          description={alertDescription}
          onClickButton={closeAlert}
        />
      </Modal>
    </Container>
  )
}

export default Form
