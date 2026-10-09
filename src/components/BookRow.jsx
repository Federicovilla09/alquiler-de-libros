import "./BookRow.css";
import StatusIndicator from "./StatusIndicator";
import { Link } from 'react-router'

const STATUS_TYPES = {
  Disponible: "available",
  Alquilado: "rent",
  Reservado: "reserved",
};

function BookRow({ id, title, author, status, copies, coverColor, coverSrc }) {
  return (
    <Link to={`/libros/${id}`} className="book-row">   {/* ← cambió */}
      <div className="book-row__details">
        <div className="book-row__cover" style={{ backgroundColor: coverColor }} />
        <div className="book-row__info">
          <h3 className="book-row__title">{title}</h3>
          <p className="book-row__author">{author}</p>
        </div>
      </div>
      <div className="book-row__availability">
        <StatusIndicator type={STATUS_TYPES[status]}>{status}</StatusIndicator>
        <span className="book-row__copies">
          {copies === 1 ? "1 ejemplar" : `${copies} ejemplares`}
        </span>
      </div>
    </Link>
  );
}

export default BookRow;
