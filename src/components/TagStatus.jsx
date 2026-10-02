import './TagStatus.css'

const STATUS_VARIANTS = {
  Disponible: 'available',
  Alquilado: 'rented',
  Reservado: 'reserved',
}

function TagStatus({ status }) {
  return (
    <span className={`tag-status tag-status--${STATUS_VARIANTS[status]}`}>
      {status}
    </span>
  )
}

export default TagStatus