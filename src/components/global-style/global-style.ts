import { createGlobalStyle } from 'styled-components'
import { CONTAINER_ID } from '../../utils'

export const GlobalStyle = createGlobalStyle`
  #${CONTAINER_ID} {
    width: 0;
    height: 0;
    overflow: hidden;
  }`
