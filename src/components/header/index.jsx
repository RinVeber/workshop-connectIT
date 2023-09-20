import favorite from "../../assets/images/favorite.svg";
import { Link } from "react-router-dom";
import "./header.scss";

export default function Header() {
  const logoName = "{IT}";
  return (
    <section className="header">
   
        <Link to="/search" className="header__logo">
          <span>Connect </span>
          <span style={{ color: "#674EAE" }}>{logoName}</span>
        </Link>
        <Link to="/favorites" className="header__btn-container">
          <img
            src={favorite}
            alt="favorite"
            className="header__favorite-icon"
          />
          <div className="header__favorite-title">Избранное</div>
        </Link>

    </section>
  );
}
