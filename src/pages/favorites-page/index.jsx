import { SortBar, useEventsContext, CardList } from 'it-events-frontend';


export default function FavoritePage() {
  const {favoriteEvents, upcomingEvents} = useEventsContext();
  console.log(upcomingEvents);

  const handlerSort = (e) => {
    console.log(e.current);
  }
  return (
    <section className="favorite">
      <div className="favorite__containet-text">
        <h1 className="favorite__title">Избранное</h1>
        <h6 className="favorite__subtitle">Сохраненные события</h6>
      </div>
      <SortBar onSort={(e) => handlerSort(e)} />
      <div className="favorite__content">
      <CardList title={'Популярное'} events={favoriteEvents} cardDirection={'column'} listDirection={'row'}/>
      </div>
    </section>
  )
}
