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

  debug: (message: string) => void
}

export interface ISaltyCubeNavigation {
  canGoBack: boolean
  canGoForward: boolean
}
