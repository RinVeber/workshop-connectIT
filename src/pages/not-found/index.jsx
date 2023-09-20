import errorImage from "../../assets/images/Error.svg";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">

  
      <img src={errorImage} alt="картинка" className="not-found__image" />
      <div className="not-found__container-text">
      <h1 className="not-found__title">404. Такой страницы на сайте нет</h1>
      <h3 className="not-found__subtitle">
      С этой страницей что-то случилось или не верно указан адрес
      </h3>
      <Link to="/">
    
      <button type="button" className="not-found__button">
      <span className="not-found__text-btn">На главную &#8594;</span>
      </button>
      </Link>
      </div>
      </div>
    </section>
  );
}

export default NotFound;
