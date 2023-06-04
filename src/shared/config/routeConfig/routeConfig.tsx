import { CharactersPage } from 'pages/CharactersPage';
import MainPage from 'pages/MainPage/ui/MainPage';
import { type RouteObject } from 'react-router-dom';

export enum AppRoutes {
  MAIN = 'main',
  CHARACTERS = 'characters',
  CHARACTER_DETAILS = 'character_details',
  NOTFOUNDPAGE = 'notfound'
}

const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.CHARACTERS]: '/characters',
  [AppRoutes.CHARACTER_DETAILS]: '/characters/:id',
  [AppRoutes.NOTFOUNDPAGE]: '*',
}

export const routeConfig: RouteObject[] = [
  {
    path: RoutePath.main,
    element: <MainPage />,
  },
  {
    path: RoutePath.characters,
    element: <CharactersPage />,
  },
  {
    path: RoutePath.character_details,
    element: 'character details',
  },
  {
    path: RoutePath.notfound,
    element: 'notfound',
  }
];