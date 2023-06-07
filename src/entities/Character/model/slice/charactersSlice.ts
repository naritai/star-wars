import { EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Character } from "../types/characterSchema";
import { FetchStatus } from "shared/api/types";
import { NormalizedCharacters, fetchCharacters } from "entities/character/api";
import { StateSchema } from "app/providers/store-provider";

export interface CharactersState extends EntityState<Character> {
  status: FetchStatus;
  error: string | null;
  count: number;
  countTotal: number | null;
  search: string | null;
  currentPage: number;
}

const charactersAdapter = createEntityAdapter<Character>();

const initialState: CharactersState = charactersAdapter.getInitialState({
  status: FetchStatus.IDLE,
  error: null,
  count: 1,
  countTotal: null,
  currentPage: 1,
  search: '',
})

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    pageUpdated: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    searchUpdated: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.count = state.search === '' ? Number(state.countTotal) : state.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(fetchCharacters.fulfilled, (state, action: PayloadAction<NormalizedCharacters>) => {
        const { count, currentPage, items } = action.payload;
        charactersAdapter.setAll(state, items);
        state.status = FetchStatus.SUCCEDED;
        state.count = count;
        state.countTotal = currentPage === 1 && state.search === '' ? count : state.countTotal;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = FetchStatus.ERROR;
        state.error = action.error.message ?? null;
      })
  }
});

export const {
  selectAll: selectAllCharacters,
  selectById: selectCharacterById,
  selectIds: selectCharacterIds
} = charactersAdapter.getSelectors((state: StateSchema): EntityState<Character> => state.characters);

export const selectCharactersState = (state: StateSchema): CharactersState => state.characters;
export const { actions: charactersActions } = charactersSlice;
export const { reducer: charactersReducer } = charactersSlice;