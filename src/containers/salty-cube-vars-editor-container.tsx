import React, { useCallback } from 'react'
import { SugarCubeStoryVariables } from 'twine-sugarcube'

import { SaltyCubeVarsEditor } from '../components/salty-cube-vars-editor'

import { useSaltyCube } from '../utils/salty-cube-provider'

export const SaltyCubeVarsEditorContainer = () => {
  const { sugarCube, varsEditorOpen, setVarsEditorOpen } = useSaltyCube()

  const onCancelHandler = useCallback(() => setVarsEditorOpen(false), [])
  const onSubmitHandler = useCallback((variables: Partial<SugarCubeStoryVariables>) => {
    if (sugarCube != undefined) mergePartial(sugarCube.State.variables, variables)
    setVarsEditorOpen(false)
  }, [ sugarCube ])

  const variables = deepClone(sugarCube?.State.variables ?? {})
  return <SaltyCubeVarsEditor open={varsEditorOpen} variables={variables}
    onCancel={onCancelHandler} onSubmit={onSubmitHandler} />
}

const deepClone = <TObj extends {}>(obj: TObj): TObj => {
  const clone: { [key: string]: boolean | number | string | object } = {}
  Object.entries(obj).forEach(([ key, value]) => {
    switch (typeof value) {
      case 'boolean':
      case 'number':
      case 'string':
        clone[key] = value
        break
      case 'object':
        clone[key] = deepClone(value!)
    }
  })

  return clone as TObj
}

const mergePartial = <TObj extends { [key: string]: any }>(obj: TObj, partial: Partial<TObj>) => {
  Object.entries(partial).forEach(([ key, value ]: [ keyof TObj, any ]) => {
    if (typeof value == 'object')
      mergePartial(obj[key], value)
    else
      obj[key] = value
  })
}
