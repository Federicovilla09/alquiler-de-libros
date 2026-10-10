import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import RequireAuth from './components/RequireAuth'
import ScrollToTop from './components/ScrollToTop'
import ScreenLoader from './components/ScreenLoader'

// Cada pantalla se descarga recién cuando se abre
const LoginPage = lazy(() => import('./pages/LoginPage'))
const HomePage = lazy(() => import('./pages/HomePage'))
const BookPage = lazy(() => import('./pages/BookPage'))
const NewBookPage = lazy(() => import('./pages/NewBookPage'))
const EditBookPage = lazy(() => import('./pages/EditBookPage'))
const TrackingPage = lazy(() => import('./pages/TrackingPage'))
const PlaceholderPage = lazy(() => import('./pages/PlaceholderPage'))
const CatalogLayout = lazy(() => import('./pages/catalog/CatalogLayout'))
const CatalogHomePage = lazy(() => import('./pages/catalog/CatalogHomePage'))
const CatalogBookPage = lazy(() => import('./pages/catalog/CatalogBookPage'))
const CatalogListPage = lazy(() => import('./pages/catalog/CatalogListPage'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<ScreenLoader />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* El catálogo es público: no exige sesión */}
          <Route path="/catalogo" element={<CatalogLayout />}>
            <Route index element={<CatalogHomePage />} />
            <Route path="libro/:id" element={<CatalogBookPage />} />
            <Route path="recien-llegados" element={<CatalogListPage section="newest" />} />
            <Route path="mejor-valorados" element={<CatalogListPage section="topRated" />} />
          </Route>

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
      </Suspense>
    </>
  )
}

export default App