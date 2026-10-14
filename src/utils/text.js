// "Fantasía" → "fantasia", para comparar sin importar tildes ni mayúsculas
export function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

// "E. L. James" → "eljames", para comparar sin espacios ni puntuación
export function compactKey(text) {
  return normalize(text).replace(/[^a-z0-9]/g, '')
}

// Saca las comillas que haya al principio o al final de un texto,
// de cualquier tipo: " “ ” « » ' ‘ ’
export function stripQuotes(text) {
  return (text ?? '')
    .trim()
    .replace(/^["'“”«»‘’]+|["'“”«»‘’]+$/g, '')
    .trim()
}