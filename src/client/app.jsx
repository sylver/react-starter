/* eslint-disable import/no-extraneous-dependencies */
import React, { Fragment } from 'react'
import { Route, Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import { DEV_MODE } from '../common/env'

import { HomePage, ContactPage, AboutPage } from './pages'

// import webpacklogo from './content/webpack.svg'
import './styles/main.scss'
import './styles/test.sass'

const App = () => (
  <Fragment>
    <header>
      <h1>React16 webpack4 Example</h1>
    </header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
    <main>
      {/* <img src={webpacklogo} alt="logo" /> */}
      <Route path="/" exact component={HomePage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
    </main>
    <footer>
        React16 webpack4 Example
    </footer>
  </Fragment>
)

export default DEV_MODE ? hot(module)(App) : App
