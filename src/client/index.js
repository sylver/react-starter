/* eslint-disable react/jsx-filename-extension */
import React                from 'react'
import { BrowserRouter }    from 'react-router-dom'
import { render, hydrate }  from 'react-dom'

import { SSR } from '../common/env'
import App from './app'

const container = document.getElementById('app')
const renderMethod = SSR ? hydrate : render

const Root = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

renderMethod(<Root />, container)
