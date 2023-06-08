import { createSlice } from '@reduxjs/toolkit';
import { Character } from '../types/characterSchema';
import { FetchStatus } from 'shared/api';
import { fetchCharacterById } from 'entities/character/api';
import { StateSchema } from 'app/providers/store-provider';

export interface EditableCharacterState {
  editableCharacter: Character | null;
  error: string | null;
  status: FetchStatus;
}

const initialState: EditableCharacterState = {
  editableCharacter: null,
  error: null,
  status: FetchStatus.IDLE,
};

export const charactersSlice = createSlice({
  name: 'editableCharacter',
  initialState,
  reducers: {
    editableCharacterCleared: (state) => {
      state.editableCharacter = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacterById.pending, (state) => {
        state.status = FetchStatus.LOADING;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.status = FetchStatus.SUCCEDED;
        state.editableCharacter = action.payload;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.status = FetchStatus.ERROR;
        state.error = action.error.message ?? null;
      });
  },
});

export const selectEditableCharacterState = (
  state: StateSchema
): EditableCharacterState => state.editableCharacter;

export const { editableCharacterCleared } = charactersSlice.actions;
export const { reducer: editableCharacterReducer } = charactersSlice;
