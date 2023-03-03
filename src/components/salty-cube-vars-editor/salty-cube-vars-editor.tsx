import React, { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import SimpleBar from 'simplebar-react'
import { Button, Empty, Form, Input, Modal, Space } from 'antd'

import { buildFormItems } from './private-utils'
import { ISaltyCubeVarsEditorProps } from './types'

const SaltyCubeVarsEditorComponent = (props: ISaltyCubeVarsEditorProps) => {
  const { className, open, variables, onSubmit, onCancel } = props
  const { t } = useTranslation()

  const [ term, setTerm ] = useState('')
  const onTermChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTerm(e.target.value), [])

  const [ form ] = Form.useForm()

  const afterCloseHandler = useCallback(() => setTerm(''), [ form ])
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

  const [ items, count ] = useMemo(() => buildFormItems(variables, term), [ variables, term ])
  const footer = useMemo(() => [
    <Button key="reset" className="editor-button editor-button-reset" onClick={onResetHandler}>{t('editor:reset')}</Button>,
    <Button key="submit" className="editor-button" type="primary" onClick={onOkHandler}>{t('editor:save')}</Button>,
    <Button key="cancel" className="editor-button" onClick={onCancelHandler}>{t('editor:cancel')}</Button>
  ], [ onResetHandler, onOkHandler, onCancelHandler ])

  return <Modal className={className} title={t('editor:title')} open={open}
    footer={footer} onCancel={onCancelHandler} afterClose={afterCloseHandler}>
    <Space className="vars-editor-space" direction="vertical">
      <Input placeholder={t('editor:filter-placeholder')!} allowClear value={term} onChange={onTermChange} />
      <SimpleBar className="vars-editor-form">
        <Form form={form} initialValues={variables}
          labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinishHandler}>
          {items}
        </Form>
      </SimpleBar>
      {count == 0 && <Empty description={t('editor:no-matching-var', { term })} />}
    </Space>
  </Modal>
}

export const SaltyCubeVarsEditor = styled(SaltyCubeVarsEditorComponent)`
  .vars-editor-space {
    width: 100%;

    .vars-editor-form {
      max-height: 50vh;

      .editor-form-item-hidden {
        display: none;
      }

      .editor-form-item-nested {
        margin-bottom: ${props => props.theme.nestedFormItemMargin}px;

        &:last-child {
          margin-bottom: 0;
        }

        .ant-card-body > .ant-form-item:last-child {
          margin-bottom: 0;
        }
      }

      .ant-input-number {
        width: 100%
      }
    }
  }

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
