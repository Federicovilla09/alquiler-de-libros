// Hoy, a las 00:00, para comparar días sin que influya la hora
export function today() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

// Una fecha más una cantidad de días
export function addDays(date, days) {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// Fecha → "22/10/2026"
export function formatDate(date) {
  return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

// "22/10/2026" → fecha
export function parseDate(text) {
  const [day, month, year] = text.split('/').map(Number)
  return new Date(year, month - 1, day)
}

// Cuántos días hay entre dos fechas (negativo si la segunda es anterior)
export function daysBetween(from, to) {
  return Math.round((to - from) / 86400000)
}

// "2026-10-05" (base de datos) → "05/10/2026" (app)
export function fromISO(text) {
  const [year, month, day] = text.split('-')
  return `${day}/${month}/${year}`
}

// "05/10/2026" (app) → "2026-10-05" (base de datos)
export function toISO(text) {
  const [day, month, year] = text.split('/')
  return `${year}-${month}-${day}`
}

// Fecha → "2026-10-05", para guardarla en la base
export function dateToISO(date) {
  return toISO(formatDate(date))
}