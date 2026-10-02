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
import StarRating from "./components/StarRating";
import Loader from "./components/Loader";
import Notification from "./components/Notification";
import InlineNotice from "./components/InlineNotice";
import Tabs from "./components/Tabs";
import LoanCard from "./components/LoanCard";
import HistoryItem from "./components/HistoryItem";

function App() {
  return (
    <main className="app">
      <HomeHeader />
      <div className="content">
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
