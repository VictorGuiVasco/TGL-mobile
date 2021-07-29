import styled from 'styled-components/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`

export const TGLContainer = styled.View`
  margin-top: 70px;
`

export const TGLTitle = styled.Text`
  color: #707070;
  font-size: 44px;
  font-weight: bold;
  font-style: italic;
`

export const GreenBar = styled.View`
  height: 6px;
  background-color: #b5c401;
  border-radius: 6px;
`

export const FooterText = styled.Text`
  color: #707070;
  font-size: 15px;
  margin-bottom: 22px;
`
