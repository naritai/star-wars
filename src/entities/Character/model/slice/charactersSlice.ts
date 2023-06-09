import {
  EntityState,
  PayloadAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Character } from '../types/characterSchema';
import { FetchStatus } from 'shared/api';
import { NormalizedCharacters, fetchCharacters } from 'entities/character/api';
import { StateSchema } from 'app/providers/store-provider';
import { TOTAL_CHARACTERS, DEFAULT_PAGE } from 'entities/character/constants';
import { ERROR_TEXTS } from 'shared/constants';

export const ABORT_ERROR_MSG = 'AbortError';

export interface CharactersState extends EntityState<Character> {
  status: FetchStatus;
  error: string | null;
  count: number;
  countTotal: number | null;
  search: string;
  currentPage: number;
}

const charactersAdapter = createEntityAdapter<Character>();

const initialState: CharactersState = charactersAdapter.getInitialState({
  status: FetchStatus.IDLE,
  error: null,
  count: 0,
  countTotal: TOTAL_CHARACTERS,
  currentPage: DEFAULT_PAGE,
  search: '',
});

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    pageUpdated: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    searchUpdated: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      state.currentPage = DEFAULT_PAGE;
      state.count = state.search === '' ? TOTAL_CHARACTERS : state.count;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.status = FetchStatus.LOADING;
        state.error = null;
      })
      .addCase(
        fetchCharacters.fulfilled,
        (state, action: PayloadAction<NormalizedCharacters>) => {
          const { count, items, currentPage } = action.payload;
          charactersAdapter.setAll(state, items);
          state.status = FetchStatus.SUCCEDED;
          state.count = count;
          state.currentPage = currentPage ?? state.currentPage;
          state.error = null;
        }
      )
      .addCase(fetchCharacters.rejected, (state, action) => {
        // return early, because we manually abort requests
        if (action.error.name === ABORT_ERROR_MSG) {
          return;
        }
        state.status = FetchStatus.ERROR;
        state.error = action.error.message ?? ERROR_TEXTS.GENERAL_ERROR;
      });
  },
});

export const {
  selectAll: selectAllCharacters,
  selectById: selectCharacterById,
  selectIds: selectCharacterIds,
} = charactersAdapter.getSelectors(
  (state: StateSchema): EntityState<Character> => state.characters
);

export const selectCharactersState = (state: StateSchema): CharactersState =>
  state.characters;
export const { actions: charactersActions } = charactersSlice;
export const { reducer: charactersReducer } = charactersSlice;
