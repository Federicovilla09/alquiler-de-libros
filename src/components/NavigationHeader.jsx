import './NavigationHeader.css'
import Icon from './Icon'

function NavigationHeader({ title, onBack }) {
  return (
    <header className="nav-header">
      <button type="button" className="nav-header__back" aria-label="Volver" onClick={onBack}>
        <Icon name="arrows-button-left" size={16} />
      </button>
      <h1 className="nav-header__title">{title}</h1>
    </header>
  )
}

export default NavigationHeader