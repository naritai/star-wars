import { lazy } from 'react';

export const CharacterDetailsPageAsync = lazy(
  () => import('./CharacterDetailsPage')
);
