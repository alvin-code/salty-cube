import { theme, ThemeConfig } from 'antd'
import en from 'antd/locale/en_US'
import ru from 'antd/locale/ru_RU'

import { AppLanguage } from '../../i18n'
import { AppTheme } from './types'

export const getAntdLocale = (lang?: AppLanguage) => {
  switch (lang) {
    case 'en': return en
    case 'ru':
    default:
      return ru
  }
}

export const getAntdTheme = (appTheme?: AppTheme, color?: string): ThemeConfig => {
  const token: ThemeConfig['token'] = color != undefined ? { colorPrimary: color } : undefined
  const algorithm: ThemeConfig['algorithm'] = appTheme == 'dark' ? theme.darkAlgorithm :
    appTheme == 'compact' ? theme.compactAlgorithm : undefined

  return { token, algorithm }
}
