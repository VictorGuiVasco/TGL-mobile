import React from 'react'
import Form from '../../components/Form'

import {
  Container,
  GreenBar,
  FooterText,
  TGLContainer,
  TGLTitle,
} from './styles'

const LandingPage: React.FC = () => {
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
