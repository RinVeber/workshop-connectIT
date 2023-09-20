import {mokLinkFavorite} from '../../utils/constants.js';
import { SortBar } from 'it-events-frontend';


export default function FavoritePage() {
  const handlerSort = () => {

  }
  return (
    <section className="favorite">
      <div className="favorite__containet-text">
        <h1 className="favorite__title">Избранное</h1>
        <h6 className="favorite__subtitle">Сохраненные события</h6>
      </div>
      <div className="favorite__content">
      <SortBar onSort={handlerSort} />
      </div>
    </section>
  )
}
