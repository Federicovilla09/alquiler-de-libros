import { useState } from 'react'
import './StarRating.css'
import Icon from './Icon'

function StarRating({ label, defaultValue = 0, max = 5, name }) {
  const [value, setValue] = useState(defaultValue)

  const stars = []
  for (let n = 1; n <= max; n++) {
    stars.push(n)
  }

  return (
    <fieldset className="star-rating">
      <legend className="star-rating__label">{label}</legend>
      <div className="star-rating__stars">
        {stars.map((n) => (
          <button
            key={n}
            type="button"
            className="star-rating__star"
            aria-label={`${n} de ${max} estrellas`}
            aria-pressed={n <= value}
            onClick={() => setValue(n === value ? 0 : n)}
          >
            <Icon name="star" size={20} strokeWidth={2} filled={n <= value} />
          </button>
        ))}
      </div>
      {name && <input type="hidden" name={name} value={value} />}
    </fieldset>
  )
}

export default StarRating