import React from 'react'

export interface ISaltyCubeMenuProps {
  className?: string
  actions: ISaltyCubeMenuAction[]
}

export interface ISaltyCubeMenuAction {
  key: React.Key
  icon: React.ReactNode
  title: string
  disabled?: boolean
  
  onClick: () => void
}
