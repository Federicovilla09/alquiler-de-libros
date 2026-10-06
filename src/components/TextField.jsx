import { useId } from 'react'
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
}) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error || helpText
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
          defaultValue={defaultValue}
          inputMode={inputMode}
          className="text-field__input"
          type={multiline ? undefined : type}
          rows={multiline ? 5 : undefined}
          placeholder={placeholder}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
        />
        {icon && <Icon name={icon} className="text-field__icon" />}
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