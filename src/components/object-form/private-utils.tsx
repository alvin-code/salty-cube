import React from 'react'
import {Card, Form, GlobalToken, Input, InputNumber, Switch} from 'antd'
import classNames from "classnames";

export const getItems = (object: any, term: string, token: GlobalToken): IFormItem[] => {
  const bottomMargin = token.marginLG
  const baseItemHeight = token.controlHeight + bottomMargin
  const baseCardHeight = 38 + token.paddingContentVertical * 2 + bottomMargin

  const getFormItems = (object: any, term: string, parentKeys: string[]): IFormItem[] => {
    const items: IFormItem[] = []
    Object.entries(object).map(([ key, value ]) => {
      const name = [ ...parentKeys, key ]
      const itemKey = name.join('.')
      const visible = term == '' || key.toLowerCase().includes(term.toLowerCase())

      switch (typeof value) {
        case 'boolean':
          items.push({ key, height: baseItemHeight, visible,
            render: () => <Form.Item key={itemKey} name={name} label={key} valuePropName="checked">
              <Switch />
            </Form.Item>
          })
          break
        case 'number':
          items.push({ key, height: baseItemHeight, visible,
            render: () => <Form.Item key={itemKey} name={name} label={key}>
              <InputNumber />
            </Form.Item>
          })
          break
        case 'string':
          items.push({ key, height: baseItemHeight, visible,
            render: () => <Form.Item key={itemKey} name={name} label={key}>
              <Input />
            </Form.Item>
          })
          break
        case 'object':
          const nestedItems = getFormItems(value, term, name)
          const nestedItemsHeight = nestedItems.reduce((a, i) => i.visible ? i.height + a : a, 0)
          const cardItemHeight = baseCardHeight + nestedItemsHeight

          items.push({ key, height: cardItemHeight, visible: nestedItemsHeight > 0,
            render: () => <Card key={itemKey} title={key} size="small">
              {nestedItems.map(i => renderFormItem(i, { height: i.height }))}
            </Card>
          })
          break
      }
    })

    for (let i = items.length; i > 0; i--)
      if (items[i-1]!.visible) {
        // remove last item margin
        items[i-1]!.height -= bottomMargin
        break
      }

    return items
  }

  return getFormItems(object, term, [])
}

export const renderFormItem = (item: IFormItem, style: React.CSSProperties) => {
  const { key, visible, render } = item
  const className = classNames('object-form-item', { 'object-form-item-hidden': !visible })
  return <div key={key} className={className} style={style}>
    {render()}
  </div>
}

interface IFormItem {
  key: string
  height: number
  visible: boolean
  render: () => JSX.Element
}
