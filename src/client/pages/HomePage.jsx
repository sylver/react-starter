import React      from 'react'
import { Helmet } from 'react-helmet'
import PropTypes  from 'prop-types'

import styles from './HomePage.sass'

const reqStyles = require('./HomePage.sass')

const Page = (props, context) => {
  const style = {
    backgroundColor: context.theme.palette.primary.color,
    padding: '2rem',
  }
  return (
    <div style={style} className={[styles.foobar, reqStyles.foober].join(' ')}>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <h3>Home Page</h3>
      <p>Illustrating multiples style sources/imports for one element</p>
    </div>
  )
}

Page.contextTypes = {
  theme: PropTypes.object.isRequired,
}

export default Page
