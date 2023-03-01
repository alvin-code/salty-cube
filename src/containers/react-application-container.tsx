import React from 'react'

import { SaltyCard, SaltyCardPosition } from '../components/salty-card'
import { SaltyCubeMenuContainer } from './salty-cube-menu-container'
import { SaltyCubeProvider } from '../utils/salty-cube-provider'
import { ConfigurationProvider, AppTheme } from '../utils/configuration-provider'
import { ThemeProvider } from '../utils/theme-provider'
import { AppLanguage } from '../i18n'

export const ReactApplicationContainer = (props: IReactApplicationContainerProps) => {
  const { lang, theme, color, debug, position } = props

  return <SaltyCubeProvider debug={debug}>
    <ConfigurationProvider lang={lang} theme={theme} color={color}>
      <ThemeProvider>
        <SaltyCard position={position}>
          <SaltyCubeMenuContainer />
        </SaltyCard>
      </ThemeProvider>
    </ConfigurationProvider>
  </SaltyCubeProvider>
}

export interface IReactApplicationContainerProps {
  lang?: AppLanguage
  theme?: AppTheme
  color?: string
  debug?: boolean
  position?: SaltyCardPosition
}
