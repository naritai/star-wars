import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character } from "../types/characterSchema";
import { mockCharacters } from "./mock";
import { FetchStatus } from "shared/api/types";
import { fetchCharacters } from "entities/character/api";

export interface CharactersState {
  items: Character[];
  status: FetchStatus;
  error: string | null;
  count: number | null;
  search: string | null;
  page: number | null;
}

const initialState: CharactersState = {
  items: mockCharacters as Character[],
  status: FetchStatus.IDLE,
  error: null,
  count: 1,
  page: 1,
  search: '',
}

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    pageUpdated: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    searchUpdated: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCEDED;
        const { items, count } = action.payload;
        state.items = items;
        state.count = count;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = FetchStatus.ERROR;
        state.error = action.error.message ?? null;
      })
  }
});

export const { actions: charactersActions } = charactersSlice;
export const { reducer: charactersReducer } = charactersSlice;