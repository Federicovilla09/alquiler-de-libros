import { useNavigate } from 'react-router'
import './NavigationHeader.css'
import Icon from './Icon'

function NavigationHeader({ title, backTo = '/' }) {
  const navigate = useNavigate()

  function handleBack() {
    // Si se llegó desde otra pantalla de la app, volver a esa
    if (window.history.state?.idx > 0) {
      navigate(-1)
    } else {
      navigate(backTo)
    }
  }

  return (
    <header className="nav-header">
      <button type="button" className="nav-header__back" aria-label="Volver" onClick={handleBack}>
        <Icon name="arrows-button-left" size={16} />
      </button>
      <h1 className="nav-header__title">{title}</h1>
    </header>
  )
}

export default NavigationHeader