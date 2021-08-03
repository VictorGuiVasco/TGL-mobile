import React from 'react'

import {
  Bar,
  Container,
  Numbers,
  Text,
  TextView,
  TypeText,
  View,
} from './styles'

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
  children,
}) => {
  const currency = Number(price)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,')

  return (
    <Container>
      <Bar color={color} />
      <View>
        <Numbers>{numbers}</Numbers>
        <TextView>
          <Text>
            {date} - (R$ {currency})
          </Text>
          {children}
        </TextView>
        <TypeText color={color}>{type}</TypeText>
      </View>
    </Container>
  )
}

export default GameCard
