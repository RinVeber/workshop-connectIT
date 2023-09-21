import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
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
            <Footer />
          </main>
        </EventsProvider>
      </FiltersProvider>
    </body>
  );
};
