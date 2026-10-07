import { Route, Routes } from 'react-router'
import RequireAuth from './components/RequireAuth'
import HomePage from './pages/HomePage'
import BookPage from './pages/BookPage'
import NewBookPage from './pages/NewBookPage'
import EditBookPage from './pages/EditBookPage'
import TrackingPage from './pages/TrackingPage'
import LoginPage from './pages/LoginPage'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* Todo lo de adentro exige haber iniciado sesión */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/libros/nuevo" element={<NewBookPage />} />
        <Route path="/libros/:id" element={<BookPage />} />
        <Route path="/libros/:id/editar" element={<EditBookPage />} />
        <Route path="/seguimiento" element={<TrackingPage />} />
        <Route path="*" element={<PlaceholderPage title="Página no encontrada" />} />
      </Route>
    </Routes>
  )
}

export default App