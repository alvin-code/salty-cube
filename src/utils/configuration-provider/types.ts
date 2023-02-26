import React from 'react'

import { AppLanguage } from '../../i18n'

export interface IConfigurationProviderProps {
  lang?: AppLanguage
  theme?: AppTheme
  color?: string

  children: React.ReactNode
}

export type AppTheme = 'dark' | 'light' | 'compact'
export const supportedThemes: AppTheme[] = [ 'dark', 'light', 'compact' ]
