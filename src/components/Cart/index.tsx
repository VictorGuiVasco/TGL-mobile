import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'

import GameCard from '../GameCard'

import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons'

import {
  ButtonText,
  CartContainer,
  CloseContainer,
  Container,
  GameText,
  PriceText,
  SaveButton,
  Scroll,
  View,
  Text,
  TextBold,
  Title,
  TitleContainer,
} from './styles'

interface GamesProps {
  id: number
  type: string
  description: string
  range: number
  price: number
  max_number: number
  color: string
  min_cart_value: number
}

interface BetsProps {
  game_id: number
  numbers: string
  price: number
  date?: string
}

interface CartProps {
  games: GamesProps[]
  cartData: BetsProps[]
  actualPrice: number
  setShow: (value: boolean) => void
  deleteGame: (index: number, type: string) => void
  saveBet: () => void
}

const Cart: React.FC<CartProps> = ({
  games,
  cartData,
  actualPrice,
  setShow,
  deleteGame,
  saveBet,
}) => {
  const [localePrice, setLocalePrice] = useState('')

  useEffect(() => {
    const price = Number(actualPrice)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,')
    setLocalePrice(price)
  }, [actualPrice])

  const date = new Date()

  return (
    <Container>
      <CartContainer>
        <View>
          <CloseContainer>
            <TouchableOpacity onPress={() => setShow(false)}>
              <FontAwesome name="close" size={28} color="#B5C401" />
            </TouchableOpacity>
          </CloseContainer>

          <TitleContainer>
            <Ionicons name="ios-cart-outline" size={28} color="#B5C401" />
            <Title>CART</Title>
          </TitleContainer>

          <Scroll>
            {cartData.length !== 0 ? (
              cartData.map((elem, index) => (
                <GameCard
                  key={index}
                  type={games[elem.game_id]?.type}
                  date="03/08/2021"
                  color={
                    !!games[elem.game_id]?.color
                      ? games[elem.game_id]?.color
                      : 'transparent'
                  }
                  price={elem.price}
                  numbers={elem.numbers}
                >
                  <TouchableOpacity
                    onPress={() => deleteGame(index, games[elem.game_id]?.type)}
                  >
                    <FontAwesome name="trash-o" size={18} color="#707070" />
                  </TouchableOpacity>
                </GameCard>
              ))
            ) : (
              <GameText>Nenhum game comprado</GameText>
            )}
          </Scroll>

          <TitleContainer>
            <TextBold>CART</TextBold>
            <Text>TOTAL</Text>
            <PriceText>R$ {localePrice}</PriceText>
          </TitleContainer>
        </View>

        <SaveButton onPress={() => saveBet()}>
          <ButtonText>Save</ButtonText>
          <AntDesign name="arrowright" size={26} color="#B5C401" />
        </SaveButton>
      </CartContainer>
    </Container>
  )
}

export default Cart
