import React from "react";
import { LeftFilterBar } from "it-events-frontend"; //взят из библиотеки
import { FilterLeftBar } from "./LeftBar/FilterLeftBar"; //скопирован из библиотеки
import { TopFilterBar, CardList, Loader } from "it-events-frontend";
import { useEventsContext } from "it-events-frontend";
import { useIsMobileResolution } from "it-events-frontend";

export default function SearchPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { popularEvents } = useEventsContext();

  const mobileWidth = useIsMobileResolution(520);

  React.useEffect(() => {
    if (popularEvents !== null) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);

  if (mobileWidth) {
    return (<section className="search">
    <FilterLeftBar />
    </section>)
  }

  return (
    <section className="search">
      <FilterLeftBar />

      <div className="search__content">
        <TopFilterBar />
        {isLoading ? (
          <CardList title={"Популярное"} events={popularEvents} listDirection={'row'} cardDirection={'column'}/>
        ) : (
          <Loader />
        )}
      </div>
    </section>
  );
}
