import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import classes from './input-field.module.scss'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

export const InputField = (props) => {

  const {
    errorMessage,
    label,
    onChange,
    placeholder,
    shouldValidate,
    touched,
    type,
    valid,
    value
  } = props

  const inputType = type || 'text'
  const cls = [classes.input]
  const htmlFor = `${inputType}-${Math.random()}`
  const placeholderForInput = placeholder || placeholder

  const validParams = {
    valid, touched, shouldValidate
  }

  if (isInvalid(validParams)) {
    cls.push(classes.invalid)
  }

  return (
    <div className={classNames('input-field', cls.join(' '))}>
      <input
        className={classes['input-field']}
        placeholder={placeholderForInput}
        id={htmlFor}
        type={inputType}
        onChange={onChange}
        value={value}
      />
      <label htmlFor={htmlFor}>{label}</label>
      {
        isInvalid(validParams)
          ? <span className="helper-text red-text">{errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  )
}

InputField.propTypes = {
  errorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  shouldValidate: PropTypes.bool.isRequired,
  touched: PropTypes.bool.isRequired,
  type: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
}

InputField.defaultProps = {
  errorMessage: 'Введите верное значение',
  placeholder: null,
  type: 'text'
}

export default InputField
