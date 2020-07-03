import React from 'react'
import PropTypes from 'prop-types'

import Aside from '../../../../components/aside/aside'

import classes from './site-layout-component.module.scss'

export const SiteLayoutComponent = (props) => {
  return (
    <div className={classes.layout}>
      <Aside />
      <main className={classes.main}>
        <header>header</header>
        <div className={classes.wrapper}>
          {props.children}
        </div>
        <footer />
      </main>
    </div>
  )
}

SiteLayoutComponent.propTypes = {
  children: PropTypes.node.isRequired
}
