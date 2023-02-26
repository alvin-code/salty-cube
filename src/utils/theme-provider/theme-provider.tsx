import React, { useMemo } from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { theme } from 'antd'

import { IAppTheme, IThemeProviderProps } from './types'

const { useToken } = theme

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const { token } = useToken()
  const theme = useMemo<IAppTheme>(() => ({
    primaryColor: token.colorPrimary
  }), [ token ])

  return <StyledComponentsThemeProvider theme={theme}>
    {children}
  </StyledComponentsThemeProvider>
}
