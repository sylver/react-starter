import React from 'react'
import PropTypes from 'prop-types'

import styles from './ContactPage.sass'

const reqStyles = require('./ContactPage.sass')

const Page = (props, context) => {
  const style = {
    backgroundColor: context.theme.palette.primary.color,
    padding: '2rem',
  }
  return (
    <div style={style} className={[styles.foobar, reqStyles.foober].join(' ')}>
      <h3>Contact Page</h3>
      <p>Illustrating multiples style sources/imports for one element</p>
    </div>
  )
}

Page.contextTypes = {
  theme: PropTypes.object.isRequired,
}

export default Page
