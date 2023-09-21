import favorite from "../../assets/images/favorite.svg";
import { Link } from "react-router-dom";
import "./header.scss";
import React from "react";

export default function Header() {
  const logoName = "{IT}";
const [click, setClick] = React.useState(false);

function toogleClick() {
  setClick(!click);
}

  return (
    <section className="header">
      <Link to="/search" className="header__logo">
        <span>Connect </span>
        <span style={{ color: "#674EAE" }}>{logoName}</span>
      </Link>
      <Link to="/search" className="header__logo">
      </Link>
      <Link to="/favorites" className="header__btn-container" onClick={() => toogleClick()}>
        <div
         
          className={
            click 
              ? "header__favorite-icon header__favorite-icon_active"
              : "header__favorite-icon"
          }
        />
        <div className="header__favorite-title">Избранное</div>
      </Link>
    </section>
  );
}
