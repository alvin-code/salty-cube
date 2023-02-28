import React, { useMemo } from 'react'
import { Card } from 'antd'
import styled from 'styled-components'
import classNames  from 'classnames'

import { getPositionStyle } from './private-utils'
import { ISaltyCardProps } from './types'

const SaltyCardComponent = (props: ISaltyCardProps) => {
  const { className, position, children } = props
  const style = useMemo(() => getPositionStyle(position), [ position ])

  return <Card className={classNames('salty-card', className)} size="small" style={style}>
    {children}
  </Card>
}

export const SaltyCard = styled(SaltyCardComponent)`
  position: fixed;
  z-index: 100;`
