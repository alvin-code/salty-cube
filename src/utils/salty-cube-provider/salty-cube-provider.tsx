import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SugarCubeObject } from 'twine-sugarcube'

import { SaltyCubeAction } from './actions'
import { getNavigation, getQuickSlot } from './private-utils'
import { ISaltyCubeProviderProps, ISaltyCubeContext } from './types'

const defaultSaltyCubeContext: ISaltyCubeContext = {
  sugarCube: {} as SugarCubeObject,
  actions: [],

  navigation: { canGoBack: false, canGoForward: false },
  quickSlot: { number: -1, filled: false },
  varsEditorOpen: false,
  
  setVarsEditorOpen: () => {},
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
    quickSlot: getQuickSlot(sugarCube),
    varsEditorOpen: false,

    setVarsEditorOpen: (value) => setValue(s => s.varsEditorOpen != value ? { ...s, varsEditorOpen: value } : s),
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
      $(document).on(':passageend', (e) => setValue(s => {
        const { navigation: { canGoBack, canGoForward } } = s
        const navigation = getNavigation(sugarCube)

        const navigationChanged = navigation.canGoBack != canGoBack || navigation.canGoForward != canGoForward
        if (navigationChanged) {
          const { title } = e.passage
          debugFunc(t('navigation-changed', { title }))
          return { ...s, navigation }
        } else return s
      }))

      // save changed
      if (sugarCube.Save.onSave != undefined) {
        sugarCube.Save.onSave.add(() => setValue(s => {
          const { quickSlot: { number, filled } } = s
          const quickSlot = getQuickSlot(sugarCube)

          const quickSlotChanged = quickSlot.number != number || quickSlot.filled != filled
          if (quickSlotChanged) {
            debugFunc(t('save-data-changed'))
            return { ...s, quickSlot }
          } else return s
        }))
      } else setValue(s => {
        const { quickSlot: { number, filled } } = s
        return !filled ? { ...s, quickSlot: { number, filled: true } } : s
      })
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
