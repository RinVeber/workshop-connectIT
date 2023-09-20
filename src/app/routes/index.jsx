import { createBrowserRouter } from 'react-router-dom';
import { paths } from './paths';
import NotFound from '../../pages/not-found';
import DefaultPage from '../../pages/event-page-default';
import FavoritePage from '../../pages/favorites-page';
import SearchPage from '../../pages/search-page';
import {RootLayout} from '../RootLayout';

export const router = createBrowserRouter([
{
  path: paths.index,
  element: <RootLayout />,
  children: [
    {
      path: paths.notFound,
       element: <NotFound />,
    },
    {
      path: paths.default,
      element: <DefaultPage />,
    },
    {
      path: paths.favorite,
      element: <FavoritePage />,
    },
    {
      path: paths.search,
      element: <SearchPage />,
    },

  ]
}
]);