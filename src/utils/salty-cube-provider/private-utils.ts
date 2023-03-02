import { SugarCubeObject } from 'twine-sugarcube'

import { ISaltyCubeNavigation } from './types'

export const getNavigation = (sugarCube: SugarCubeObject): ISaltyCubeNavigation => ({
  canGoBack: sugarCube.State.current != sugarCube.State.bottom,
  canGoForward: sugarCube.State.current != sugarCube.State.top
})
