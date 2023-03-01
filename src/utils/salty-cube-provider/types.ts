import React from 'react'

import { SaltyCubeAction } from './actions'

export interface ISaltyCubeProviderProps {
  debug?: boolean
  actions?: SaltyCubeAction[]

  children: React.ReactNode
}

export interface ISaltyCubeContext {
  actions: SaltyCubeAction[]
  debug: (message: string) => void
}
