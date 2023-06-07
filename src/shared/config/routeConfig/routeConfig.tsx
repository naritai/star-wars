import CharacterDetailsPage from 'pages/character-details-page/ui/CharacterDetailsPage';
import { CharactersPage } from 'pages/characters-page';
import MainPage from 'pages/main-page/ui/MainPage';
import { NotFoundPage } from 'pages/notfound-page';
import { type RouteObject } from 'react-router-dom';

export enum AppRoutes {
  MAIN = 'main',
  CHARACTERS = 'characters',
  CHARACTER_DETAILS = 'character_details',
  NOTFOUNDPAGE = 'notfound',
  CHARACTER_EDIT = 'character_edit'
}

const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.CHARACTERS]: '/characters',
  [AppRoutes.CHARACTER_DETAILS]: '/characters/:id',
  [AppRoutes.CHARACTER_EDIT]: '/characters/:id/edit',
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
    element: <CharacterDetailsPage />,
  },
  {
    path: RoutePath.character_edit,
    element: <CharacterDetailsPage edit={true} />,
  },
  {
    path: RoutePath.notfound,
    element: <NotFoundPage />
  }
];