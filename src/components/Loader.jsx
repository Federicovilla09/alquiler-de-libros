import './Loader.css'

function Loader({ label = 'Cargando' }) {
  return <div className="loader" role="status" aria-label={label} />
}

export default Loader
