import { useState } from 'react'
import './SwitchField.css'

function SwitchField({ label, helper, defaultChecked = false, children }) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="switch-field">
      <label className="switch-field__top">
        <span className="switch-field__texts">
          <span className="switch-field__label">{label}</span>
          {helper && <span className="switch-field__helper">{helper}</span>}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          className="switch"
          onClick={() => setChecked(!checked)}
        >
          <span className="switch__knob" />
        </button>
      </label>

      {checked && children && (
        <>
          <div className="switch-field__divider" />
          <div className="switch-field__content">{children}</div>
        </>
      )}
    </div>
  )
}

export default SwitchField