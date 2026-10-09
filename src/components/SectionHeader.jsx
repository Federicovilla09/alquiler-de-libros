import { Link } from 'react-router'
import './SectionHeader.css'
import Icon from './Icon'

function SectionHeader({ title, subtitle, to }) {
  return (
    <div className="section-header">
      <div className="section-header__titles">
        <h2 className="section-header__title">{title}</h2>
        {subtitle && <p className="section-header__subtitle">{subtitle}</p>}
      </div>
      {to && (
        <Link to={to} className="section-header__link">
          Ver todos
          <Icon name="arrows-button-right" />
        </Link>
      )}
    </div>
  )
}

export default SectionHeader