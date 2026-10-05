import { NavLink } from 'react-router'
import './BottomNav.css'
import Icon from './Icon'

const items = [
  { to: '/', label: 'Biblioteca', icon: 'book-library' },
  { to: '/libros/nuevo', label: 'Cargar libro', icon: 'add-circle' },
  { to: '/seguimiento', label: 'Seguimiento', icon: 'calendar' },
]

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          aria-label={item.label}
          className={({ isActive }) =>
            isActive ? 'bottom-nav__item bottom-nav__item--active' : 'bottom-nav__item'
          }
        >
          {({ isActive }) => (
            <>
              <Icon name={item.icon} size={20} strokeWidth={2} />
              {isActive && <span className="bottom-nav__label">{item.label}</span>}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav