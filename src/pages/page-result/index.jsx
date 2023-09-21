import { useEventsContext, CardList, useIsMobileResolution } from "it-events-frontend";
import React from "react";
import { FilterLeftBar } from "../search-page/LeftBar/FilterLeftBar";

export default function Results() {
  const { searchResult, popularEvents } = useEventsContext();
  const dekstopWidth = useIsMobileResolution(768);
  const mobileWidth = useIsMobileResolution(500);
  console.log(dekstopWidth);

  
  return (
    <section className="results">
      {!dekstopWidth && (
 <FilterLeftBar />
      )}
     
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
              cardDirection={dekstopWidth ? "row" : "column"}
              listDirection={mobileWidth ? "column" : "row"}
            />
          </>
        ) : (
          <CardList
            title={"Результат"}
            events={searchResult}
            cardDirection={dekstopWidth ? "row" : "column"}
            listDirection={mobileWidth ? "column" : "row"}
          />
        )}
      </div>
    </section>
  );
}
