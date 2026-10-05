import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<PlaceholderPage title="Iniciar sesión" />} />
      <Route path="/libros/nuevo" element={<PlaceholderPage title="Cargar nuevo libro" />} />
      <Route path="/libros/:id" element={<BookPage />} />
      <Route path="/libros/:id/editar" element={<PlaceholderPage title="Editar libro" />} />
      <Route path="/libros/:id/historial" element={<PlaceholderPage title="Historial" />} />
      <Route path="/seguimiento" element={<PlaceholderPage title="Seguimiento" withNav />} />
      <Route path="*" element={<PlaceholderPage title="Página no encontrada" />} />
    </Routes>
  )
}

export default App