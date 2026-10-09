import { supabase } from './supabase'
import { dateToISO, fromISO, today } from '../utils/dates'
import { resizeImage } from '../utils/images'

// ─── Lectura ───

function mapCopy(row) {
  return {
    id: row.id,
    number: row.number,
    condition: row.condition,
    state: row.state,
    borrower: row.borrower ?? undefined,
    reservedAt: row.reserved_at ? fromISO(row.reserved_at) : undefined,
    returnDate: row.return_date ? fromISO(row.return_date) : undefined,
    days: row.days ?? undefined,
  }
}

function mapRental(row) {
  return {
    id: row.id,
    who: row.who,
    price: row.price,
    copy: row.copy_number,
    days: row.days,
    from: fromISO(row.start_date),
    to: fromISO(row.end_date),
    status: row.status,
    lateDays: row.late_days,
    renewed: row.renewed,
  }
}

function mapBook(row) {
  return {
    id: row.id,
    title: row.title,
    author: row.author,
    genre: row.genre,
    tropes: row.tropes ?? [],
    synopsis: row.synopsis ?? '',
    quote: row.quote,
    rating: row.rating,
    recommended: row.recommended,
    series: row.series,
    volume: row.volume,
    audience: row.audience,
    price15: row.price15,
    price30: row.price30,
    coverUrl: row.cover_url,
    coverColor: row.cover_color ?? 'var(--blush-3)',
    copies: row.copies.map(mapCopy).sort((a, b) => a.number - b.number),
    history: row.rentals.map(mapRental).sort((a, b) => b.id - a.id),
  }
}

export async function fetchBooks() {
  const { data, error } = await supabase
    .from('books')
    .select('*, copies(*), rentals(*)')
    .order('created_at', { ascending: false })
    .order('id', { ascending: true })

  return { data: data ? data.map(mapBook) : null, error }
}

// ─── Ejemplares ───

async function updateCopy(bookId, number, changes) {
  const { error } = await supabase
    .from('copies')
    .update(changes)
    .eq('book_id', bookId)
    .eq('number', number)
  return error
}

export function reserveCopy(bookId, number, borrower) {
  return updateCopy(bookId, number, {
    state: 'reserved',
    borrower,
    reserved_at: dateToISO(today()),
  })
}

export function cancelReservation(bookId, number) {
  return updateCopy(bookId, number, {
    state: 'available',
    borrower: null,
    reserved_at: null,
  })
}

export async function addCopy(bookId, number, condition) {
  const { error } = await supabase.from('copies').insert({ book_id: bookId, number, condition })
  return error
}

// ─── Alquileres ───

async function insertRental(bookId, number, rental, renewed = false) {
  const { error } = await supabase.from('rentals').insert({
    book_id: bookId,
    copy_number: number,
    who: rental.borrower,
    price: rental.price,
    days: rental.days,
    start_date: dateToISO(rental.start),
    end_date: dateToISO(rental.end),
    status: 'current',
    renewed,
  })
  return error
}

// Cierra el alquiler en curso de un ejemplar, a tiempo o con atraso
async function closeCurrentRental(bookId, number, lateDays) {
  const { error } = await supabase
    .from('rentals')
    .update({ status: lateDays > 0 ? 'late' : 'on-time', late_days: lateDays })
    .eq('book_id', bookId)
    .eq('copy_number', number)
    .eq('status', 'current')
  return error
}

export async function rentCopy(bookId, number, rental) {
  const copyError = await updateCopy(bookId, number, {
    state: 'rented',
    reserved_at: null,
    days: rental.days,
    return_date: dateToISO(rental.end),
  })
  if (copyError) return copyError

  return insertRental(bookId, number, rental)
}

export async function renewCopy(bookId, number, rental) {
  const closeError = await closeCurrentRental(bookId, number, rental.lateDays)
  if (closeError) return closeError

  const copyError = await updateCopy(bookId, number, {
    days: rental.days,
    return_date: dateToISO(rental.end),
  })
  if (copyError) return copyError

  return insertRental(bookId, number, rental, true)
}

export async function returnCopy(bookId, number, lateDays) {
  const closeError = await closeCurrentRental(bookId, number, lateDays)
  if (closeError) return closeError

  return updateCopy(bookId, number, {
    state: 'available',
    borrower: null,
    return_date: null,
    days: null,
  })
}

// ─── Portadas ───

async function uploadCover(bookId, file) {
  const image = await resizeImage(file)
  const path = `${bookId}/${Date.now()}.jpg`

  const { error } = await supabase.storage
    .from('covers')
    .upload(path, image, { contentType: 'image/jpeg' })
  if (error) return error

  const { data } = supabase.storage.from('covers').getPublicUrl(path)

  const { error: updateError } = await supabase
    .from('books')
    .update({ cover_url: data.publicUrl })
    .eq('id', bookId)
  return updateError
}

// ─── Libros ───

// Los datos del formulario → las columnas de la tabla books
function toBookColumns(values) {
  return {
    title: values.title,
    author: values.author,
    genre: values.genre,
    tropes: values.tropes,
    synopsis: values.synopsis,
    quote: values.quote,
    rating: values.rating,
    recommended: values.recommended,
    series: values.series,
    volume: values.series ? values.volume : null,
    audience: values.audience,
    price15: values.price15,
    price30: values.price30,
  }
}

export async function addBook(values) {
  const { data, error } = await supabase
    .from('books')
    .insert(toBookColumns(values))
    .select('id')
    .single()
  if (error) return { error }

  const copies = Array.from({ length: values.copies }, (_, i) => ({
    book_id: data.id,
    number: i + 1,
    condition: values.condition,
  }))
  const { error: copiesError } = await supabase.from('copies').insert(copies)

  if (copiesError) return { id: data.id, error: copiesError }

  if (values.coverFile) {
    const coverError = await uploadCover(data.id, values.coverFile)
    if (coverError) return { id: data.id, error: coverError }
  }

  return { id: data.id, error: null }
}

export async function editBook(bookId, values) {
  const { error } = await supabase.from('books').update(toBookColumns(values)).eq('id', bookId)
  if (error) return error

  if (values.coverFile) {
    const coverError = await uploadCover(bookId, values.coverFile)
    if (coverError) return coverError
  }

  // La condición de cada ejemplar
  for (const [number, condition] of Object.entries(values.conditions ?? {})) {
    const copyError = await updateCopy(bookId, Number(number), { condition })
    if (copyError) return copyError
  }

  return null
}