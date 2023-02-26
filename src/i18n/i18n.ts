import i18n, { TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'

import { AppLanguage, supportedLngs } from './types'

import resources from './resources'

export const init = async (lng?: AppLanguage, debug = false): Promise<TFunction> => {
  // если language не передали - используем детектор user-agent
  const initializer = lng != undefined ? i18n : i18n.use(detector)
  initializer.use(initReactI18next)

  const tFunction = await initializer
    .init(
      {
        resources,
        supportedLngs,
        fallbackLng: 'ru',
        lng,
        load: 'languageOnly',
        debug,
        react: { useSuspense: false }
      },
      (error, t) => {
        if (error) console.error('i18next initialization failed!', error)
        else if (debug) console.log(t('i18next-initialized', { language: i18n.language }))
      }
    )
  
  return tFunction
}
