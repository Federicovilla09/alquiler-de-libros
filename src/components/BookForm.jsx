import { useEffect, useState } from 'react'
import './BookForm.css'
import CoverUpload from './CoverUpload'
import TextField from './TextField'
import TagFilter from './TagFilter'
import TagChoice from './TagChoice'
import StarRating from './StarRating'
import SwitchField from './SwitchField'
import SeriesField, { NEW_SERIES } from './SeriesField'
import SelectField from './SelectField'
import ConditionPicker from './ConditionPicker'
import NumberStepper from './NumberStepper'
import Button from './Button'
import { genres } from '../data/genres'
import { tropes } from '../data/tropes'
import InlineNotice from './InlineNotice'

const BOOK_GENRES = genres.filter((g) => g !== 'Todos')
const AUDIENCES = ['Todo público', '+15', '+18', '+21']
const SERIES = ['Cincuenta sombras', 'Alas de sangre', 'Una corte de rosas y espinas']

// "$2.000" → 2000
function parsePrice(text) {
  return Number(String(text ?? '').replace(/\D/g, ''))
}

function BookForm({ book, submitLabel, onSubmit, duplicate, onDuplicateAction, onIdentityChange }) {
  const [genre, setGenre] = useState(book?.genre ?? 'Romance')
  const [selectedTropes, setSelectedTropes] = useState(book?.tropes ?? [])
  const [coverFile, setCoverFile] = useState(null)
  const [errors, setErrors] = useState({})

  // Al aparecer errores o el aviso de duplicado, llevar la vista hasta ahí
  useEffect(() => {
    const first = document.querySelector('[aria-invalid="true"], .cover-upload--error, .inline-notice')
    if (!first) return
    first.scrollIntoView({ behavior: 'smooth', block: 'center' })
    if (first.matches('input, textarea')) first.focus({ preventScroll: true })
  }, [errors, duplicate])

  function clearError(field) {
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
  }

  function toggleTrope(trope) {
    if (selectedTropes.includes(trope)) {
      setSelectedTropes(selectedTropes.filter((t) => t !== trope))
    } else {
      setSelectedTropes([...selectedTropes, trope])
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const seriesChoice = data.get('series') ?? ''
    const values = {
      title: data.get('title').trim(),
      author: data.get('author').trim(),
      genre,
      tropes: selectedTropes,
      synopsis: data.get('synopsis').trim(),
      quote: data.get('quote').trim() || null,
      rating: Number(data.get('rating')),
      recommended: data.get('recommended') === 'on',
      series:
        data.get('inSeries') === 'on'
          ? seriesChoice === NEW_SERIES
            ? (data.get('newSeries') ?? '').trim()
            : seriesChoice
          : null,
      volume: Number(data.get('volume')) || 1,
      audience: data.get('audience'),
      price15: parsePrice(data.get('price15')),
      price30: parsePrice(data.get('price30')),
      condition: data.get('condition'),
      copies: Number(data.get('copies')) || 1,
    }

    // Edición: la condición de cada ejemplar
    if (book) {
      values.conditions = {}
      for (const copy of book.copies) {
        values.conditions[copy.number] = data.get(`condition-${copy.number}`)
      }
    }

    // Validación de los campos obligatorios
    const found = {}
    if (!book && !coverFile) found.cover = 'La portada es obligatoria. Subí una foto para continuar.'
    if (!values.title) found.title = 'Ingresá el título del libro'
    if (!values.author) found.author = 'Ingresá el autor/a'
    if (!values.price15) found.price15 = 'Ingresá el precio'
    if (!values.price30) found.price30 = 'Ingresá el precio'

    if (Object.keys(found).length > 0) {
      setErrors(found)
      return
    }

    if (onSubmit) onSubmit({ ...values, coverFile })
  }

  return (
    <form className="content book-form" onSubmit={handleSubmit} noValidate>
      <CoverUpload
        error={errors.cover}
        onChange={(file) => {
          setCoverFile(file)
          clearError('cover')
        }}
      />

            <div className="book-form__group">
        <TextField
          label="Título"
          name="title"
          placeholder="Título del libro"
          defaultValue={book?.title}
          error={errors.title}
          onChange={() => {
            clearError('title')
            if (onIdentityChange) onIdentityChange()
          }}
        />
        <TextField
          label="Autor/a"
          name="author"
          placeholder="Nombre del autor/a"
          defaultValue={book?.author}
          error={errors.author}
          onChange={() => {
            clearError('author')
            if (onIdentityChange) onIdentityChange()
          }}
        />
      </div>

      {duplicate && (
        <InlineNotice
          title="Ya tenés este libro en tu biblioteca"
          actionLabel="Agregar un ejemplar"
          onAction={onDuplicateAction}
        >
          {duplicate.title} · {duplicate.author} · {duplicate.copies.length}{' '}
          {duplicate.copies.length === 1 ? 'ejemplar' : 'ejemplares'}. Podés sumar otra copia en lugar
          de crear un libro nuevo.
        </InlineNotice>
      )}

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
        name="synopsis"
        placeholder="Breve sinopsis del libro"
        multiline
        defaultValue={book?.synopsis}
      />
      <TextField
        label="Frase destacada (Opcional)"
        name="quote"
        placeholder="“Una cita memorable del libro...”"
        defaultValue={book?.quote ?? undefined}
      />
      <StarRating label="Tu puntaje" name="rating" defaultValue={book?.rating ?? 0} />
      <SwitchField
        label="Recomendar en el catálogo"
        helper="Aparece en «Recomendados por Mica»"
        name="recommended"
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
        name="audience"
        options={AUDIENCES}
        defaultValue={book?.audience ?? 'Todo público'}
      />

      <div className="book-form__prices">
        <div className="book-form__row">
          <TextField
            label="Precio 15 días"
            name="price15"
            placeholder="$0"
            inputMode="numeric"
            defaultValue={book?.price15}
            error={errors.price15}
            onChange={() => clearError('price15')}
          />
          <TextField
            label="Precio 30 días"
            name="price30"
            placeholder="$0"
            inputMode="numeric"
            defaultValue={book?.price30}
            error={errors.price30}
            onChange={() => clearError('price30')}
          />
        </div>
        <p className="book-form__note">El precio de 15 días es el que se muestra en el catálogo.</p>
      </div>

      {book ? (
        <div className="book-form__conditions" role="group" aria-labelledby="conditions-title">
          <p id="conditions-title" className="book-form__label">
            Condición de los ejemplares
          </p>
          {book.copies.map((copy) => (
            <ConditionPicker
              key={copy.number}
              label={`Ejemplar ${copy.number}`}
              name={`condition-${copy.number}`}
              defaultValue={copy.condition}
              sub
            />
          ))}
          <p className="book-form__note">
            Actualizala cuando un ejemplar vuelva con marcas, subrayados o etiquetas.
          </p>
        </div>
      ) : (
        <>
          <ConditionPicker label="Condición del libro" name="condition" />
          <div className="book-form__copies">
            <p className="book-form__label">Cantidad de ejemplares</p>
            <NumberStepper label="Cantidad de ejemplares" name="copies" />
            <p className="book-form__note">Podés agregar más copias después desde la ficha del título.</p>
          </div>
        </>
      )}

      <Button type="submit">{submitLabel}</Button>
    </form>
  )
}

export default BookForm