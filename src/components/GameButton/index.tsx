import React, { Attributes } from 'react'
import { TouchableOpacityProps } from 'react-native'
import { Button, Text } from './styles'

interface ButtonProps {
  type: string
  fontColor: string
  borderColor: string
  backgroundColor: string
  onPress?: () => void
}

const GameButton: React.FC<ButtonProps> = ({
  type,
  fontColor,
  borderColor,
  backgroundColor,
  onPress,
}) => {
  return (
    <Button
      onPress={onPress}
      borderColor={borderColor}
      backgroundColor={backgroundColor}
    >
      <Text fontColor={fontColor}>{type}</Text>
    </Button>
  )
}

export default GameButton
