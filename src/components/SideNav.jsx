import { NavLink } from 'react-router'
import './SideNav.css'
import Icon from './Icon'
import AccountMenu from './AccountMenu'

const ITEMS = [
  { to: '/', label: 'Biblioteca', icon: 'book-library', end: true },
  { to: '/libros/nuevo', label: 'Agregar libro', icon: 'add-circle' },
  { to: '/seguimiento', label: 'Seguimiento', icon: 'calendar' },
]

function SideNav() {
  return (
    <aside className="side-nav">
      <img className="side-nav__logo" src="/brand/logo.svg" alt="Biblioteca de Letrita" width="132" height="104" />

      <nav aria-label="Principal">
        <ul className="side-nav__list">
          {ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'side-nav__item side-nav__item--active' : 'side-nav__item')}
              >
                <Icon name={item.icon} size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="side-nav__account">
        <AccountMenu variant="sidebar" />
      </div>
    </aside>
  )
}

export default SideNav