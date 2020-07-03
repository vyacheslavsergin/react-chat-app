import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import classNames from 'classnames'

import classes from './aside.module.scss'

export const Aside = (props) => {

  const {
    chat: { user, users }
  } = props

  return (
    <aside className={classes.aside}>
      <div className={classes.container}>
        {users.map((u) => {
          return (
            <div
              key={u.id}
              className={classNames(classes.user, {
                [classes['is-active']]: u.id === user.id
              })}
            >
              {u.name}
            </div>
          )
        })}
      </div>
    </aside>
  )
}

Aside.propTypes = {
  chat: PropTypes.shape({
    chat: PropTypes.shape({
      name: PropTypes.string,
      room: PropTypes.string,
      id: PropTypes.string
    }),
    users: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      room: PropTypes.string
    }))
  }).isRequired
}

const mapStateToProps = (state) => {
  return {
    chat: state.chat
  }
}

export default connect(mapStateToProps)(Aside)
