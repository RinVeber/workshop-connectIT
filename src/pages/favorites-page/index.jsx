import { SortBar, useEventsContext, CardList } from 'it-events-frontend';


export default function FavoritePage() {
  const {favoriteEvents} = useEventsContext();
  console.log(favoriteEvents);

  const handlerSort = () => {
  }
  return (
    <section className="favorite">
      <div className="favorite__containet-text">
        <h1 className="favorite__title">Избранное</h1>
        <h6 className="favorite__subtitle">Сохраненные события</h6>
      </div>
      <SortBar onSort={handlerSort} />
      <div className="favorite__content">
      <CardList title={'Популярное'} events={favoriteEvents} cardDirection={'column'} listDirection={'row'}/>
      </div>
    </section>
  )
}
