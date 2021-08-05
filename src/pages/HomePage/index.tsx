import React, { useEffect, useState } from 'react'
import { Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '../../store'
import { fetchGames } from '../../store/actions/gameActions'

import Header from '../../components/Header'
import GameCard from '../../components/GameCard'
import AlertModal from '../../components/AlertModal'
import GameButton from '../../components/GameButton'

import api from '../../services/api'

import { ButtonContainer, Container, Scroll, Text, Title } from './styles'

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
  type: string
  numbers: string
  price: number
  color: string
  created_at: string
}

const HomePage: React.FC = () => {
  const dispatch = useDispatch()

  const games = useSelector((state: RootState) => state.games)

  const [data, setData] = useState<BetsProps[]>([])
  const [indexGame, setIndexGame] = useState<number[]>([])
  const [selectedGame, setSelectedGame] = useState<GamesProps[]>([])
  const [filtered, setFiltered] = useState<BetsProps[]>([])

  const [alertType, setAlertType] = useState('')
  const [alertTitle, setAlertTitle] = useState('')
  const [alertDescription, setAlertDescription] = useState('')

  const [showAlert, setShowAlert] = useState(false)

  async function getData() {
    try {
      let bets: any[] = []

      const response = await api.get('bets')
      for (let value in response.data.data) {
        bets.push(response.data.data[value])
      }

      setData(bets)
      setFiltered(bets)
    } catch (error) {
      setStatesToModal(
        'error',
        'erro',
        'Ocorreu um erro ao listar suas apostas'
      )
    }
  }

  useEffect(() => {
    getData()
    dispatch(fetchGames())
  }, [])

  useEffect(() => {
    let tempBets: GamesProps[] = []
    let tempFiltered: BetsProps[] = []
    for (let value of indexGame) {
      let tempGame: GamesProps = games[value]
      tempBets.push(tempGame)
    }

    for (let value of tempBets) {
      let temp = data.filter((element) => element.game_id === value.id - 1)
      for (let elem of temp) {
        tempFiltered.push(elem)
      }
    }

    if (tempFiltered.length !== 0) {
      setFiltered(tempFiltered)
    } else {
      setFiltered(data)
    }
    setSelectedGame(tempBets)
  }, [dispatch, indexGame, data])

  function changeIndexBet(index: number, type: string) {
    let num = indexGame.slice()
    if (indexGame.some((elem) => elem === index)) {
      num.splice(indexGame.indexOf(index), 1)
      setIndexGame(num)
      setSelectedGame([])
    } else {
      num.push(index)
      num.sort()
      setIndexGame(num)
    }
  }

  function setStatesToModal(_type = '', _title = '', _description = '') {
    setAlertType(_type)
    setAlertTitle(_title)
    setAlertDescription(_description)
    setShowAlert(true)
  }

  function closeAlert() {
    setAlertType('')
    setAlertTitle('')
    setAlertDescription('')
    setShowAlert(false)
  }

  return (
    <Container>
      <Header />
      <Title>RECENT GAMES</Title>
      <Text>Filters</Text>

      <ButtonContainer>
        {games.length > 0 &&
          selectedGame &&
          games.map((elem, index) => (
            <GameButton
              key={index}
              type={
                selectedGame.find((game) => game?.id === elem.id)
                  ? elem.type + ' *'
                  : elem.type
              }
              borderColor={elem.color}
              fontColor={
                !selectedGame.find((game) => game?.id === elem.id)
                  ? elem.color
                  : '#FFF'
              }
              backgroundColor={
                selectedGame.find((game) => game?.id === elem.id)
                  ? elem.color
                  : '#FFF'
              }
              onPress={() => {
                changeIndexBet(index, elem.type)
              }}
            />
          ))}
      </ButtonContainer>
      <Scroll>
        {filtered.length !== 0 ? (
          filtered.map((elem, index) => (
            <GameCard
              key={index}
              type={games[elem.game_id]?.type}
              date={elem.created_at}
              color={
                !!games[elem.game_id]?.color
                  ? games[elem.game_id]?.color
                  : 'transparent'
              }
              price={elem.price}
              numbers={elem.numbers}
            />
          ))
        ) : (
          <Text>Nenhum game comprado</Text>
        )}
      </Scroll>

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

export default HomePage
