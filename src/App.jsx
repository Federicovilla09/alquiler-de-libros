import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import NewBookPage from './pages/NewBookPage'
import EditBookPage from './pages/EditBookPage'
import TrackingPage from './pages/TrackingPage'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<PlaceholderPage title="Iniciar sesión" />} />
      <Route path="/libros/nuevo" element={<NewBookPage />} />
      <Route path="/libros/:id" element={<BookPage />} />
      <Route path="/libros/:id/editar" element={<EditBookPage />} />
      <Route path="/seguimiento" element={<TrackingPage />} />
      <Route path="*" element={<PlaceholderPage title="Página no encontrada" />} />
    </Routes>
  )
}

export default App