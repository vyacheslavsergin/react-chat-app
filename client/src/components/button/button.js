import React, { useCallback } from 'react'
import PropTypes from 'prop-types'

export const Button = (props) => {

  const {
    isDisabled,
    onClick,
    title,
    type,
  } = props

  const typeButton = type || 'button'

  return (
    <button
      className="waves-effect waves-light btn"
      type={typeButton}
      disabled={isDisabled}
      onClick={useCallback(() => {
        onClick()
      }, [onClick])}
    >
      { title }
    </button>
  )
}

Button.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  type: PropTypes.string
}

Button.defaultProps = {
  type: 'button'
}
