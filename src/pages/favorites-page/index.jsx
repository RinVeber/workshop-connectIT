import { SortBar, useEventsContext, CardList } from "it-events-frontend";
import React from "react";

export default function FavoritePage() {
  const { favoriteEvents } = useEventsContext();
  const [sortedEvents, setSortedEvents] = React.useState(favoriteEvents);

  const customSort = (sortField) => {
   return function (a, b) {
      if (a[sortField] < b[sortField]) {
        return -1;
      }
      if (a[sortField] > b[sortField]) {
        return 1;
      }
      return 0;
    }
  }
  const handlerSort = (sortType) => {
    if (sortType === "name") {
      setSortedEvents([...favoriteEvents.sort(customSort('title'))]);
    } else if (sortType === "price") {
      setSortedEvents([...favoriteEvents.sort(customSort('price'))]);
    } else if (sortType === "date") {
      setSortedEvents([...favoriteEvents.sort(customSort('date_start'))]);
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
