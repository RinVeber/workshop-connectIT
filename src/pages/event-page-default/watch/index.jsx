import React from "react";
import favorete from "../../../assets/images/favorite.svg";
import link from "../../../assets/images/action.svg";
import { useEventsContext, formatTimeRange } from "it-events-frontend";
import { useNavigate } from "react-router-dom";

export default function WatchAlso({items, isLoading, setIsLoading}) {
  const { handleCardClick, toggleFavorite } = useEventsContext();

  const navigate = useNavigate();

  function handleClick(item) {
    navigate(`../events/${item.id}`);
    handleCardClick(item);
    setIsLoading(false)
  }

  return (
    <section className="watch">
      <div className="watch__title">Смотрите также</div>
      {isLoading ? (
        <ul className="watch__list">
          {items.map((item) => {
            return (
              <li key={item.id} className="watch__list-item">
                <div className="watch__overlay">
                  <img
                    src={item.image}
                    alt="картинка"
                    className="watch__image-overlay"
                    onClick={() => handleClick(item)}
                  />
                  <div
                  
                    className={item.isLiked ? " watch__btn-favorite watch__btn-favorite_active" :"watch__btn-favorite"}
                    onClick = {() => toggleFavorite(item)}
                  />
                  <div className="watch__item-price">
                    <span className="watch__price">{item.price} &#8381;</span>
                  </div>
                </div>
                <div className="watch__container-text">
                  <div className="watch__container-title">
                    <h5 className="watch__title">{item.title}</h5>
                    <img src={link} alt="поделиться" className="watch__link" />
                  </div>
                  <div className="watch__subtitle">
                    <span className="watch__day">
                      {formatTimeRange(item.date_start, item.date_end)}
                    </span>
                    <span className="watch__dot"></span>
                    <span className="watch__location">{item.address}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (null)}
    </section>
  );
}
