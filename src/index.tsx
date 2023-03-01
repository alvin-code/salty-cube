import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'simplebar-react/dist/simplebar.min.css'

import React from 'react'
import { createRoot } from 'react-dom/client'

import { ReactApplicationContainer } from './containers/react-application-container'
import { createContainer, getReactApplicationContainerProps } from './utils'
import { init } from './i18n'

if (document.currentScript != null) {
  const container = createContainer()
  const root = createRoot(container)
  
  const props = getReactApplicationContainerProps(document.currentScript)
  const render = () => root.render(<ReactApplicationContainer {...props} />)

  // initialize i18next before mount
  const { lang, debug } = props
  init(lang, debug)
    .then(() => {
      if (window.SugarCube == undefined) $(document).one(':storyready', render)
      else render()
    })
} else
  console.error('Can\'t locate salty-cube script tag! Please check the README for how to add salty-cube to your application')
