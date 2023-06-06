import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/providers/store-provider";
import { charactersActions } from "../model/slice/characterSlice";
import { transformCharacter, transformCharacters } from "./helpers";

export const CHARACTERS_API_BASE = 'https://swapi.dev/api/people';

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (id: number) => {
    const response = await fetch(`${CHARACTERS_API_BASE}/${id}`);
    const parsed = await response.json();
    const transformed = transformCharacter(parsed);
    return transformed;
  }
)

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { getState, dispatch }) => {
  const { characters } = getState() as RootState;
  const { search, page, cache, count } = characters;

  if (page && cache[page]) {
    return { items: cache[page], count };
  }

  let response;

  if (search) {
    response = await fetch(`${CHARACTERS_API_BASE}/?search=${search}`);
  } else {
    response = await fetch(`${CHARACTERS_API_BASE}/?page=${page}`);
  }

  const parsed = await response.json();
  const transformed = transformCharacters(parsed.results);

  if (page) {
    dispatch(charactersActions.cacheUpdated(
      { page, items: transformed }
    ));
  }

  const payload = {
    items: transformed,
    count: parsed.count,
  }

  return payload;
});