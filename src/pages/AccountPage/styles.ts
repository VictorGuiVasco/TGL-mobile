import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
`

export const FormContainer = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 80px;
`

export const Text = styled.Text`
  font-size: 17px;
  align-self: center;
  margin-top: 10px;
  color: #868686;
`

export const Title = styled.Text`
  color: #707070;
  font-size: 35px;
  font-weight: bold;
  font-style: italic;
`

export const Card = styled.View`
  width: 300px;
  margin-top: 26px;

  border: 1px #dddddd solid;
  border-radius: 15px;
  background-color: #fff;

  shadow-opacity: 0.75;
  shadow-radius: 5px;
  shadow-offset: 0px 0px;
  elevation: 3;
`

export const TextInput = styled.TextInput`
  padding: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #dddddd;
`

export const PasswordButton = styled(RectButton)`
  margin-top: 20px;
  align-self: flex-end;
  margin-right: 25px;
`

export const PasswordButtonText = styled.Text`
  color: #c1c1c1;
  font-size: 14px;
  font-style: italic;
`

export const Button = styled(RectButton)`
  margin-top: 26px;
  margin-bottom: 26px;

  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
`

export const TextButton = styled.Text`
  font-size: 30px;
  font-weight: bold;
  font-style: italic;

  margin-right: 10px;

  color: #707070;
  text-align: center;
`

export const BackTextButton = styled(TextButton)`
  margin-right: 0;
  margin-left: 10px;
`

export const TextSubmitButton = styled(TextButton)`
  color: #b5c401;
`
