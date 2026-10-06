import { useState } from 'react'
import './ConditionPicker.css'
import TagChoice from './TagChoice'

const CONDITIONS = ['Nuevo', 'Casi nuevo', 'Subrayado', 'Notas', 'Etiquetas']

function ConditionPicker({ label, defaultValue = 'Nuevo', boxed = false }) {
  const [selected, setSelected] = useState(defaultValue)

  return (
    <fieldset className={boxed ? 'condition-picker condition-picker--boxed' : 'condition-picker'}>
      <legend className="condition-picker__label">{label}</legend>
      <div className="condition-picker__options">
        {CONDITIONS.map((condition) => (
          <TagChoice
            key={condition}
            variant="condition"
            selected={condition === selected}
            onClick={() => setSelected(condition)}
          >
            {condition}
          </TagChoice>
        ))}
      </div>
    </fieldset>
  )
}

export default ConditionPicker