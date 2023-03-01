import React, { useMemo } from 'react'
import { DownloadOutlined, FormOutlined, StepBackwardOutlined, StepForwardOutlined, UploadOutlined } from '@ant-design/icons'

import { ISaltyCubeMenuAction, SaltyCubeMenu } from '../components/salty-cube-menu'
import { useSaltyCube } from '../utils/salty-cube-provider'

export const SaltyCubeMenuContainer = () => {
  const { sugarCube, actions } = useSaltyCube()
  console.log(sugarCube)

  const menu = useMemo<ISaltyCubeMenuAction[]>(() =>
    actions.map<ISaltyCubeMenuAction>((action) => {
      const { type, key, icon, title, onClick } = action
      switch (type) {
        case 'go-back':
          return { key: '__go-back', icon: <StepBackwardOutlined />, title: 'Go back',
            onClick: () => { window.SugarCube?.Engine.backward() } }
        case 'go-forward':
          return { key: '__go-forward', icon: <StepForwardOutlined />, title: 'Go forward',
            onClick: () => { sugarCube.Engine.forward() } }
        case 'quick-save':
          return { key: '__quick-save', icon: <DownloadOutlined />, title: 'Q.Save',
            onClick: () => {} }
        case 'quick-load':
          return { key: '__quick-load', icon: <UploadOutlined />, title: 'Q.Load',
            onClick: () => {} }
        case 'vars-editor':
          return { key: '__variables-editor', icon: <FormOutlined />, title: 'Vars editor',
            onClick: () => {} }
        default:
          return { key, icon, title, onClick: () => { onClick(sugarCube) } }
      }
    }), [ actions, sugarCube ])
  return <SaltyCubeMenu actions={menu} />
}
