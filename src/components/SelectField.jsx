import { useId } from 'react'
import './SelectField.css'
import Icon from './Icon'

function SelectField({ label, options, placeholder, helpText, error, name, defaultValue, onChange }) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error || helpText

  return (
    <div className={error ? 'select-field select-field--error' : 'select-field'}>
      <label className="select-field__label" htmlFor={id}>
        {label}
      </label>
      <div className="select-field__box">
        <select
          id={id}
          name={name}
          className="select-field__select"
          defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          onChange={onChange}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="arrows-button-down" className="select-field__icon" />
      </div>
      {message && (
        <p id={messageId} className="select-field__message">
          {message}
        </p>
      )}
    </div>
  )
}

export default SelectField