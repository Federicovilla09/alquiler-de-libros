import { useState } from 'react'
import './BookForm.css'
import CoverUpload from './CoverUpload'
import TextField from './TextField'
import TagFilter from './TagFilter'
import TagChoice from './TagChoice'
import StarRating from './StarRating'
import SwitchField from './SwitchField'
import SeriesField from './SeriesField'
import SelectField from './SelectField'
import ConditionPicker from './ConditionPicker'
import NumberStepper from './NumberStepper'
import Button from './Button'
import { genres } from '../data/genres'
import { tropes } from '../data/tropes'

const BOOK_GENRES = genres.filter((g) => g !== 'Todos')
const AUDIENCES = ['Todo público', '+15', '+18', '+21']
const SERIES = ['Cincuenta sombras', 'Alas de sangre', 'Una corte de rosas y espinas']

function BookForm({ book, submitLabel }) {
  const [genre, setGenre] = useState(book?.genre ?? 'Romance')
  const [selectedTropes, setSelectedTropes] = useState(book?.tropes ?? [])

  function toggleTrope(trope) {
    if (selectedTropes.includes(trope)) {
      setSelectedTropes(selectedTropes.filter((t) => t !== trope))
    } else {
      setSelectedTropes([...selectedTropes, trope])
    }
  }

  return (
    <div className="content book-form">
      <CoverUpload />

      <div className="book-form__group">
        <TextField label="Título" placeholder="Título del libro" defaultValue={book?.title} />
        <TextField label="Autor/a" placeholder="Nombre del autor/a" defaultValue={book?.author} />
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

      <TextField
        label="Sinopsis"
        placeholder="Breve sinopsis del libro"
        multiline
        defaultValue={book?.synopsis}
      />
      <TextField
        label="Frase destacada (Opcional)"
        placeholder="“Una cita memorable del libro...”"
        defaultValue={book?.quote ?? undefined}
      />
      <StarRating label="Tu puntaje" defaultValue={book?.rating ?? 0} />
      <SwitchField
        label="Recomendar en el catálogo"
        helper="Aparece en «Recomendados por Mica»"
        defaultChecked={book?.recommended ?? false}
      />
      <SeriesField
        series={SERIES}
        defaultChecked={Boolean(book?.series)}
        defaultSeries={book?.series}
        defaultVolume={book?.volume}
      />
      <SelectField
        label="Tipo de público"
        options={AUDIENCES}
        defaultValue={book?.audience ?? 'Todo público'}
      />

      <div className="book-form__prices">
        <div className="book-form__row">
          <TextField label="Precio 15 días" placeholder="$0" inputMode="numeric" defaultValue={book?.price15} />
          <TextField label="Precio 30 días" placeholder="$0" inputMode="numeric" defaultValue={book?.price30} />
        </div>
        <p className="book-form__note">El precio de 15 días es el que se muestra en el catálogo.</p>
      </div>

      {book ? (
        /* Edición: una condición por ejemplar */
        <div className="book-form__conditions" role="group" aria-labelledby="conditions-title">
          <p id="conditions-title" className="book-form__label">
            Condición de los ejemplares
          </p>
          {book.copies.map((copy) => (
            <ConditionPicker
              key={copy.number}
              label={`Ejemplar ${copy.number}`}
              defaultValue={copy.condition}
              sub
            />
          ))}
          <p className="book-form__note">
            Actualizala cuando un ejemplar vuelva con marcas, subrayados o etiquetas.
          </p>
        </div>
      ) : (
        /* Alta: una condición para todos los ejemplares nuevos, y la cantidad */
        <>
          <ConditionPicker label="Condición del libro" />
          <div className="book-form__copies">
            <p className="book-form__label">Cantidad de ejemplares</p>
            <NumberStepper label="Cantidad de ejemplares" />
            <p className="book-form__note">Podés agregar más copias después desde la ficha del título.</p>
          </div>
        </>
      )}

      <Button>{submitLabel}</Button>
    </div>
  )
}

export default BookForm