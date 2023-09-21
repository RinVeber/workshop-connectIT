import React from "react";
import { LeftFilterBar } from "it-events-frontend"; //взят из библиотеки
import { FilterLeftBar } from "./LeftBar/FilterLeftBar"; //скопирован из библиотеки
import { TopFilterBar, CardList, Loader } from "it-events-frontend";
//import CardList from "./CardList";
import { useEventsContext } from "it-events-frontend";

export default function SearchPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [listEvents, setListEvents] = React.useState();
  const { popularEvents } = useEventsContext();

  React.useEffect(() => {
    if (popularEvents !== null) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, []);
  console.log(popularEvents);
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
