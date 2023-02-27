import React, { Suspense, useEffect } from 'react'
import { FloatButton } from 'antd'

import { AppLanguage, init } from '../i18n'
import { SaltyCubeProvider } from '../utils/salty-cube-provider'
import { ConfigurationProvider, AppTheme } from '../utils/configuration-provider'
import { ThemeProvider } from '../utils/theme-provider'

export const ReactApplicationContainer = (props: IReactApplicationContainerProps) => {
  const { lang, theme, color, debug } = props

  // initialize i18next on mount
  useEffect(() => { init(lang, debug) }, [])

  return <Suspense>
    <SaltyCubeProvider debug={debug}>
      <ConfigurationProvider lang={lang} theme={theme} color={color}>
        <ThemeProvider>
          <FloatButton style={{ top: 20, right: 20 }} />
        </ThemeProvider>
      </ConfigurationProvider>
    </SaltyCubeProvider>
  </Suspense>
}

export interface IReactApplicationContainerProps {
  lang?: AppLanguage
  theme?: AppTheme
  color?: string
  debug?: boolean
}
