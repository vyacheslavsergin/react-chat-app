import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import classNames from 'classnames'

import {AuthLayoutComponent} from '../../app/shared/layouts/auth-layout/auth-layout-component'
import InputField from '../../components/input-field/input-field'
import {Button} from '../../components/button/button'

import classes from './login-page-component.module.scss'

const LoginPageComponent = (props) => {

  const {history} = props

  const [isFormValid, setFormValid] = useState(false)
  const [formControls, setFormControls] = useState({
    name: {
      value: '',
      type: 'text',
      label: 'Name',
      errorMessage: '',
      valid: false,
      touched: false,
      validation: {
        required: {
          isRequired: true,
          errorMessage: 'Name не должен быть пустым',
        }
      }
    },
    room: {
      value: '',
      type: 'text',
      label: 'Room',
      errorMessage: '',
      valid: false,
      touched: false,
      validation: {
        required: {
          isRequired: true,
          errorMessage: 'Room не должен быть пустым',
        },
        minLength: {
          minLength: 5,
          errorMessage: `Room должен быть больше`,
        }
      }
    }
  })

  const submitHandler = event => {
    event.preventDefault()
  }

  const loginHandler = () => {
    history.push(`/chat?name=${formControls.name.value}&room=${formControls.room.value}`)
  }

  const validateControl = (value, validation) => {

    if (!validation) {
      return true
    }

    let isValid = true
    let errorMessage = ''

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
      errorMessage = validation.required.errorMessage
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength.minLength && isValid

      if (value.length > 0) {
        errorMessage = `${validation.minLength.errorMessage} ${validation.minLength.minLength} символов`
      }
    }

    return {
      isValid,
      errorMessage
    }
  }

  const onChangeHandler = (event, controlName) => {

    const formControlsLocal = {...formControls}
    const control = {...formControls[controlName]}

    control.value = event.target.value
    control.touched = true

    const validateControlParams = validateControl(control.value, control.validation)

    control.valid = validateControlParams.isValid
    control.errorMessage = validateControlParams.errorMessage

    formControlsLocal[controlName] = control

    let isFormValidLocal = true

    Object.keys(formControlsLocal).forEach(name => {
      isFormValidLocal = formControlsLocal[name].valid && isFormValidLocal
    })

    setFormControls(formControlsLocal)
    setFormValid(isFormValidLocal)
  }

  const renderInputs = () => {
    return Object.keys(formControls).map((controlName, idx) => {
      const control = formControls[controlName]
      return (
        <InputField
          errorMessage={control.errorMessage}
          key={controlName + idx}
          label={control.label}
          shouldValidate={!!control.validation}
          touched={control.touched}
          type={control.type}
          valid={control.valid}
          value={control.value}
          onChange={event => onChangeHandler(event, controlName)}
        />
      )
    })
  }

  return (
    <AuthLayoutComponent>
      <section className={`${classNames(classes['join-page-component'])}`}>
        <form onSubmit={submitHandler}>
          <div className="row">
            {renderInputs()}
          </div>
          <Button
            title="enter chat"
            type="submit"
            onClick={loginHandler}
            isDisabled={!isFormValid}
          />
        </form>
      </section>
    </AuthLayoutComponent>
  )
}

LoginPageComponent.propTypes = {
  history: PropTypes.object.isRequired
}

export default withRouter(LoginPageComponent)
