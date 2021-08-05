import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'

import { BorderlessButton } from 'react-native-gesture-handler'

import { Alert, Modal } from 'react-native'
import { useSelector } from 'react-redux'
import { FlatGrid } from 'react-native-super-grid'

import { RootState } from '../../store'

import Cart from '../../components/Cart'
import Header from '../../components/Header'
import AlertModal from '../../components/AlertModal'
import GameButton from '../../components/GameButton'

import api from '../../services/api'

import { Ionicons } from '@expo/vector-icons'

import {
  Bar,
  Button,
  ButtonContainer,
  Container,
  CartButton,
  NumberButton,
  RulesText,
  RulesTitle,
  Scroll,
  SelectedNumbersButton,
  Text,
  TextButton,
  TextButtonCart,
  TextNumber,
  TextSelectedNumbers,
  Title,
} from './styles'

interface BetsProps {
  game_id: number
  numbers: string
  price: number
  date?: string
}

const NewBetPage: React.FC = () => {
  const nav = useNavigation()
  const games = useSelector((state: RootState) => state.games)

  const [indexGame, setIndexGame] = useState(0)
  const [numberSelected, setNumberSelected] = useState<number[]>([])
  const [cartData, setCartData] = useState<BetsProps[]>([])
  const [actualPrice, setActualPrice] = useState(0)
  const [showCart, setShowCart] = useState(false)

  const [alertType, setAlertType] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [alertDescription, setAlertDescription] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  const selectedGame = games[indexGame]

  function getRandomIntInclusive(max: number, arr: number[]) {
    var num = Math.ceil(Math.random() * max)
    while (arr.indexOf(num) >= 0) {
      num = Math.ceil(Math.random() * max)
    }
    return num
  }

  function changeIndexBet(index: number) {
    setIndexGame(index)
    setNumberSelected([])
  }

  function addNumber(num: number) {
    if (numberSelected.some((elem) => elem === num)) {
      let temp = numberSelected.slice()
      temp.splice(numberSelected.indexOf(num), 1)
      setNumberSelected(temp)
    } else if (numberSelected.length === selectedGame.max_number) {
      setStatesToModal('', 'Cartela cheia')
    } else {
      setNumberSelected([...numberSelected, num])
    }
  }

  function completeGame() {
    let tempNumbers = numberSelected.slice()
    var numOfEmptySpaces = selectedGame.max_number - tempNumbers.length
    if (numOfEmptySpaces === 0) {
      tempNumbers = []
      numOfEmptySpaces = selectedGame.max_number
    }
    for (var i = 0; i < numOfEmptySpaces; i++) {
      tempNumbers.push(getRandomIntInclusive(selectedGame?.range, tempNumbers))
    }
    tempNumbers.sort((num1, num2) => {
      if (num1 > num2) return 1
      if (num1 < num2) return -1
      return 0
    })
    setNumberSelected(tempNumbers)
  }

  function clearGame() {
    setNumberSelected([])
  }

  function addToCart() {
    if (numberSelected.length !== selectedGame.max_number) {
      let tempNumbers = numberSelected.slice()
      let numOfEmptySpaces = selectedGame.max_number - tempNumbers.length
      let wordLeft = numOfEmptySpaces === 1 ? 'Falta' : 'Faltam'
      let wordNumber = numOfEmptySpaces === 1 ? 'número' : 'números'

      setStatesToModal(
        '',
        'Preencha a cartela',
        `${wordLeft} ${numOfEmptySpaces} ${wordNumber}`
      )
      return
    }

    numberSelected.sort((num1, num2) => {
      if (num1 > num2) return 1
      if (num1 < num2) return -1
      return 0
    })

    let temporaryData = {
      game_id: indexGame,
      numbers: numberSelected.join(', '),
      price: selectedGame.price,
    }
    setNumberSelected([])
    setActualPrice(actualPrice + selectedGame.price)
    setCartData([...cartData, temporaryData])
  }

  function deleteGame(index: number, type: string) {
    let data = cartData.slice()
    data.splice(index, 1)

    let tempData = games.find((elem) => elem.type === type)

    setActualPrice(actualPrice - (tempData?.price ? tempData?.price : 0))
    setCartData(data)
  }

  async function saveBet() {
    if (actualPrice === 0) {
      setStatesToModal('error', 'Preencha o carrinho')
    } else if (actualPrice < 30) {
      setStatesToModal(
        'error',
        'Preço insuficiente',
        'Compre no minimo R$ 30,00'
      )
    } else {
      try {
        //await api.post('bets', cartData)
        setCartData([])
        setActualPrice(0)
        setStatesToModal('success', 'Parabéns pela compra')
      } catch (error) {
        setStatesToModal('error', 'Erro ao comprar')
      }
    }
  }

  function setStatesToModal(_type = '', _title = '', _description = '') {
    setAlertType(_type)
    setAlertTitle(_title)
    setAlertDescription(_description)
    setShowAlert(true)
  }

  function closeAlert() {
    if (alertType === 'success') {
      setAlertType('')
      setAlertTitle('')
      setAlertDescription('')
      setShowAlert(false)
      setShowCart(false)
      nav.navigate('Home')
      return
    }
    setAlertType('')
    setAlertTitle('')
    setAlertDescription('')
    setShowAlert(false)
  }

  let range = []
  for (let i = 1; i <= selectedGame?.range; i++) {
    range.push(i)
  }

  return (
    <Container>
      <Header>
        {numberSelected.length !== 0 || cartData.length !== 0 ? (
          <BorderlessButton onPress={() => setShowCart(!showCart)}>
            <Ionicons name="ios-cart-outline" size={28} color="#B5C401" />
          </BorderlessButton>
        ) : null}
      </Header>
      <Title>New bet for {selectedGame?.type}</Title>
      <Text>Choose a game</Text>

      <ButtonContainer>
        {games.length > 0 &&
          selectedGame &&
          games.map((elem, index) => (
            <GameButton
              key={index}
              type={elem.type}
              borderColor={elem.color}
              fontColor={
                !(elem.id === selectedGame?.id) ? games[index]?.color : '#FFF'
              }
              backgroundColor={
                elem.id === selectedGame?.id ? games[index]?.color : '#FFF'
              }
              onPress={() => {
                changeIndexBet(index)
              }}
            />
          ))}
      </ButtonContainer>

      {numberSelected.length === 0 && (
        <>
          <RulesTitle>Fill your Bet</RulesTitle>
          <RulesText>{selectedGame?.description}</RulesText>
        </>
      )}

      {numberSelected.length !== 0 && (
        <>
          <Scroll
            height={selectedGame?.id === 0 ? '' : '75px'}
            data={numberSelected}
            horizontal={true}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <SelectedNumbersButton key={item} color={selectedGame?.color}>
                <TextSelectedNumbers>{item}*</TextSelectedNumbers>
              </SelectedNumbersButton>
            )}
          />

          <ButtonContainer>
            <Button onPress={completeGame}>
              <TextButton>Complete game</TextButton>
            </Button>
            <Button onPress={clearGame}>
              <TextButton>Clear game</TextButton>
            </Button>
            <CartButton onPress={addToCart}>
              <Ionicons name="ios-cart-outline" size={15} color="white" />
              <TextButtonCart>Add to cart</TextButtonCart>
            </CartButton>
          </ButtonContainer>
        </>
      )}

      <FlatGrid
        data={range}
        itemDimension={59}
        style={{ flex: 0, paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <NumberButton
            onPress={() => addNumber(item)}
            color={
              numberSelected.some((num) => num === item)
                ? selectedGame?.color
                : '#ADC0C4'
            }
          >
            <TextNumber>{item}</TextNumber>
          </NumberButton>
        )}
      />

      <Modal animationType="fade" transparent={true} visible={showCart}>
        <Cart
          deleteGame={deleteGame}
          games={games}
          cartData={cartData}
          actualPrice={actualPrice}
          setShow={setShowCart}
          saveBet={saveBet}
        />
      </Modal>

      <Modal animationType="fade" transparent={true} visible={showAlert}>
        <AlertModal
          type={alertType}
          title={alertTitle}
          description={alertDescription}
          onClickButton={closeAlert}
        />
      </Modal>
    </Container>
  )
}

export default NewBetPage
