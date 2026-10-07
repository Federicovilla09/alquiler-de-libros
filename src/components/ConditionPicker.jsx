import { useState } from 'react'
import './ConditionPicker.css'
import TagChoice from './TagChoice'

const CONDITIONS = ['Nuevo', 'Casi nuevo', 'Subrayado', 'Notas', 'Etiquetas']

function ConditionPicker({ label, defaultValue = 'Nuevo', boxed = false, sub = false, onChange }) {
  const [selected, setSelected] = useState(defaultValue)

  const classes = [
    'condition-picker',
    boxed && 'condition-picker--boxed',
    sub && 'condition-picker--sub',
  ].filter(Boolean).join(' ')

  return (
    <fieldset className={classes}>
      <legend className="condition-picker__label">{label}</legend>
      <div className="condition-picker__options">
        {CONDITIONS.map((condition) => (
          <TagChoice
            key={condition}
            variant="condition"
            selected={condition === selected}
            onClick={() => {
              setSelected(condition)
              if (onChange) onChange(condition)
            }}
          >
            {condition}
          </TagChoice>
        ))}
      </div>
    </fieldset>
  )
}

export default ConditionPicker