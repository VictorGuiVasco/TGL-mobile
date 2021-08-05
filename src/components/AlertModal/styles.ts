import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;

  background-color: rgba(0, 0, 0, 0.5);
`

export const ModalView = styled.View`
  width: 270px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;

  align-items: center;
  justify-content: space-evenly;

  border-radius: 6px;
  background: #fff;
`

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;

  margin-top: 20px;
  text-align: center;
`

export const Description = styled.Text`
  margin-top: 10px;
  text-align: center;
`

export const Button = styled.TouchableOpacity`
  height: 40px;
  width: 100px;

  margin-top: 20px;

  align-items: center;
  justify-content: space-evenly;

  background: #7676a7;
  border-radius: 6px;
`

export const ButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
`
