// "Fantasía" → "fantasia", para comparar sin importar tildes ni mayúsculas
export function normalize(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim()
}

// "E. L. James" → "eljames", para comparar sin espacios ni puntuación
export function compactKey(text) {
  return normalize(text).replace(/[^a-z0-9]/g, '')
}