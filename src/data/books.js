// Datos de prueba de la biblioteca.
// En la Etapa 6 esta lista va a venir de la base de datos (Supabase).
//
// Cada libro tiene una lista de ejemplares (copies). El estado de cada
// ejemplar es 'available', 'reserved' o 'rented', y el estado del libro
// en la Home se calcula a partir de sus ejemplares con getBookStatus().

export const books = [
  {
    id: 1,
    title: 'Alas de sangre',
    author: 'Rebecca Yarros',
    coverColor: '#7a2e2e',
    genre: 'Romantasy',
    tropes: ['Enemies to Lovers', 'Slow Burn'],
    rating: 5,
    price15: 2500,
    price30: 4500,
    synopsis: 'Una joven entra a una academia de jinetes de dragones donde cada día puede ser el último.',
    quote: null,
    copies: [
      { number: 1, condition: 'Casi nuevo', state: 'rented', borrower: 'Mariano Pérez', returnDate: '05/10/2026' },
    ],
  },
  {
    id: 2,
    title: 'Hábitos atómicos',
    author: 'James Clear',
    coverColor: '#e8c547',
    genre: 'Autoayuda',
    tropes: [],
    rating: 4,
    price15: 2000,
    price30: 3500,
    synopsis: 'Cómo pequeños cambios diarios pueden sumar grandes resultados con el tiempo.',
    quote: null,
    copies: [
      { number: 1, condition: 'Nuevo', state: 'reserved', borrower: 'Juan Díaz' },
    ],
  },
  {
    id: 3,
    title: 'Culpa mía',
    author: 'Mercedes Ron',
    coverColor: '#c98b9b',
    genre: 'Romance',
    tropes: ['Forbidden Love'],
    rating: 4,
    price15: 2000,
    price30: 3500,
    synopsis: 'Una mudanza obligada la lleva a convivir con alguien que no esperaba.',
    quote: null,
    copies: [{ number: 1, condition: 'Subrayado', state: 'available' }],
  },
  {
    id: 4,
    title: 'Una corte de rosas y espinas',
    author: 'Sarah J. Maas',
    coverColor: '#2f4a3a',
    genre: 'Romantasy',
    tropes: ['Fae', 'Enemies to Lovers'],
    rating: 5,
    price15: 2500,
    price30: 4500,
    synopsis: 'Una cazadora es llevada a un mundo de hadas donde nada es lo que parece.',
    quote: null,
    copies: [
      { number: 1, condition: 'Nuevo', state: 'rented', borrower: 'Lucía Gómez', returnDate: '28/09/2026' },
    ],
  },
  {
    id: 5,
    title: 'Romper el círculo',
    author: 'Colleen Hoover',
    coverColor: '#e7a6a1',
    genre: 'Romance',
    tropes: ['Segunda oportunidad'],
    rating: 5,
    price15: 2000,
    price30: 3500,
    synopsis: 'Una historia sobre el amor, las decisiones difíciles y el valor de empezar de nuevo.',
    quote: null,
    copies: [
      { number: 1, condition: 'Casi nuevo', state: 'reserved', borrower: 'Sofía Ruiz' },
    ],
  },
  {
    id: 6,
    title: 'Asesinato para principiantes',
    author: 'Holly Jackson',
    coverColor: '#2c3e66',
    genre: 'Policial',
    tropes: [],
    rating: 4,
    price15: 2000,
    price30: 3500,
    synopsis: 'Un trabajo escolar se convierte en la investigación de un caso que todos daban por cerrado.',
    quote: null,
    copies: [{ number: 1, condition: 'Nuevo', state: 'available' }],
  },
  {
    id: 7,
    title: 'Todo lo que nunca fuimos',
    author: 'Alice Kellen',
    coverColor: '#9fb8c8',
    genre: 'Romance',
    tropes: ['Slow Burn'],
    rating: 4,
    price15: 2000,
    price30: 3500,
    synopsis: 'Después de una pérdida, una joven intenta volver a encontrarse a sí misma.',
    quote: null,
    copies: [
      { number: 1, condition: 'Notas', state: 'rented', borrower: 'Sofía Ruiz', returnDate: '18/10/2026' },
    ],
  },
  {
    id: 8,
    title: 'El príncipe cruel',
    author: 'Holly Black',
    coverColor: '#1f1b2e',
    genre: 'Fantasía',
    tropes: ['Fae', 'Enemies to Lovers'],
    rating: 5,
    price15: 2500,
    price30: 4500,
    synopsis: 'Una mortal crece en la corte de las hadas y busca su lugar en un mundo que la rechaza.',
    quote: null,
    copies: [{ number: 1, condition: 'Etiquetas', state: 'available' }],
  },
  {
    id: 9,
    title: 'Boulevard',
    author: 'Flor M. Salvador',
    coverColor: '#b9a7d6',
    genre: 'Romance',
    tropes: ['Primer amor'],
    rating: 3,
    price15: 1500,
    price30: 2500,
    synopsis: 'Dos adolescentes muy distintos se cruzan y su historia cambia a los dos.',
    quote: null,
    copies: [{ number: 1, condition: 'Casi nuevo', state: 'available' }],
  },
  {
    id: 10,
    title: 'Cincuenta Sombras de Grey',
    author: 'E. L. James',
    coverColor: '#3a3a3a',
    genre: 'Romance',
    tropes: ['Romance', 'Dark Romance'],
    rating: 4,
    price15: 2000,
    price30: 4000,
    synopsis:
      'Narra la intensa y compleja relación entre Anastasia Steele, una inocente estudiante de literatura, y Christian Grey, un exitoso y enigmático multimillonario.',
    quote: 'Tengo reglas. Si las sigues te compensaré, sino te castigaré',
    copies: [
      { number: 1, condition: 'Nuevo', state: 'available' },
      { number: 2, condition: 'Casi nuevo', state: 'available' },
    ],
    history: [
      { id: 1, who: 'Federico Villanueva', price: 2000, copy: 1, days: 15, from: '30/09/2026', to: '15/10/2026', status: 'current' },
      { id: 2, who: 'Sofía Ruiz', price: 4000, copy: 1, days: 30, from: '12/08/2026', to: '11/09/2026', status: 'on-time' },
      { id: 3, who: 'Lucía Gómez', price: 2000, copy: 1, days: 15, from: '20/07/2026', to: '04/08/2026', status: 'on-time' },
    ],
  },
]

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

// Busca un libro por su id (que llega como texto desde la dirección)
export function findBook(id) {
  return books.find((book) => book.id === Number(id))
}