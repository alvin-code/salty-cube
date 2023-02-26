import React, { useEffect, useMemo } from 'react'
import { ConfigProvider } from 'antd'
import i18next from 'i18next'

import { getAntdLocale, getAntdTheme } from './private-utils'
import { IConfigurationProviderProps } from './types'

export const ConfigurationProvider = (props: IConfigurationProviderProps) => {
  const { lang, theme, color, children } = props

  const antdLocale = useMemo(() => getAntdLocale(lang), [ lang ])
  const antdTheme = useMemo(() => getAntdTheme(theme, color), [ theme, color ])
  
  // async change i18next language
  useEffect(() => { if (i18next.language != lang) i18next.changeLanguage(lang) }, [ lang ])

  return <ConfigProvider locale={antdLocale} theme={antdTheme}>
    {children}
  </ConfigProvider>
}
