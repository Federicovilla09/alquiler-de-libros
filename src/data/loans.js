// Alquileres y reservas en curso, para la pantalla de Seguimiento.
// En la Etapa 6, el estado, el progreso y el texto se van a calcular
// a partir de las fechas reales.

export const loans = [
  { id: 1, bookId: 4, state: 'overdue', who: 'Con Lucía Gómez', progress: 1, status: '2 días de atraso · venció el 28/09' },
  { id: 2, bookId: 1, state: 'due-today', who: 'Con Mariano Pérez', progress: 1, status: 'Vuelve hoy · día 15 de 15' },
  { id: 3, bookId: 2, state: 'reserved', who: 'Para Juan Díaz', progress: 0.8, status: 'Se libera hoy si no se confirma' },
  { id: 4, bookId: 5, state: 'reserved', who: 'Para Carla Méndez', progress: 0.8, status: 'Se libera hoy si no se confirma' },
  { id: 5, bookId: 7, state: 'on-track', who: 'Con Sofía Ruiz', progress: 0.4, status: 'Faltan 18 días · vuelve el 18/10' },
]