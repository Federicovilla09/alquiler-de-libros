import { useId, useState } from 'react'
import './TextField.css'
import Icon from './Icon'

function TextField({
  label,
  type = 'text',
  placeholder = ' ',
  icon,
  helpText,
  error,
  multiline = false,
  name,
  defaultValue,
  inputMode,
  autoComplete,
  onChange,
  autoFocus,
}) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && visible ? 'text' : type

  const messageId = `${id}-message`
    const message = (typeof error === 'string' ? error : null) || helpText
  const Field = multiline ? 'textarea' : 'input'

  const classes = [
    'text-field',
    multiline && 'text-field--multiline',
    error && 'text-field--error',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes}>
      <label className="text-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="text-field__box">
        <Field
          id={id}
          name={name}
          className="text-field__input"
          type={multiline ? undefined : inputType}
          rows={multiline ? 5 : undefined}
          placeholder={placeholder}
          defaultValue={defaultValue}
          inputMode={inputMode}
          autoComplete={autoComplete}
          onChange={onChange}
          autoFocus={autoFocus}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
        />
        {isPassword ? (
          <button
            type="button"
            className="text-field__toggle"
            aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            aria-pressed={visible}
            onClick={() => setVisible(!visible)}
          >
            <Icon name={visible ? 'view-eye' : 'view-off'} />
          </button>
        ) : (
          icon && <Icon name={icon} className="text-field__icon" />
        )}
      </div>
      {message && (
        <p id={messageId} className="text-field__message">
          {message}
        </p>
      )}
    </div>
  )
}

export default TextField