import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Character, CharactersChache } from "../types/characterSchema";
import { FetchStatus } from "shared/api/types";
import { fetchCharacterById, fetchCharacters } from "entities/character/api";

export interface CharactersState {
  items: Character[];
  cache: CharactersChache;
  status: FetchStatus;
  error: string | null;
  count: number | null;
  search: string | null;
  page: number | null;
  characterOnEdit: Character | null;
  characterOnEditStatus: FetchStatus;
  characterOnEditError: string | null;
}

const initialState: CharactersState = {
  // character list
  items: [],
  cache: {},
  status: FetchStatus.IDLE,
  error: null,
  count: 1,
  page: 1,
  search: '',

  // editable character
  characterOnEdit: null,
  characterOnEditError: null,
  characterOnEditStatus: FetchStatus.IDLE,
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
    cacheUpdated: (state, action: PayloadAction<{ items: Character[], page: number }>) => {
      const { page, items } = action.payload;
      state.cache[page] = items;
    },
    characterOnEditCleared: (state) => {
      state.characterOnEdit = null;
    }
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
      .addCase(fetchCharacterById.pending, (state) => {
        state.characterOnEditStatus = FetchStatus.LOADING;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.characterOnEditStatus = FetchStatus.SUCCEDED;
        state.characterOnEdit = action.payload;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.characterOnEditStatus = FetchStatus.ERROR;
        state.characterOnEditError = action.error.message ?? null;
      })
  }
});

export const { actions: charactersActions } = charactersSlice;
export const { reducer: charactersReducer } = charactersSlice;