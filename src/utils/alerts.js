// Arma los avisos de "Para hoy" a partir de la lista de Seguimiento
export function getAlerts(loans) {
  const reservations = loans.filter((l) => l.state === 'reserved' && l.expiresToday).length
  const dueToday = loans.filter((l) => l.state === 'due-today').length
  const overdue = loans.filter((l) => l.state === 'overdue').length

  const alerts = []

  if (reservations > 0) {
    alerts.push({
      id: 'reservation',
      type: 'reservation',
      count: reservations,
      message: reservations === 1 ? '1 reserva se libera hoy' : `${reservations} reservas se liberan hoy`,
    })
  }

  if (dueToday > 0) {
    alerts.push({
      id: 'return',
      type: 'return',
      count: dueToday,
      message: dueToday === 1 ? '1 devolución vence hoy' : `${dueToday} devoluciones vencen hoy`,
    })
  }

  if (overdue > 0) {
    alerts.push({
      id: 'overdue',
      type: 'overdue',
      count: overdue,
      message: overdue === 1 ? '1 devolución atrasada' : `${overdue} devoluciones atrasadas`,
    })
  }

  return alerts
}