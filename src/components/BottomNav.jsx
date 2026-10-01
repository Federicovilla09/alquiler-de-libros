import './BottomNav.css'

const items = [
  { id: 'biblioteca', label: 'Biblioteca', icon: '/icons/book-library.svg' },
  { id: 'cargar', label: 'Cargar libro', icon: '/icons/add-circle.svg' },
  { id: 'seguimiento', label: 'Seguimiento', icon: '/icons/calendar.svg' },
]

function BottomNav() {
  const active = 'biblioteca'

  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {items.map((item) => {
        const isActive = item.id === active

        return (
          <button
            key={item.id}
            className={isActive ? 'bottom-nav__item bottom-nav__item--active' : 'bottom-nav__item'}
            aria-label={item.label}
            aria-current={isActive ? 'page' : undefined}
          >
            <img className="bottom-nav__icon" src={item.icon} alt="" />
            {isActive && <span className="bottom-nav__label">{item.label}</span>}
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav