/* eslint-disable react/jsx-filename-extension */
import React              from 'react'
import { BrowserRouter }  from 'react-router-dom'
import { hydrate }        from 'react-dom'

import App from './app'

const tag = document.createElement('div')
tag.id = 'app'
document.body.appendChild(tag)
const container = document.getElementById('app')

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

hydrate(<Root />, container)
