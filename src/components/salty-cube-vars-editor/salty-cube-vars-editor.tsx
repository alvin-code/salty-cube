import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { Button, Form, Modal } from 'antd'

import { ObjectForm } from '../object-form'
import { ISaltyCubeVarsEditorProps } from './types'

const SaltyCubeVarsEditorComponent = (props: ISaltyCubeVarsEditorProps) => {
  const { className, open, variables, onSubmit, onCancel } = props
  const { t } = useTranslation()

  const [ form ] = Form.useForm()

  const onResetHandler = useCallback(() => form.resetFields(), [ form ])
  const onOkHandler = useCallback(() => form.submit(), [ form ])
  const onCancelHandler = useCallback(() => {
    form.resetFields()
    if (onCancel != undefined) onCancel()
  }, [ form, onCancel ])
  const onFinishHandler = useCallback(() => {
    const changed = form.getFieldsValue(true, m => m.touched)
    if (onSubmit != undefined) onSubmit(changed)
  }, [ form, onSubmit ])

  const footer = useMemo(() => [
    <Button key="reset" className="editor-button editor-button-reset" onClick={onResetHandler}>{t('editor:reset')}</Button>,
    <Button key="submit" className="editor-button" type="primary" onClick={onOkHandler}>{t('editor:save')}</Button>,
    <Button key="cancel" className="editor-button" onClick={onCancelHandler}>{t('editor:cancel')}</Button>
  ], [ onResetHandler, onOkHandler, onCancelHandler ])

  return <Modal className={className} title={t('editor:title')} destroyOnClose open={open} footer={footer} onCancel={onCancelHandler}>
    <ObjectForm className="vars-editor-form" object={variables} form={form} maxHeight={window.innerHeight / 2} onFinish={onFinishHandler} />
  </Modal>
}

export const SaltyCubeVarsEditor = styled(SaltyCubeVarsEditorComponent)`
  .ant-modal-footer > .editor-button {
    width: 100px;

    &:hover {
      color: ${props => props.theme.primaryColor};
      border-color: ${props => props.theme.primaryColor};
      background-color: ${props => props.theme.containerColor};
    }

    &.editor-button-reset {
      float: left;
    }
  }`
