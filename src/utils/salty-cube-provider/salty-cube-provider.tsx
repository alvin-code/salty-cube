import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SugarCubeObject } from 'twine-sugarcube'

import { SaltyCubeAction } from './actions'
import { ISaltyCubeProviderProps, ISaltyCubeContext } from './types'

const defaultSaltyCubeContext: ISaltyCubeContext = {
  sugarCube: {} as SugarCubeObject,
  actions: [],
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

  const [ value, setValue ] = useState<ISaltyCubeContext>({
    sugarCube: window.SugarCube!,
    actions: [],
    debug: debugFunc
  })

  // debug toggle effect
  useEffect(() => {
    if (debugRef.current != debug) {
      if (debugRef.current) debugFunc(t('disabling-debug'))
      debugRef.current = debug
    }
  }, [ debug ])

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
