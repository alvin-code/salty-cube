import React from 'react'
import { SugarCubeObject } from 'twine-sugarcube'
import { StrictUnion } from '../strict-union'

interface IGoBackAction {
  type: 'go-back'
}

interface IGoForwardAction {
  type: 'go-forward'
}

interface IQuickSaveAction {
  type: 'quick-save'
}

interface IQuickLoadAction {
  type: 'quick-load'
}

interface IVarsEditorAction {
  type: 'vars-editor'
}

interface ICustomAction {
  type: 'custom'

  key: React.Key
  icon: React.ReactNode
  title: string
  onClick: (sugarCube: SugarCubeObject) => void
}

export type SaltyCubeAction = StrictUnion<IGoBackAction | IGoForwardAction | IQuickSaveAction | IQuickLoadAction | IVarsEditorAction | ICustomAction>
