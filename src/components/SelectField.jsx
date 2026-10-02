import { useEffect, useId, useRef, useState } from 'react'
import './SelectField.css'
import Icon from './Icon'

function SelectField({
  label,
  options,
  placeholder = 'Elegí una opción',
  helpText,
  error,
  defaultValue = '',
  onChange,
}) {
  const id = useId()
  const buttonId = `${id}-button`
  const listId = `${id}-list`
  const messageId = `${id}-message`
  const message = error || helpText

  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)

  const rootRef = useRef(null)
  const buttonRef = useRef(null)

  // Cerrar la lista al tocar fuera del select
  useEffect(() => {
    if (!open) return

    function handlePointerDown(event) {
      if (!rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  // Con el teclado, mantener visible la opción resaltada
  useEffect(() => {
    if (!open) return
    const option = document.getElementById(`${id}-option-${active}`)
    if (option) option.scrollIntoView({ block: 'nearest' })
  }, [open, active, id])

  function openList() {
    const current = options.indexOf(value)
    setActive(current >= 0 ? current : 0)
    setOpen(true)
  }

  function choose(option) {
    setValue(option)
    setOpen(false)
    buttonRef.current.focus()
    if (onChange) onChange(option)
  }

  function handleClick(event) {
    // Los clicks que genera el teclado los maneja handleKeyDown
    if (event.detail === 0) return
    if (open) {
      setOpen(false)
    } else {
      openList()
    }
  }

  function handleKeyDown(event) {
    const key = event.key

    if (!open) {
      if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter' || key === ' ') {
        event.preventDefault()
        openList()
      }
      return
    }

    if (key === 'ArrowDown') {
      event.preventDefault()
      setActive(Math.min(active + 1, options.length - 1))
    } else if (key === 'ArrowUp') {
      event.preventDefault()
      setActive(Math.max(active - 1, 0))
    } else if (key === 'Enter' || key === ' ') {
      event.preventDefault()
      choose(options[active])
    } else if (key === 'Escape') {
      event.preventDefault()
      setOpen(false)
    } else if (key === 'Tab') {
      setOpen(false)
    }
  }

  const classes = [
    'select-field',
    open && 'select-field--open',
    error && 'select-field--error',
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} ref={rootRef}>
      <label className="select-field__label" htmlFor={buttonId}>
        {label}
      </label>

      <div className="select-field__control">
        <button
          ref={buttonRef}
          id={buttonId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open ? `${id}-option-${active}` : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className="select-field__button"
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <span className={value ? 'select-field__value' : 'select-field__value select-field__value--placeholder'}>
            {value || placeholder}
          </span>
          <Icon name="arrows-button-down" className="select-field__icon" />
        </button>

        {open && (
          <ul id={listId} role="listbox" aria-label={label} className="select-field__list">
            {options.map((option, index) => (
              <li
                key={option}
                id={`${id}-option-${index}`}
                role="option"
                aria-selected={option === value}
                className={index === active ? 'select-field__option select-field__option--active' : 'select-field__option'}
                onPointerEnter={() => setActive(index)}
                onClick={() => choose(option)}
              >
                <span className="select-field__option-text">{option}</span>
                {option === value && <span className="select-field__dot" aria-hidden="true" />}
              </li>
            ))}
          </ul>
        )}
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