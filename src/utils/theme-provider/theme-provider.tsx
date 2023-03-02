import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ThemeProvider as StyledComponentsThemeProvider, DefaultTheme } from 'styled-components'
import { theme } from 'antd'

import { useSaltyCube } from '../salty-cube-provider'
import { IThemeProviderProps } from './types'

const { useToken } = theme

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const { token } = useToken()
  const { debug } = useSaltyCube()
  const { t } = useTranslation()
  
  const theme = useMemo<DefaultTheme>(() => {
    const primaryColor = token.colorPrimary
    debug(t('changing-theme', { primaryColor }))

    return {
      primaryColor,
      containerColor: token.colorBgContainer,
      nestedFormItemMargin: token.marginLG
    }
  }, [ token ])

  return <StyledComponentsThemeProvider theme={theme}>
    {children}
  </StyledComponentsThemeProvider>
}
