import { useState } from 'react'
import './SeriesField.css'
import SwitchField from './SwitchField'
import SelectField from './SelectField'
import TextField from './TextField'
import NumberStepper from './NumberStepper'

const NEW_SERIES = '+ Crear nueva serie'

function SeriesField({ series = [], defaultChecked = false }) {
  const [selected, setSelected] = useState('')
  const isNew = selected === NEW_SERIES

  return (
    <SwitchField
      label="Es parte de una serie"
      helper="Se agrupa con sus otros tomos en el catálogo"
      defaultChecked={defaultChecked}
    >
      <SelectField
        label="¿De qué serie?"
        placeholder="Elegí una serie"
        options={[...series, NEW_SERIES]}
        onChange={setSelected}
      />

      {isNew && (
        <TextField label="Nombre de la serie" placeholder="Ej: Una corte de rosas y espinas" />
      )}

      <p className="series-field__hint">
        {isNew
          ? 'La serie se crea cuando guardás el libro.'
          : 'Elegí una serie que ya cargaste o creá una nueva.'}
      </p>

      <div className="series-field__tomo">
        <span className="series-field__tomo-label">Tomo</span>
        <NumberStepper label="Tomo" />
      </div>
    </SwitchField>
  )
}

export default SeriesField