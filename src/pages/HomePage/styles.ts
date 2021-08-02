import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled.SafeAreaView`
  flex: 1;
  padding-right: 20px;
  padding-left: 20px;
`

export const Scroll = styled.ScrollView``

export const Title = styled.Text`
  margin-top: 26px;
  margin-bottom: 15px;

  font-size: 22px;
  font-weight: bold;
  font-style: italic;

  color: #707070;
`

export const Text = styled.Text`
  font-size: 17px;
  font-style: italic;

  color: #868686;
`

export const ButtonContainer = styled.View`
  flex-direction: row;

  margin-top: 15px;
  margin-bottom: 26px;
`
