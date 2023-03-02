import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { DownloadOutlined, FormOutlined, StepBackwardOutlined, StepForwardOutlined, UploadOutlined } from '@ant-design/icons'

import { ISaltyCubeMenuAction, SaltyCubeMenu } from '../components/salty-cube-menu'
import { useSaltyCube } from '../utils/salty-cube-provider'

export const SaltyCubeMenuContainer = () => {
  const { sugarCube, navigation, quickSlot, actions } = useSaltyCube()
  const { t } = useTranslation()

  const menu = useMemo<ISaltyCubeMenuAction[]>(() =>
    actions.map<ISaltyCubeMenuAction>((action) => {
      const { type, key, icon, title, onClick } = action
      switch (type) {
        case 'go-back':
          return { key: '__go-back', icon: <StepBackwardOutlined />, title: t('menu:go-back'),
            disabled: !navigation.canGoBack,
            onClick: () => { window.SugarCube?.Engine.backward() } }
        case 'go-forward':
          return { key: '__go-forward', icon: <StepForwardOutlined />, title: t('menu:go-forward'),
            disabled: !navigation.canGoForward,
            onClick: () => { sugarCube.Engine.forward() } }
        case 'quick-save':
          return { key: '__quick-save', icon: <DownloadOutlined />, title: t('menu:quick-save'),
            disabled: quickSlot.number < 0,
            onClick: () => { sugarCube.Save.slots.save(quickSlot.number, t('quick-save')!) } }
        case 'quick-load':
          return { key: '__quick-load', icon: <UploadOutlined />, title: t('menu:quick-load'),
            disabled: quickSlot.number < 0 || !quickSlot.filled,
            onClick: () => { sugarCube.Save.slots.load(quickSlot.number) } }
        case 'vars-editor':
          return { key: '__variables-editor', icon: <FormOutlined />, title: t('menu:vars-editor'),
            onClick: () => {} }
        default:
          return { key, icon, title, onClick: () => { onClick(sugarCube) } }
      }
    }), [ actions, sugarCube, navigation, quickSlot ])
  return <SaltyCubeMenu actions={menu} />
}
