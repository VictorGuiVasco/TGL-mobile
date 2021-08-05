import React, { useState } from 'react'

import { AntDesign, MaterialIcons } from '@expo/vector-icons'

import {
  Button,
  ButtonText,
  Container,
  Description,
  Title,
  ModalView,
} from './styles'

interface AlertProps {
  type?: string
  title: string
  description?: string
  confirmButton?: boolean
  onClickButton?: () => void
}

const AlertModal: React.FC<AlertProps> = ({
  type,
  title,
  description,
  confirmButton = true,
  onClickButton = () => {},
}) => {
  return (
    <Container>
      <ModalView>
        {type === 'error' && (
          <MaterialIcons
            style={{ marginTop: 20 }}
            name="error"
            size={60}
            color="#ed4337"
          />
        )}
        {type === 'success' && (
          <AntDesign
            style={{ marginTop: 20 }}
            name="checkcircleo"
            size={60}
            color="#00AB66"
          />
        )}

        <Title>{title}</Title>
        {!!description && <Description>{description}</Description>}
        {confirmButton && (
          <Button
            onPress={() => {
              onClickButton()
            }}
          >
            <ButtonText>Confirm</ButtonText>
          </Button>
        )}
      </ModalView>
    </Container>
  )
}

export default AlertModal
