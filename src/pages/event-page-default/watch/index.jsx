import React from "react";
import favorete from "../../../assets/images/favorite.svg";
import link from "../../../assets/images/action.svg";
import { useEventsContext, formatTimeRange, Loader } from "it-events-frontend";
import {useNavigate, useParams} from 'react-router-dom';


export default function WatchAlso() {
const { recommendedEvents, handleCardClick } = useEventsContext();
  

const navigate = useNavigate();
const eventId = useParams();

console.log(eventId);

React.useEffect(() => {

}, [recommendedEvents])

  function handleClick(item) {
    navigate(`../events/${item.id}`)
  }

  return (

    <>
      {recommendedEvents.length > 0 ? (
        <section className="watch">
          <div className="watch__title">Смотрите также</div>
        <ul className="watch__list">
        {recommendedEvents.splice(0, 4).map((item) => {
          return (
            <li key={item.id} className="watch__list-item">
              <div className="watch__overlay">
                <img
                  src={item.image}
                  alt="картинка"
                  className="watch__image-overlay"
                  onClick={() => handleClick(item)}
                />
                <img
                  src={favorete}
                  alt="клик"
                  className="watch__btn-favorite"
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
      </section>
      ) :
      (<div> Рекомендуемый стэйт пустой</div>)
      }
    
        
    </>
  );
}