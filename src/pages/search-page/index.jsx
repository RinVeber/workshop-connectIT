import React from "react";
import { LeftFilterBar } from "it-events-frontend"; //взят из библиотеки
import { FilterLeftBar } from "./LeftBar/FilterLeftBar"; //скопирован из библиотеки
import { TopFilterBar, CardList } from "it-events-frontend";
//import CardList from "./CardList";
import { useEventsContext } from "it-events-frontend";

export default function SearchPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [listEvents, setListEvents] = React.useState();
  const { popularEvents } = useEventsContext();

  console.log(popularEvents);


  return (
    <section className="search">
      <FilterLeftBar />
   
      <div className="search__content">
      <TopFilterBar />
     <CardList title={'Популярное'} events={popularEvents}/>
      </div>
    </section>
  );
}
