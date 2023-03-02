import { SugarCubeStoryVariables } from 'twine-sugarcube'

export interface ISaltyCubeVarsEditorProps {
  className?: string
  open?: boolean

  variables: SugarCubeStoryVariables

  onSubmit?: (variables: Partial<SugarCubeStoryVariables>) => void
  onCancel?: () => void
}
