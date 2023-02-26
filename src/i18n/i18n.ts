import i18n, { TFunction } from 'i18next'
import { initReactI18next } from 'react-i18next'
import detector from 'i18next-browser-languagedetector'

import { AppLanguage, supportedLanguages } from './types'

import resources from './resources'

export const init = async (lang?: AppLanguage, debug = false): Promise<TFunction> => {
  // if lang is undefined - use user-agent detection
  const initializer = lang != undefined ? i18n : i18n.use(detector)
  initializer.use(initReactI18next)
  
  const tFunction = await initializer
    .init(
      {
        resources,
        defaultNS: 'messages',
        supportedLngs: supportedLanguages,
        fallbackLng: 'ru',
        lng: lang,
        load: 'languageOnly',
        debug,
        react: { useSuspense: true }
      },
      (error, t) => {
        if (error) console.error('i18next initialization failed!', error)
        else if (debug) console.log(t('i18next-initialized', { language: i18n.language }))
      }
    )
  
  return tFunction
}
