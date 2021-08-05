import React, { useEffect } from 'react'
import Form from '../../components/Form'

import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  Container,
  GreenBar,
  FooterText,
  TGLContainer,
  TGLTitle,
} from './styles'

const LandingPage: React.FC = () => {
  async function setTokenToNull() {
    await AsyncStorage.setItem('@storage_token', '')
  }

  useEffect(() => {}, [])

  return (
    <Container>
      <TGLContainer>
        <TGLTitle>TGL</TGLTitle>
        <GreenBar />
      </TGLContainer>

      <Form />

      <FooterText>Copyright 2021 | Luby Software</FooterText>
    </Container>
  )
}

export default LandingPage
