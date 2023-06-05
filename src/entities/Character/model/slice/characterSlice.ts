import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "../types/characterSchema";
import { mockCharacters } from "./mock";
import { FetchStatus } from "shared/api/types";

export interface CharactersState {
  items: Character[];
  status: FetchStatus;
  error: string | null;
}

const initialState: CharactersState = {
  items: mockCharacters as Character[],
  status: FetchStatus.IDLE,
  error: null
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    charactersFiltered: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      return {
        ...state,
        items: state.items.filter(({ name }: Character) => {
          return name.toLowerCase().includes(payload.toLowerCase());
        })
      }
    },
    characterUpdated: (state, action: PayloadAction<Partial<Character>, string>) => {
      const { id, ...rest } = action.payload;

      // save charater + update local storage!

    }
  }
});

export const { actions: charactersActions } = charactersSlice;
export const { reducer: charactersReducer } = charactersSlice;