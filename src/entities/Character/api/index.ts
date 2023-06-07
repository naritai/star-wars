import { createAsyncThunk } from "@reduxjs/toolkit";
import { StateSchema } from "app/providers/store-provider";
import { normalizeCharacter, normalizeCharacters } from "./helpers";
import { selectCharactersState } from "../model/slice/charactersSlice";
import { Character } from "../model/types/characterSchema";

export const CHARACTERS_API_BASE = 'https://swapi.dev/api/people';

interface CharactersHTTPResponse {
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
    // @ts-ignore
    const parsed = await response.json();
    const transformed = normalizeCharacter(parsed);
    return transformed;
  }
);

async function fetchCharactersBySearchQuery(search: string): Promise<CharactersHTTPResponse> {
  const response: CharactersHTTPResponse = await fetch(`${CHARACTERS_API_BASE}/?search=${search}`);
  return response;
}

async function fetchCharactersPage(currentPage: number): Promise<CharactersHTTPResponse> {
  const response: CharactersHTTPResponse = await fetch(`${CHARACTERS_API_BASE}/?page=${currentPage}`);
  return response;
}

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { getState }): Promise<NormalizedCharacters> => {
  const { search, currentPage } = selectCharactersState(getState() as StateSchema);

  let response;

  if (search) {
    response = await fetchCharactersBySearchQuery(search);
  } else {
    response = await fetchCharactersPage(currentPage);
  }
  // @ts-ignore
  const parsed = await response.json();
  const normalized = normalizeCharacters(parsed.results);
  const payload = {
    items: normalized,
    count: parsed.count,
    currentPage
  }

  return payload;
});