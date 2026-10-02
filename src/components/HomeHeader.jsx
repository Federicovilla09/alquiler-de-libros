import "./HomeHeader.css";
import Icon from "./Icon";
import Avatar from "./Avatar";

function formatToday() {
  const text = new Date().toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
  const clean = text.replace(",", "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function HomeHeader() {
  return (
    <header className="home-header">
      <div className="home-header__top">
        <div className="home-header__greeting">
          <h1 className="home-header__hello">Hola, Mica</h1>
          <p className="home-header__date">{formatToday()}</p>
        </div>
        <button
          className="home-header__avatar"
          aria-label="Abrir menú de cuenta"
        >
          <Avatar src="/avatar-mica.png" />
        </button>
      </div>

      <div className="home-header__today">
        <p className="home-header__label">Para hoy</p>
        <button className="today-summary">
          <span className="today-summary__dots">
            <span
              className="today-summary__dot"
              style={{ backgroundColor: "#5b5bd6" }}
            />
            <span
              className="today-summary__dot"
              style={{ backgroundColor: "#e4c767" }}
            />
            <span
              className="today-summary__dot"
              style={{ backgroundColor: "#e5484d" }}
            />
          </span>
          <span className="today-summary__text">
            <strong>4 pendientes</strong>
            <span className="today-summary__late">· 1 atrasada</span>
          </span>
          <Icon name="arrows-button-down" className="today-summary__chevron" />
        </button>
      </div>
    </header>
  );
}

export default HomeHeader;
