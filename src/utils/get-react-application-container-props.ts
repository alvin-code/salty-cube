import { IReactApplicationContainerProps } from '../containers/react-application-container'
import { AppLanguage, supportedLanguages } from '../i18n'
import { AppTheme, supportedThemes } from './configuration-provider'

const colorRegex = /^#([\da-f]{8}|[\da-f]{6}|[\da-f]{3,4})$/

export const getReactApplicationContainerProps = (element: Element): IReactApplicationContainerProps => {
  const themeValue = element.getAttribute('data-salty-cube-theme') as AppTheme
  const theme = themeValue != null && supportedThemes.includes(themeValue) ?
    themeValue : undefined

  const colorValue = element.getAttribute('data-salty-cube-color')
  const color = colorValue != null && colorRegex.test(colorValue) ?
    colorValue : undefined

  const langValue = element.getAttribute('data-salty-cube-lang') as AppLanguage
  const lang = langValue != null && supportedLanguages.includes(langValue) ?
    langValue : undefined

  const debugValue = element.getAttribute('data-salty-cube-debug')
  const debug = debugValue != null && Boolean(debugValue)

  return { theme, color, lang, debug }
}
