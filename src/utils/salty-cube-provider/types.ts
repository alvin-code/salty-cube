import React from 'react'

export interface ISaltyCubeProviderProps {
  debug?: boolean

  children: React.ReactNode
}

export interface ISaltyCubeContext {
  debug: boolean
  log: (message: string) => void
}
