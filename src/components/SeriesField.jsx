import { useState } from 'react'
import './SeriesField.css'
import SwitchField from './SwitchField'
import SelectField from './SelectField'
import TextField from './TextField'
import NumberStepper from './NumberStepper'

export const NEW_SERIES = '+ Crear nueva serie'

function SeriesField({ series = [], defaultChecked = false, defaultSeries = '', defaultVolume = 1 }) {
  const [selected, setSelected] = useState(defaultSeries)
  const isNew = selected === NEW_SERIES

  return (
    <SwitchField
      label="Es parte de una serie"
      helper="Se agrupa con sus otros tomos en el catálogo"
      defaultChecked={defaultChecked}
      name="inSeries"
    >
      <SelectField
        label="¿De qué serie?"
        placeholder="Elegí una serie"
        options={[...series, NEW_SERIES]}
        defaultValue={defaultSeries}
        onChange={setSelected}
        name="series"
      />

      {isNew && (
        <TextField name="newSeries" label="Nombre de la serie" placeholder="Ej: Una corte de rosas y espinas" />
      )}

      <p className="series-field__hint">
        {isNew
          ? 'La serie se crea cuando guardás el libro.'
          : 'Elegí una serie que ya cargaste o creá una nueva.'}
      </p>

      <div className="series-field__tomo">
        <span className="series-field__tomo-label">Tomo</span>
        <NumberStepper name="volume" label="Tomo" defaultValue={defaultVolume} />
      </div>
    </SwitchField>
  )
}

export default SeriesField