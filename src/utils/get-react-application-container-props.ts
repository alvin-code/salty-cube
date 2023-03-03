import { SaltyCardPosition } from '../components/salty-card'
import { IReactApplicationContainerProps } from '../containers/react-application-container'
import { AppTheme, supportedThemes } from './configuration-provider'
import { AppLanguage, supportedLanguages } from '../i18n'

const colorRegex = /^#([\da-f]{8}|[\da-f]{6}|[\da-f]{3,4})$/
const positionRegex = /^(top(:\d+)?|bottom(:\d+)?|left(:\d+)?|right(:\d+)?);(top(:\d+)?|bottom(:\d+)?|left(:\d+)?|right(:\d+)?)$/

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

  const positionValue = element.getAttribute('data-salty-cube-position')
  const position = positionValue != null && positionRegex.test(positionValue) ?
    parsePosition(positionValue) : undefined

  return { theme, color, lang, debug, position }
}

const parsePosition = (value: string): SaltyCardPosition | undefined => {
  const [ a, b ] = value.split(';')
  const [ valueA, offsetA ] = a!.split(':')
  const [ valueB, offsetB ] = b!.split(':')

  if (valueA == 'top' || valueB == 'top') {
    if (valueB == 'left' || valueA == 'left') return { top: parseOffset(offsetA), left: parseOffset(offsetB) }
    else if (valueB == 'right' || valueA == 'right') return { top: parseOffset(offsetA), right: parseOffset(offsetB) }
  } else if (valueA == 'bottom' || valueB == 'bottom') {
    if (valueB == 'left' || valueA == 'left') return { bottom: parseOffset(offsetA), left: parseOffset(offsetB) }
    else if (valueB == 'right' || valueA == 'right') return { bottom: parseOffset(offsetA), right: parseOffset(offsetB) }
  }

  return undefined
}

const parseOffset = (value?: string): number | boolean => {
  const parsed = Number(value)
  return Number.isNaN(parsed) ? true : parsed
}
