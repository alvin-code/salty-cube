import React from 'react'
import { SugarCubeStoryVariables } from 'twine-sugarcube'
import { Card, Form, Input, InputNumber, Switch } from 'antd'

export const buildFormItems = (variables: SugarCubeStoryVariables, term: string, parentKeys: string[] = []): [ React.ReactNode[], number ] => {
  const items: React.ReactNode[] = []
  let count = 0

  Object.entries(variables).forEach(([ label, value ]) => {
    const name = [ ...parentKeys, label ]
    const key = name.join('.')
    const visible = term.length == 0 || label.toLowerCase().includes(term.toLowerCase())

    let className = getFormItemClassName(visible)
    switch (typeof value) {
      case 'boolean':
        if (visible) count++
        items.push(<Form.Item className={className} key={key} name={name} label={label} valuePropName="checked">
          <Switch />
        </Form.Item>)
        break
      case 'number':
        if (visible) count++
        items.push(<Form.Item className={className} key={key} name={name} label={label}>
          <InputNumber />
        </Form.Item>)
        break
      case 'string':
        if (visible) count++
        items.push(<Form.Item className={className} key={key} name={name} label={label}>
          <Input />
        </Form.Item>)
        break
      case 'object':
        const [ nestedItems, visibleItemsCount ] = buildFormItems(value, term, name)
        if (visible || visibleItemsCount > 0) count++

        className = `${getFormItemClassName(visibleItemsCount > 0)} editor-form-item-nested`
        items.push(<Card className={className} key={key} title={label} size="small">
          {nestedItems}
        </Card>)
        break
    }
  })

  return [ items, count ]
}

const getFormItemClassName = (visible: boolean) => visible ? 'editor-form-item' : 'editor-form-item editor-form-item-hidden'
