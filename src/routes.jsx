import { createBrowserRouter } from 'react-router-dom';

import App from './App';

import Home from '@screens/Home';
import Game from '@screens/Game';
import Page404 from '@screens/Page404';

export default createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/room/:gameId',
        element: <Game />
      },
      {
        path: '/404',
        element: <Page404 />
      },
      {
        path: '*',
        element: <Page404 />
      }
    ]
  }
]);
