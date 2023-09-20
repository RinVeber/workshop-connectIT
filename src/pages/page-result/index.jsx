import { useEventsContext, CardList } from "it-events-frontend";
import React from "react";
import { FilterLeftBar } from "../search-page/LeftBar/FilterLeftBar";

export default function Results() {
  const { searchResult, popularEvents } = useEventsContext();
  console.log(searchResult);
  return (
    <section className="results">
      <FilterLeftBar />
      <div className="results__content">
        {!searchResult.length > 0 ? (
          <>
            <div className="results__container-text">
              <div className="results__title">Ничего не нашлось</div>
              <div className="results__subtitle">
                Но нам есть, что предложить
              </div>
            </div>
            <CardList
              title={"Популярное"}
              events={popularEvents}
              cardDirection={"column"}
              listDirection={"row"}
            />
          </>
        ) : (
          <CardList
            title={"Результат"}
            events={searchResult}
            cardDirection={"column"}
            listDirection={"row"}
          />
        )}
      </div>
    </section>
  );
}
