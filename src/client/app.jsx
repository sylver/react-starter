/* eslint-disable import/no-extraneous-dependencies */
import React            from 'react'
import { Helmet }       from 'react-helmet'
import { Route, Link }  from 'react-router-dom'
import { hot }          from 'react-hot-loader'

import { DEV_MODE } from '../common/env'

import { HomePage, ContactPage, AboutPage } from './pages'

import Katalyzer    from './vendors/katalyzer'
import defaultTheme from './themes/default'

const App = () => (
  <Katalyzer theme={defaultTheme}>
    <Helmet titleTemplate="React Starter - %s" defaultTitle="React Starter">
      <meta name="description" content="React16 starter app example" />
    </Helmet>
    <header>
      <h1>React16 Webpack4 Example</h1>
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
      React16 Webpack4 Babel7 SSR HMR example &copy; @sylv3r
    </footer>
  </Katalyzer>
)

export default DEV_MODE ? hot(module)(App) : App
