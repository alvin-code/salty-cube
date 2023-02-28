import React from 'react'
import { StrictUnion } from '../../utils'

export interface ISaltyCardProps {
  className?: string
  position?: SaltyCardPosition
  children: React.ReactNode
}

export type SaltyCardPosition = StrictUnion<
  { top: number | boolean, left: number | boolean } |
  { top: number | boolean, right: number | boolean } |
  { bottom: number | boolean, left: number | boolean } |
  { bottom: number | boolean, right: number | boolean }>
