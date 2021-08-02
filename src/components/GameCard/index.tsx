import React from 'react'
import { Platform } from 'react-native'

import { Bar, Container, Numbers, Text, TypeText, View } from './styles'

interface GameCardProps {
  type: string
  numbers: string
  price: number
  color: string
  date: string
}

const GameCard: React.FC<GameCardProps> = ({
  type,
  numbers,
  date,
  price,
  color,
}) => {
  const currency = Number(price)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')

  return (
    <Container>
      <Bar color={color} />
      <View>
        <Numbers>{numbers}</Numbers>
        <Text>
          {date} - (R$ {currency})
        </Text>
        <TypeText color={color}>{type}</TypeText>
      </View>
    </Container>
  )
}

export default GameCard
