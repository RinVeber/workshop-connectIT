import React from "react";
import favorite from "../../assets/images/favorite.svg";
import action from "../../assets/images/action.svg";
import { Link } from "react-router-dom";
import WatchAlso from "./watch";
import { useEventsContext } from "it-events-frontend";
import { Loader, DescriptionTabs } from "it-events-frontend";
import { formatTimeRange } from "it-events-frontend";

export default function DefaultPage() {
  const { recommendedEvents, selectedEvent, toggleFavorite } =
    useEventsContext();

  const mokDay = "Вт, 23 мая";

  return (
    <section className="default">
      {selectedEvent !== null ? (
        <>
          <div className="default__content">
            <div className="default__wrap">
              <div className="default__container-text">
                <div className="default__container-title">
                  <h1 className="default__title">{selectedEvent.title}</h1>
                  <div className="default__link-container">
                    <div
                      className={
                        !selectedEvent.isLiked
                          ? "default__link-icon-like"
                          : "default__link-icon-like_active"
                      }
                      onClick={() => toggleFavorite(selectedEvent)}
                    />
                    <img
                      src={action}
                      alt="поделиться"
                      className="default__link-icon"
                    />
                  </div>
                </div>
                <div className="default__container-subtitle">
                  <span className="default__subtitle">{mokDay}</span>
                  <span className="default__dot"></span>
                  <span className="default__subtitle">
                    {formatTimeRange(
                      selectedEvent.date_start,
                      selectedEvent.date_end
                    )}
                  </span>
                  <span className="default__dot"></span>
                  <span className="default__subtitle">
                    {selectedEvent.address}
                  </span>
                </div>
                <Link to="/" className="default__online-translation">
                  <div className="default__online-icon" />
                  <span className="default__online-text">
                    Online-трансляция
                  </span>
                </Link>
                <div className="default__price">
                  {selectedEvent.price} &#8381;
                </div>
                <Link to={selectedEvent.url} className="default__btn">
                  <div className="default__btn-text">
                    Перейти на сайт организатора &#8594;
                  </div>
                </Link>
              </div>
              <div className="default__container-image">
                <img
                  src={selectedEvent.image}
                  alt="карточка"
                  className="default__image"
                />
              </div>
            </div>
            <div className="default__container-navbar">
              <DescriptionTabs selectedEvent={selectedEvent} />
              {/* <Tab linkData={mokLink} selectedEvent={selectedEvent}/> */}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}

{recommendedEvents.length >0 ? (
  <WatchAlso recommendedEvents={recommendedEvents}/>
): (
null
)}
      
  
    </section>
  );
}
