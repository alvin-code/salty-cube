import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ISaltyCubeProviderProps, ISaltyCubeContext } from './types'

const defaultSaltyCubeContext: ISaltyCubeContext = {
  debug: () => {}
}

const saltyCubeContext = createContext<ISaltyCubeContext>(defaultSaltyCubeContext)
const { Provider } = saltyCubeContext

export const useSaltyCube = () => useContext(saltyCubeContext)

export const SaltyCubeProvider = (props: ISaltyCubeProviderProps) => {
  const { debug = false, children } = props
  const { t } = useTranslation()

  const debugRef = useRef(debug)
  const debugFunc = useCallback((message: string) => { if (debugRef.current) console.log(t('log-message', { message })) }, [])

  const [ value, setValue ] = useState<ISaltyCubeContext>({
    debug: debugFunc
  })

  // debug toggle effect
  useEffect(() => {
    if (debugRef.current != debug) {
      if (debugRef.current) debugFunc(t('disabling-debug'))
      debugRef.current = debug
    }
  }, [ debug ])

  return <Provider value={value}>
    {children}
  </Provider>
}
