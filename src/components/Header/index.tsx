import React, { ReactComponentElement } from 'react'
import HeaderLogo from '../HeaderLogo'
import LogoutButton from '../LogoutButton'

import { CartContainer, Container } from './styles'

const Header: React.FC = ({ children }) => {
  return (
    <Container>
      <HeaderLogo />
      <CartContainer>
        {children}
        <LogoutButton />
      </CartContainer>
    </Container>
  )
}

export default Header
