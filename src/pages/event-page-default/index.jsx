import React from "react";
import action from "../../assets/images/action.svg";
import { Link, useParams } from "react-router-dom";
import WatchAlso from "./watch";
import { useEventsContext } from "it-events-frontend";
import { Loader, DescriptionTabs } from "it-events-frontend";
import { formatTimeRange } from "it-events-frontend";
import { apiEvents } from "it-events-frontend";

export default function DefaultPage() {
  const { recommendedEvents, toggleFavorite } =
    useEventsContext();

  const [selectEvent, setSelectEvent] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const eventId = useParams();

  const recommended = recommendedEvents.slice(0, 4);
  const mokDay = "Вт, 23 мая";

  const fetchSelectedEvent = async (eventId) => {
    try {
      const data = await apiEvents.getSelectedEvent(eventId.id);
      setSelectEvent(data);
      setIsLoading(true);
      return data;
    } catch (error) {
      setIsLoading(false);
      console.error("Ошибка при выполнении запроса:", error);
    }
  };

  React.useEffect(() => {
    fetchSelectedEvent(eventId);
  }, [eventId]);
  
  return (
    <section className="default">
      <div className="default__content">
        {isLoading ? (
          <>
            <div className="default__wrap">
              <div className="default__container-text">
                <div className="default__container-title">
                  <h1 className="default__title">{selectEvent.title}</h1>
                  <div className="default__link-container">
                    <div
                      className={
                        !selectEvent.isLiked
                          ? "default__link-icon-like"
                          : "default__link-icon-like_active"
                      }
                      onClick={() => toggleFavorite(selectEvent)}
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
                      selectEvent.date_start,
                      selectEvent.date_end
                    )}
                  </span>
                  <span className="default__dot"></span>
                  <span className="default__subtitle">
                    {selectEvent.address}
                  </span>
                </div>
                <Link to="/" className="default__online-translation">
                  <div className="default__online-icon" />
                  <span className="default__online-text">
                    Online-трансляция
                  </span>
                </Link>
                <div className="default__price">
                  {selectEvent.price} &#8381;
                </div>
                <Link to={selectEvent.url} className="default__btn">
                  <div className="default__btn-text">
                    Сайт мерприятия &#8594;
                  </div>
                </Link>
              </div>
              <div className="default__container-image">
                <img
                  src={selectEvent.image}
                  alt="карточка"
                  className="default__image"
                />
              </div>
            </div>
            <div className="default__container-navbar">
              <DescriptionTabs selectedEvent={selectEvent} />
              {/* <Tab linkData={mokLink} selectedEvent={selectedEvent}/> */}
            </div>
          </>
        ) : (
          <Loader />
        )}
      </div>
      <WatchAlso items={recommended} isLoading={isLoading} setIsLoading={setIsLoading}/>
    </section>
  );
}
