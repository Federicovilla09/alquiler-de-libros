import { useState } from 'react'
import './NumberStepper.css'

function NumberStepper({ label, defaultValue = 1, min = 1, max = 99, name }) {
  const [value, setValue] = useState(defaultValue)

  return (
    <div className="number-stepper" role="group" aria-label={label}>
      <button
        type="button"
        className="number-stepper__button"
        aria-label="Restar uno"
        disabled={value <= min}
        onClick={() => setValue(value - 1)}
      >
        −
      </button>
      <span className="number-stepper__value" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className="number-stepper__button"
        aria-label="Sumar uno"
        disabled={value >= max}
        onClick={() => setValue(value + 1)}
      >
        +
      </button>
      {name && <input type="hidden" name={name} value={value} />}
    </div>
  )
}

export default NumberStepper  