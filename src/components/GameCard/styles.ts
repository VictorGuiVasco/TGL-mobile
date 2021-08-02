import styled from 'styled-components/native'

interface StyleProps {
  color: string
}

export const Container = styled.View`
  height: 80px;
  margin-bottom: 25px;

  flex-direction: row;
`

export const Bar = styled.View<StyleProps>`
  height: 80px;
  width: 6px;
  margin-right: 15px;

  border-radius: 100px;
  background-color: ${(props) => props.color};
`

export const View = styled.View`
  justify-content: space-evenly;
`

export const Numbers = styled.Text`
  font-size: 12px;
  font-weight: bold;
  font-style: italic;

  color: #868686;
`

export const Text = styled.Text`
  font-size: 12px;
  color: #868686;
`

export const TypeText = styled.Text<StyleProps>`
  font-size: 16px;
  font-weight: bold;
  font-style: italic;

  color: ${(props) => props.color};
`
