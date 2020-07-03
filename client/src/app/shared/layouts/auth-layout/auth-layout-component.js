import React from 'react'
import PropTypes from 'prop-types'

import classes from './auth-layout-component.module.scss'

export const AuthLayoutComponent = (props) => {
  return (
    <main className={classes.main}>
      <div className={classes.wrapper}>
        {props.children}
      </div>
    </main>
  )
}

AuthLayoutComponent.propTypes = {
  children: PropTypes.node.isRequired
}
