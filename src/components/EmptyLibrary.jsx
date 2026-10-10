import { useNavigate } from 'react-router'
import './EmptyLibrary.css'
import Button from './Button'

function EmptyLibrary() {
  const navigate = useNavigate()

  return (
    <section className="empty-library">
      <img
        className="empty-library__illustration"
        src="/illustrations/empty-library.svg"
        alt=""
        width="361"
        height="335"
      />
      <h2 className="empty-library__title">Tu biblioteca está vacía</h2>
      <p className="empty-library__text">Cargá tu primer libro para empezar.</p>
      <Button icon="plus-add" onClick={() => navigate('/libros/nuevo')}>
        Cargar mi primer libro
      </Button>
    </section>
  )
}

export default EmptyLibrary