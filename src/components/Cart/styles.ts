import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  flex: 1;

  height: 100%;
  width: 100%;
  position: absolute;
  align-items: flex-end;

  background-color: rgba(255, 255, 255, 0.5);
`

export const CartContainer = styled.View`
  width: 72%;
  height: 100%;

  padding-top: 20px;
  padding-right: 20px;

  justify-content: space-between;
  background-color: #fff;
`

export const CloseContainer = styled.View`
  align-items: flex-end;
`

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;

  padding-left: 20px;
  margin-bottom: 25px;
`

export const Title = styled.Text`
  font-size: 22px;
  font-weight: bold;
  font-style: italic;

  color: #707070;

  margin-left: 10px;
`

export const TextBold = styled(Title)`
  font-size: 15px;
  margin-left: 0;
`

export const Text = styled(TextBold)`
  font-weight: normal;
  margin-left: 5px;
`

export const PriceText = styled(TextBold)`
  margin-left: auto;
`

export const GameText = styled(TextBold)`
  padding-left: 20px;
`

export const SaveButton = styled.TouchableOpacity`
  height: 94px;
  background: #ebebeb;

  flex-direction: row;
  align-items: center;
  justify-content: center;

  border-bottom-right-radius: 13px;
`

export const ButtonText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  font-style: italic;
  margin-right: 5px;

  color: #b5c401;
`

export const View = styled.View``

export const Scroll = styled.ScrollView`
  max-height: 500px;
  margin-bottom: 25px;
`
