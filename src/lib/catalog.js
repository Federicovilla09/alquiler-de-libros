import { supabase } from './supabase'
import { CONDITIONS } from '../data/conditions'

// La mejor condición de una lista, según el orden de CONDITIONS
function bestCondition(conditions) {
  return CONDITIONS.find((condition) => conditions.includes(condition)) ?? null
}

// Una fila de la vista catalog_books → un libro del catálogo
function mapCatalogBook(row) {
  const availableConditions = row.available_conditions ?? []

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
    createdAt: row.created_at,
    available: availableConditions.length > 0,
    condition: bestCondition(availableConditions),
  }
}

export async function fetchCatalog() {
  const { data, error } = await supabase
    .from('catalog_books')
    .select('*')
    .order('created_at', { ascending: false })
    .order('id', { ascending: true })

  return { data: data ? data.map(mapCatalogBook) : null, error }
}