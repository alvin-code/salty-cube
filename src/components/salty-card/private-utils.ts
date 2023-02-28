import React from 'react'

import { SaltyCardPosition } from './types'

export const getPositionStyle = (position?: SaltyCardPosition): React.CSSProperties => {
  const { top: t, left: l, right: r, bottom: b } = position ?? {}

  const top = getValue(t, b)
  const left = getValue(l, r)
  const right = getValue(r, l)
  const bottom = getValue(b, t)
  
  if (top != undefined) {
    if (left != undefined) return { top, left }
    else if (right != undefined) return { top, right }
  } else if (bottom != undefined) {
    if (left != undefined) return { bottom, left }
    else if (right != undefined) return { bottom, right }
  }

  return { bottom: DEFAULT_OFFSET, right: DEFAULT_OFFSET }
}

const DEFAULT_OFFSET = 20
const getValue = (value?: number | boolean, oppositeValue?: number | boolean) =>
  value != undefined && oppositeValue == undefined ? typeof value == 'boolean' ? DEFAULT_OFFSET : value : undefined
