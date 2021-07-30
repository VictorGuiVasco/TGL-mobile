import React from 'react'
import { AntDesign } from '@expo/vector-icons'

import { Container } from './styles'

const ButtonNew: React.FC = () => {
  return (
    <Container>
      <AntDesign name="pluscircleo" size={40} color="white" />
    </Container>
  )
}

export default ButtonNew
