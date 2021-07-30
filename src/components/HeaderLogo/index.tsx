import React from 'react'
import { View } from 'react-native'

import { GreenBar, TGLContainer, TGLTitle } from './styles'

const HeaderLogo: React.FC = () => {
  return (
    <TGLContainer>
      <TGLTitle>TGL</TGLTitle>
      <GreenBar />
    </TGLContainer>
  )
}

export default HeaderLogo
