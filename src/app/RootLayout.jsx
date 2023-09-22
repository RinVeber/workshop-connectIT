import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import SearchPage from "../pages/search-page";

//import { Footer } from "it-events-frontend";
// import { Header } from "it-events-frontend";
import { FiltersProvider } from "it-events-frontend";
import { EventsProvider } from "it-events-frontend";

export const RootLayout = () => {
  return (
    <body className="page">
      <FiltersProvider>
        <EventsProvider>
          <main className="page__container">
            <Header />
            <Outlet />
            <Routes>
              <Route exact path="/" element={<SearchPage />} />
            </Routes>

            <Footer />
          </main>
        </EventsProvider>
      </FiltersProvider>
    </body>
  );
};
