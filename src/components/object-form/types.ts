import { FormInstance } from 'antd'

export interface IObjectFormProps {
  className?: string
  height?: number
  maxHeight?: number

  object: any
  form: FormInstance

  onFinish?: () => void
}
