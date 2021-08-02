import { RectButton } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

interface StylesProps {
  fontColor?: string
  borderColor?: string
  backgroundColor?: string
}

export const Button = styled.TouchableOpacity<StylesProps>`
  height: 30px;
  width: 100px;

  margin-right: 10px;

  justify-content: center;
  align-items: center;

  border-width: 2px;
  border-radius: 100px;
  border-color: ${(props) => props.borderColor};
  background-color: ${(props) => props.backgroundColor};
`

export const Text = styled.Text<StylesProps>`
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
  color: ${(props) => props.fontColor};
`
