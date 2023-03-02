import { SugarCubeObject } from 'twine-sugarcube'

import { ISaltyCubeNavigation, ISaltyCubeQuickSlot } from './types'

export const getNavigation = (sugarCube: SugarCubeObject): ISaltyCubeNavigation => ({
  canGoBack: sugarCube.State.current != sugarCube.State.bottom,
  canGoForward: sugarCube.State.current != sugarCube.State.top
})

export const getQuickSlot = (sugarCube: SugarCubeObject): ISaltyCubeQuickSlot => {
  const { slots } = sugarCube.Save
  const number = slots.ok() && slots.length > 0 ? slots.length - 1 : -1

  return { number, filled: number >= 0 && sugarCube.Save.slots.has(number) }
}
