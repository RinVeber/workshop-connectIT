import { SortBar, useEventsContext, CardList } from "it-events-frontend";
import React from "react";

export default function FavoritePage() {
  const { favoriteEvents } = useEventsContext();
  const [sortedEvents, setSortedEvents] = React.useState(favoriteEvents);

  const handlerSort = (e) => {
    if (e === "name") {
      const newSortedEvents = favoriteEvents.sort(function (a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    
      setSortedEvents([...newSortedEvents]);
    } else if (e === "price") {
      const newSortedEvents = favoriteEvents.sort(function (a, b) {
        if (a.price < b.price) {
          return -1;
        }
        if (a.price > b.price) {
          return 1;
        }
        return 0;
      });
      setSortedEvents([...newSortedEvents]);
    } else if (e === "date") {
      const newSortedEvents = favoriteEvents.sort(function (a, b) {
        if (a.date_start < b.date_start) {
          return -1;
        }
        if (a.date_start > b.date_start) {
          return 1;
        }
        return 0;
      });
      setSortedEvents([...newSortedEvents]);
    }
  };


  return (
    <section className="favorite">
      <div className="favorite__container-text">
        <h1 className="favorite__title">Избранное</h1>
        <h6 className="favorite__subtitle">Сохраненные события</h6>
      </div>
      <SortBar onSort={(e) => handlerSort(e)} />
      <div className="favorite__content">
        {!sortedEvents.length > 0 ? (
          <div className="favorite__container-text">
            <div className="favorite__title-list">Список пуст</div>
            <div className="favorite__subtitle">
              Вы пока ничего не сохранили в избранное, но вы можете начать
              пополнять свой список избранного прямо сейчас. Для этого
              воспользуйтесь поиском на нашем сайте и найдите интересующие вас
              события.
            </div>
          </div>
        ) : (
          <CardList
            title={"Избранное"}
            events={sortedEvents}
            cardDirection={"column"}
            listDirection={"row"}
          />
        )}
      </div>
    </section>
  );
}
