import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { paths } from "./routes/paths";
import SearchPage from "../pages/search-page";

//import { Footer } from "it-events-frontend";
// import { Header } from "it-events-frontend";
import { FiltersProvider } from "it-events-frontend";
import { EventsProvider } from "it-events-frontend";
import Results from "../pages/page-result";
import DefaultPage from "../pages/event-page-default";
import FavoritePage from "../pages/favorites-page";
import NotFound from "../pages/not-found";

const mainUrl = process.env.PUBLIC_URL;
console.log(mainUrl);

export const RootLayout = () => {
  return (
    <body className="page">
      <FiltersProvider>
        <EventsProvider>
          <main className="page__container">
            <Header />
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path={paths.results} element={<Results />} />
              <Route path={paths.default} element={<DefaultPage />} />
              <Route path={paths.favorite} element={<FavoritePage />} />
              <Route path={paths.notFound} element={<NotFound />} />
            </Routes>

            <Footer />
          </main>
        </EventsProvider>
      </FiltersProvider>
    </body>
  );
};
