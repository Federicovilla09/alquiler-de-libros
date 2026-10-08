import { supabase } from './supabase'
import { fromISO } from '../utils/dates'

// Una fila de la base → un ejemplar como lo usa la app
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

// Una fila de la base → un alquiler del historial
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

// Una fila de la base, con sus ejemplares y alquileres → un libro
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