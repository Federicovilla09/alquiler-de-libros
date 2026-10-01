import './App.css'
import BookRow from './components/BookRow'

function App() {
  return (
    <main className="app">
      <section className="catalog">
        <h2 className="catalog__title">12 títulos en tu biblioteca</h2>
        <div className="catalog__list">
          <BookRow
            title="Alas de sangre"
            author="Rebecca Yarros"
            status="Alquilado"
            copies={1}
            coverColor="#7a2e2e"
          />
          <BookRow
            title="Hábitos atómicos"
            author="James Clear"
            status="Reservado"
            copies={1}
            coverColor="#e8c547"
          />
          <BookRow
            title="Una corte de rosas y espinas"
            author="Sarah J. Maas"
            status="Alquilado"
            copies={1}
            coverColor="#2f4a3a"
          />
          <BookRow
            title="Cincuenta Sombras de Gray"
            author="E. L. James"
            status="Disponible"
            copies={2}
            coverColor="#3a3a3a"
          />
        </div>
      </section>
    </main>
  )
}

export default App
