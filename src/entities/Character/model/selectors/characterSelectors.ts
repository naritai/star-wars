import { StateSchema } from "app/providers/store-provider";
import { FetchStatus } from "shared/api/types";
import { Character } from "../types/characterSchema";
import { createSelector } from "@reduxjs/toolkit";

export const getAllCharacters = (state: StateSchema): Character[] => state.characters.items;

export const getCharacterById = createSelector(
  [getAllCharacters, (_, id: number) => id],
  (characters, id) => characters.find((character: Character) => character.id === id)
);

// export const getCharacterById = (state: StateSchema, id: number): Character | undefined => 
//   state.characters.items.find((character: Character) => character.id === id);

export const getCharactersStatus = (state: StateSchema): FetchStatus => state.characters.status;

export const getCharactersError = (state: StateSchema): string | null => state.characters.error;

export const getCharactersCount = (state: StateSchema): number | null => state.characters.count;

export const getCharactersSearch = (state: StateSchema): string | null => state.characters.search;

export const getCharactersPage = (state: StateSchema): number | null => state.characters.page;

export const getCharacterOnEdit = (state: StateSchema): Character | null => state.characters.characterOnEdit;

export const getCharacterOnEditError = (state: StateSchema): string | null => state.characters.characterOnEditError;

export const getCharacterOnEditStatus = (state: StateSchema): FetchStatus => state.characters.characterOnEditStatus;




