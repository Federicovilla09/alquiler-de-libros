import "./App.css";
import BookRow from "./components/BookRow";
import { books } from "./data/books";
import HomeHeader from "./components/HomeHeader";
import SearchBar from "./components/SearchBar";
import GenreFilters from "./components/GenreFilters";
import BottomNav from "./components/BottomNav";
import Icon from "./components/Icon";
import Button from "./components/Button";
import TagStatus from "./components/TagStatus";
import TagChoice from "./components/TagChoice";
import TextField from "./components/TextField";
import SelectField from "./components/SelectField"; 
import SwitchField from "./components/SwitchField";
import SeriesField from "./components/SeriesField";

function App() {
  return (
    <main className="app">
      <HomeHeader />


      <div className="content">
        {/* PRUEBA TEMPORAL: borrar después */}
        <SelectField
          label="Tipo de público"
          options={["Todo público", "+15", "+18", "+21"]}
          defaultValue="Todo público"
        />
        <SelectField
          label="¿De qué serie?"
          placeholder="Elegí una serie"
          options={[
            "Cincuenta sombras",
            "Alas de sangre",
            "Una corte de rosas y espinas",
          ]}
          helpText="Elegí una serie que ya cargaste o creá una nueva."
        />
        <SelectField
          label="Fecha de devolución"
          placeholder="Elegí un plazo"
          options={["15 días", "30 días"]}
          error="Elegí un plazo para el alquiler"
        />

                {/* PRUEBA TEMPORAL: borrar después */}
        <SwitchField
          label="Recomendar en el catálogo"
          helper="Aparece en «Recomendados por Mica»"
        />
        <SeriesField series={['Cincuenta sombras', 'Alas de sangre', 'Una corte de rosas y espinas']} />

        <SearchBar />
        <GenreFilters />
        <section className="catalog">
          <h2 className="catalog__title">12 títulos en tu biblioteca</h2>
          <div className="catalog__list">
            {books.map((book) => (
              <BookRow
                key={book.id}
                title={book.title}
                author={book.author}
                status={book.status}
                copies={book.copies}
                coverColor={book.coverColor}
              />
            ))}
          </div>
          <Button variant="ghost" icon="arrows-button-down">
            Ver más (2)
          </Button>
        </section>
      </div>
      <BottomNav />
    </main>
  );
}

export default App;
