import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import classes from './chat-message.module.scss'

export const ChatMessage = ({message, userId}) => {

  const {text, name, id} = message

  return (
    <div className={classNames(classes.message, {
      [classes.owner]: id === userId
    })}>
      <div className={classes['message__name-container']}>
        <b>{name}</b>
      </div>
      <div className={classNames('card', classes['message__text-container'])}>
        <div className={classes['message__text']}>{text}</div>
      </div>
    </div>
  )
}

ChatMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  userId: PropTypes.string.isRequired
}
