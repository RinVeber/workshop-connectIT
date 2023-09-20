import { SortBar, useEventsContext, CardList } from "it-events-frontend";

export default function FavoritePage() {
  const { favoriteEvents } = useEventsContext();

  const handlerSort = (e) => {
    console.log(e.current);
  };
  return (
    <section className="favorite">
      <div className="favorite__container-text">
        <h1 className="favorite__title">Избранное</h1>
        <h6 className="favorite__subtitle">Сохраненные события</h6>
      </div>
      <SortBar onSort={(e) => handlerSort(e)} />
      <div className="favorite__content">
        {favoriteEvents ? (
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
            events={favoriteEvents}
            cardDirection={"column"}
            listDirection={"row"}
          />
        )}
      </div>
    </section>
  );
}
