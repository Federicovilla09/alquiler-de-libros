import './BottomNav.css'
import Icon from './Icon'

const items = [
  { id: 'biblioteca', label: 'Biblioteca', icon: 'book-library' },
  { id: 'cargar', label: 'Cargar libro', icon: 'add-circle' },
  { id: 'seguimiento', label: 'Seguimiento', icon: 'calendar' },
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
            <Icon name={item.icon} size={20} strokeWidth={2} />
            {isActive && <span className="bottom-nav__label">{item.label}</span>}
          </button>
        )
      })}
    </nav>
  )
}

export default BottomNav