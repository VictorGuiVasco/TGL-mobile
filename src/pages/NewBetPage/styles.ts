import styled from 'styled-components/native'
import { FlatList, RectButton } from 'react-native-gesture-handler'

interface StyleProps {
  height?: string
  color?: string
}

export const Container = styled.SafeAreaView`
  flex: 1;
  z-index: 1;
  position: relative;
`

export const Scroll = styled(FlatList)<StyleProps>`
  padding-left: 20px;
  padding-right: 20px;
  height: ${(props) => (!!props.height ? props.height : 0)};
`

export const Title = styled.Text`
  margin-top: 26px;
  margin-bottom: 15px;
  padding-left: 20px;

  font-size: 22px;
  font-weight: bold;
  font-style: italic;

  color: #707070;
`

export const Text = styled.Text`
  font-size: 17px;
  font-style: italic;
  padding-left: 20px;

  color: #868686;
`

export const ButtonContainer = styled.View`
  flex-direction: row;

  margin-top: 15px;
  margin-bottom: 15px;
  padding-left: 20px;
  background: transparent;
`

export const RulesTitle = styled(Text)`
  font-weight: bold;
  padding-left: 20px;
`

export const RulesText = styled(Text)`
  font-size: 14px;
  padding-left: 20px;
`

export const Bar = styled.View`
  height: 6px;
  width: 36px;

  margin-top: 5px;
  margin-bottom: 15px;
  align-self: center;

  background-color: #c1c1c1;
  border-radius: 6px;
`

export const NumberButton = styled(RectButton)<StyleProps>`
  width: 59px;
  height: 59px;

  justify-content: center;
  align-items: center;

  border-radius: 100px;
  background-color: ${(props) => props.color};
`

export const TextNumber = styled.Text`
  font-size: 18px;
  color: #fff;
`

export const SelectedNumbersButton = styled.View<StyleProps>`
  width: 40px;
  height: 40px;

  margin-right: 10px;

  justify-content: center;
  align-items: center;

  border-radius: 100px;
  background-color: ${(props) => props.color};
`

export const TextSelectedNumbers = styled.Text`
  font-size: 13px;
  color: #fff;
`

export const Button = styled.TouchableOpacity`
  height: 32px;
  padding: 5px;

  margin-right: 8px;
  justify-content: center;
  align-items: center;

  border-width: 1.5px;
  border-radius: 4px;
  border-color: #b5c401;
`

export const TextButton = styled.Text`
  font-size: 13px;
  color: #b5c401;
`

export const CartButton = styled(Button)`
  flex-direction: row;
  background-color: #b5c401;
`

export const TextButtonCart = styled(TextButton)`
  margin-left: 5px;
  color: #fff;
`
