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
  debug: (message: string) => void
}
