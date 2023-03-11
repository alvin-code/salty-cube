import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Empty, Form, Input, Space, theme } from 'antd'
import { ListChildComponentProps, VariableSizeList } from 'react-window'
import SimpleBar, { Props as SimpleBarProps } from 'simplebar-react'
import classNames from 'classnames'
import styled from 'styled-components'

import { getItems, renderFormItem } from './private-utils'
import { IObjectFormProps } from './types'
import { useDebounce } from 'use-debounce'

const ObjectFormComponent = (props: IObjectFormProps) => {
  const { className, object, form, height, maxHeight, onFinish } = props
  const { t } = useTranslation()

  const { token } = theme.useToken()
  const listWidth = 472

  const [ term, setTerm ] = useState('')
  const [ debouncedTerm ] = useDebounce(term, 300)
  const onTermChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setTerm(e.target.value), [])

  const items = useMemo(() => getItems(object, debouncedTerm, token), [ object, debouncedTerm ])
  const [ sizes, itemsHeight, listHeight ] = useMemo(
    () => {
      const sizes = items.map(i => i.visible ? i.height : 0)
      const itemsHeight = sizes.reduce((a, s) => a + s, 0)
      const listHeight = height ?? (maxHeight != undefined ? Math.min(itemsHeight, maxHeight) : 300)

      return [ sizes, itemsHeight, listHeight ]
    },
    [ items, height, maxHeight ])

  const ref = useRef<VariableSizeList>(null)
  useLayoutEffect(() => ref.current?.resetAfterIndex(0), [ itemsHeight ])

  const renderListItem = useCallback(({ index, style }: ListChildComponentProps) =>
    renderFormItem(items[index]!, style),
    [ items ])

  const renderFormContent = useCallback<Exclude<SimpleBarProps['children'], React.ReactNode>>(({ scrollableNodeRef, contentNodeRef }) =>
    <VariableSizeList className="object-form-items-list" ref={ref}
      width={listWidth} height={listHeight} itemCount={items.length} itemSize={i => sizes[i] ?? 0}
      outerRef={scrollableNodeRef} innerRef={contentNodeRef}>
      {renderListItem}
    </VariableSizeList>,
    [ listWidth, listHeight, items, sizes ])

  return <Space className={classNames('object-form', className)} direction="vertical">
    <Input placeholder={t('editor:filter-placeholder')!} allowClear value={term} onChange={onTermChange} />
    <Form className="object-form-container" form={form} initialValues={object}
      labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}
      onFinish={onFinish}>
      <SimpleBar style={{ height: listHeight }}>
        {renderFormContent}
      </SimpleBar>
    </Form>
    {itemsHeight == 0 && <Empty description={t('editor:no-matching-var', { term: debouncedTerm })} />}
  </Space>
}

export const ObjectForm = styled(ObjectFormComponent)`
  width: 100%;

  .object-form-container {
    .object-form-items-list {
      .object-form-item {
        .ant-form-item-control > .ant-form-item-control-input .ant-input-number {
          width: 100%;
        }
        
        &.object-form-item-hidden {
          display: none;
        }
      }

      /* hide native scrollbar */
      &::-webkit-scrollbar {
        width: 0;
      }
      &::-webkit-scrollbar-track {
        background: transparent;
        box-shadow: none;
      }
      &::-webkit-scrollbar-thumb {
        background-color: transparent;
        box-shadow: none;
      }
    }
  }`
