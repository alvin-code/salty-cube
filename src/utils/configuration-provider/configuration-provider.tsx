import React, { useEffect, useMemo } from 'react'
import { ConfigProvider } from 'antd'
import i18next from 'i18next'

import { useSaltyCube } from '../salty-cube-provider'
import { getAntdLocale, getAntdTheme } from './private-utils'
import { IConfigurationProviderProps } from './types'

export const ConfigurationProvider = (props: IConfigurationProviderProps) => {
  const { lang, theme, color, children } = props
  const { debug } = useSaltyCube()

  const antdLocale = useMemo(() => getAntdLocale(lang), [ lang ])
  const antdTheme = useMemo(() => getAntdTheme(theme, color), [ theme, color ])
  
  // async change i18next language
  useEffect(() => {
    if (lang != undefined && i18next.language != lang) {
      debug(i18next.t('change-language', { current: i18next.language, new: lang }))
      i18next.changeLanguage(lang)
    }
  }, [ lang ])

  return <ConfigProvider locale={antdLocale} theme={antdTheme}>
    {children}
  </ConfigProvider>
}
