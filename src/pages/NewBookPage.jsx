import { useState } from 'react'
import './BookFormPage.css'
import NavigationHeader from '../components/NavigationHeader'
import CoverUpload from '../components/CoverUpload'
import TextField from '../components/TextField'
import TagFilter from '../components/TagFilter'
import TagChoice from '../components/TagChoice'
import StarRating from '../components/StarRating'
import SwitchField from '../components/SwitchField'
import SeriesField from '../components/SeriesField'
import SelectField from '../components/SelectField'
import ConditionPicker from '../components/ConditionPicker'
import NumberStepper from '../components/NumberStepper'
import Button from '../components/Button'
import { genres } from '../data/genres'
import { tropes } from '../data/tropes'

const BOOK_GENRES = genres.filter((g) => g !== 'Todos')
const AUDIENCES = ['Todo público', '+15', '+18', '+21']
const SERIES = ['Cincuenta sombras', 'Alas de sangre', 'Una corte de rosas y espinas']

function NewBookPage() {
  const [genre, setGenre] = useState('Romance')
  const [selectedTropes, setSelectedTropes] = useState([])

  function toggleTrope(trope) {
    if (selectedTropes.includes(trope)) {
      setSelectedTropes(selectedTropes.filter((t) => t !== trope))
    } else {
      setSelectedTropes([...selectedTropes, trope])
    }
  }

  return (
    <main className="app">
      <NavigationHeader title="Agregar nuevo libro" />

      <div className="content book-form">
        <CoverUpload />

        <div className="book-form__group">
          <TextField label="Título" placeholder="Título del libro" />
          <TextField label="Autor/a" placeholder="Nombre del autor/a" />
        </div>

        <fieldset className="book-form__choices">
          <legend className="book-form__label">Género</legend>
          <div className="book-form__scroll">
            {BOOK_GENRES.map((g) => (
              <TagFilter key={g} selected={g === genre} onClick={() => setGenre(g)}>
                {g}
              </TagFilter>
            ))}
          </div>
        </fieldset>

        <fieldset className="book-form__choices">
          <legend className="book-form__label">Tropes</legend>
          <div className="book-form__wrap">
            {tropes.map((t) => (
              <TagChoice key={t} selected={selectedTropes.includes(t)} onClick={() => toggleTrope(t)}>
                {t}
              </TagChoice>
            ))}
          </div>
        </fieldset>

        <TextField label="Sinopsis" placeholder="Breve sinopsis del libro" multiline />
        <TextField label="Frase destacada (Opcional)" placeholder="“Una cita memorable del libro...”" />
        <StarRating label="Tu puntaje" />
        <SwitchField label="Recomendar en el catálogo" helper="Aparece en «Recomendados por Mica»" />
        <SeriesField series={SERIES} />
        <SelectField label="Tipo de público" options={AUDIENCES} defaultValue="Todo público" />

        <div className="book-form__prices">
          <div className="book-form__row">
            <TextField label="Precio 15 días" placeholder="$0" inputMode="numeric" />
            <TextField label="Precio 30 días" placeholder="$0" inputMode="numeric" />
          </div>
          <p className="book-form__note">El precio de 15 días es el que se muestra en el catálogo.</p>
        </div>

        <ConditionPicker label="Condición del libro" />

        <div className="book-form__copies">
          <p className="book-form__label">Cantidad de ejemplares</p>
          <NumberStepper label="Cantidad de ejemplares" />
          <p className="book-form__note">Podés agregar más copias después desde la ficha del título.</p>
        </div>

        <Button>Sumar a la biblioteca</Button>
      </div>
    </main>
  )
}

export default NewBookPage