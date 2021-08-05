import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import { AntDesign } from '@expo/vector-icons'

import Header from '../../components/Header'
import AlertModal from '../../components/AlertModal'

import { RootState } from '../../store'
import { saveUser } from '../../store/actions/usersActions'
import { emailValidation } from '../../utils/emailValidation'

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

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    dispatch(saveUser())
  }, [])

  async function submitAction() {
    if (email.length === 0 && username.length === 0) {
      setStatesToModal('error', 'Preencha os campos')
      return
    }

    setEmail(email.toLowerCase())
    const data = {
      username: !!username ? username : users?.username,
      email: !!email ? email : users?.email,
    }

    if (!!email && !emailValidation(email)) {
      setStatesToModal('error', 'O campo não é um email')
      return
    }

    try {
      await api.put(`users/${users?.id}`, data)
      dispatch(saveUser())

      setStatesToModal('success', 'Success', 'Dados atualizados')
    } catch (error) {
      setStatesToModal('error', 'Erro', 'Ocorreu um erro ao salvar')
    }
  }

  function setStatesToModal(_type = '', _title = '', _description = '') {
    setType(_type)
    setTitle(_title)
    setDescription(_description)
    setShowAlert(true)
  }

  function closeAlert() {
    setType('')
    setTitle('')
    setDescription('')
    setShowAlert(false)
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

      <Modal animationType="fade" transparent={true} visible={showAlert}>
        <AlertModal
          type={type}
          title={title}
          description={description}
          onClickButton={closeAlert}
        />
      </Modal>
    </Container>
  )
}

export default AccountPage
