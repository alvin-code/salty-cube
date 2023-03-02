import React, { useMemo } from 'react'
import { Button, Space, Tooltip } from 'antd'
import styled from 'styled-components'
import classNames from 'classnames'

import { ISaltyCubeMenuProps } from './types'

const SaltyCubeMenuComponent = (props: ISaltyCubeMenuProps) => {
  const { className, actions } = props
  const buttons = useMemo(() => actions
    .map(({ key, icon, title, disabled, onClick }) => <Tooltip key={key} title={title}>
      <Button className="salty-cube-menu-button" icon={icon} onClick={onClick} disabled={disabled} />
    </Tooltip>),
    [ actions ])

  return <Space.Compact block className={classNames('salty-cube-menu', className)}>
    {buttons}
  </Space.Compact>
}

export const SaltyCubeMenu = styled(SaltyCubeMenuComponent)`
  .salty-cube-menu-button:hover {
    color: ${props => props.theme.primaryColor};
    border-color: ${props => props.theme.primaryColor};
    background-color: ${props => props.theme.containerColor};
  }`
