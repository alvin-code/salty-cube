import React, { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ISaltyCubeProviderProps, ISaltyCubeContext } from './types'

const defaultSaltyCubeContext: ISaltyCubeContext = {
  debug: false,
  log: () => {}
}

const saltyCubeContext = createContext<ISaltyCubeContext>(defaultSaltyCubeContext)
const { Provider } = saltyCubeContext

export const useSaltyCube = () => useContext(saltyCubeContext)

export const SaltyCubeProvider = (props: ISaltyCubeProviderProps) => {
  const { debug = false, children } = props
  const { t } = useTranslation()

  const [ value, setValue ] = useState<ISaltyCubeContext>({
    debug,
    log: debug ? (message) => console.log(t('log-message', { message })) : () => {}
  })

  // debug toggle effect
  useEffect(() => setValue(v => {
    if (v.debug != debug) {
      if (v.debug) v.log(t('disabling-debug'))
      return { ...v, debug }
    } else
      return v
  }), [ debug ])

  return <Provider value={value}>
    {children}
  </Provider>
}
