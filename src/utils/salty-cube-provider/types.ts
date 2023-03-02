import React from 'react'
import { SugarCubeObject } from 'twine-sugarcube'

import { SaltyCubeAction } from './actions'

export interface ISaltyCubeProviderProps {
  debug?: boolean
  actions?: SaltyCubeAction[]

  children: React.ReactNode
}

export interface ISaltyCubeContext {
  sugarCube: SugarCubeObject
  actions: SaltyCubeAction[]

  navigation: ISaltyCubeNavigation
  quickSlot: ISaltyCubeQuickSlot
  varsEditorOpen: boolean

  setVarsEditorOpen: (open: boolean) => void
  debug: (message: string) => void
}

export interface ISaltyCubeNavigation {
  canGoBack: boolean
  canGoForward: boolean
}

export interface ISaltyCubeQuickSlot {
  number: number
  filled: boolean
}
