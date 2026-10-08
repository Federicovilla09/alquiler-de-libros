// Datos de prueba de la biblioteca.
// En la Etapa 6 esta lista va a venir de la base de datos (Supabase).
//
// Cada libro tiene una lista de ejemplares (copies). El estado de cada
// ejemplar es 'available', 'reserved' o 'rented', y el estado del libro
// en la Home se calcula a partir de sus ejemplares con getBookStatus().


// Estado del libro para la Home, a partir de sus ejemplares:
// si al menos uno está disponible, el libro está disponible;
// si no, pero alguno está reservado, está reservado;
// si no, está alquilado.
export function getBookStatus(book) {
  if (book.copies.some((copy) => copy.state === 'available')) return 'Disponible'
  if (book.copies.some((copy) => copy.state === 'reserved')) return 'Reservado'
  return 'Alquilado'
}

// 2000 → "$2.000"
export function formatPrice(amount) {
  return '$' + amount.toLocaleString('es-AR')
}
