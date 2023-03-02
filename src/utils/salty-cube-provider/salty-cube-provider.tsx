import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SugarCubeObject } from 'twine-sugarcube'

import { SaltyCubeAction } from './actions'
import { getNavigation } from './private-utils'
import { ISaltyCubeProviderProps, ISaltyCubeContext } from './types'

const defaultSaltyCubeContext: ISaltyCubeContext = {
  sugarCube: {} as SugarCubeObject,
  actions: [],

  navigation: { canGoBack: false, canGoForward: false },
  
  debug: () => {}
}

const saltyCubeContext = createContext<ISaltyCubeContext>(defaultSaltyCubeContext)
const { Provider } = saltyCubeContext

export const useSaltyCube = () => useContext(saltyCubeContext)

export const SaltyCubeProvider = (props: ISaltyCubeProviderProps) => {
  const { debug = false, actions = defaultActions, children } = props
  const { t } = useTranslation()

  const debugRef = useRef(debug)
  const debugFunc = useCallback((message: string) => { if (debugRef.current) console.log(t('log-message', { message })) }, [])

  const sugarCube = window.SugarCube!
  const [ value, setValue ] = useState<ISaltyCubeContext>({
    sugarCube,
    actions: [],

    navigation: getNavigation(sugarCube),

    debug: debugFunc
  })

  // debug toggle effect
  useEffect(() => {
    if (debugRef.current != debug) {
      if (debugRef.current) debugFunc(t('disabling-debug'))
      debugRef.current = debug
    }
  }, [ debug ])

  // subscribe to sugar cube events
  useEffect(
    () => {
      // navigation changed
      $(document).on(':passageend', () => setValue(s => {
        const { navigation: { canGoBack, canGoForward } } = s
        const navigation = getNavigation(sugarCube)

        const navigationChanged = navigation.canGoBack != canGoBack || navigation.canGoForward != canGoForward
        if (navigationChanged) {
          debugFunc(t('navigation-changed'))
          return { ...s, navigation }
        } else return s
      }))

      // save changed
      
    },
    [])
  
  // handle actions change
  useEffect(
    () => setValue(s => ({ ...s, actions: [ ...actions ] })),
    [ actions ])

  return <Provider value={value}>
    {children}
  </Provider>
}

const defaultActions: SaltyCubeAction[] = [
  { type: 'go-back' },
  { type: 'go-forward' },
  { type: 'quick-save' },
  { type: 'quick-load' },
  { type: 'vars-editor' }
]
