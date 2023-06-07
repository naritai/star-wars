import { createAsyncThunk } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/store-provider";
import { buildEndpoint, normalizeCharacter, normalizeCharacters } from "./helpers";
import { selectCharactersState } from "../model/slice/charactersSlice";
import { Character } from "../model/types/characterSchema";

export const CHARACTERS_API_BASE = 'https://swapi.dev/api/people';

interface CharactersHTTPResponse {
  [x: string]: any;
  body: ReadableStream<Uint8Array> | null;
  bodyUsed: boolean;
  headers: Headers;
  ok: boolean;
  redirected: boolean;
  status: number;
  statusText: string;
  type: string;
  url: string;
}

export interface NormalizedCharacters {
  count: number,
  items: Character[],
  currentPage?: number;
}

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (id: number): Promise<Character> => {
    const response: CharactersHTTPResponse = await fetch(`${CHARACTERS_API_BASE}/${id}`);

    const parsed = await response.json();
    const transformed = normalizeCharacter(parsed);
    return transformed;
  }
);

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { getState }): Promise<NormalizedCharacters> => {
  const { search, currentPage } = selectCharactersState(getState() as StateSchema);

  const params = { search, page: currentPage };
  const endpoint = buildEndpoint(CHARACTERS_API_BASE, params);
  const response: CharactersHTTPResponse = await fetch(endpoint);
  const parsed = await response.json();

  let payload: NormalizedCharacters = { count: parsed.count, currentPage, items: [] };

  // characters not found
  if (!parsed.results) {
    return payload;
  }

  payload.items = normalizeCharacters(parsed.results);
  return payload;
});