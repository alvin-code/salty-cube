import { SugarCubeObject } from 'twine-sugarcube'
import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    primaryColor: string
    containerColor: string
  }
}

declare global {
  interface Window {
    SugarCube?: SugarCubeObject
  }
}
