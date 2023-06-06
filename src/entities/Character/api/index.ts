import { createAsyncThunk } from "@reduxjs/toolkit";
import { Character, RawCharacter } from "../model/types/characterSchema";
import { RootState } from "app/providers/store-provider";

export const CHARACTERS_API_BASE = 'https://swapi.dev/api/people';
export const CHARACTERS_IMAGE_BASE = 'https://starwars-visualguide.com/assets/img/characters';

function parseId(url: string): number {
  const idRegExp = /\/([0-9]*)\/$/;
  const id = url.match(idRegExp)![1];
  return Number(id);
}

function getCharacterImage(id: number): string {
  return `${CHARACTERS_IMAGE_BASE}/${id}.jpg`;
}

function transformCharacters(raw: RawCharacter[]): Character[] {
  return raw.map((raw: RawCharacter) => {
    const { 
      birth_year, eye_color, gender, hair_color,
      height, mass, name, skin_color, url 
    } = raw;

    const id = parseId(url);

    return {
      id,
      name,
      gender,
      height: Number(height),
      mass: Number(mass),
      image: getCharacterImage(id),
      hairColor: hair_color,
      skinColor: skin_color,
      eyeColor: eye_color,
      birthYear: birth_year,
    }
  });
}

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { getState }) => {
  const { characters } = getState() as RootState;
  const { search, page } = characters;

  let response;

  if (search) {
    response = await fetch(`${CHARACTERS_API_BASE}/?search=${search}`);
  } else {
    response = await fetch(`${CHARACTERS_API_BASE}/?page=${page}`);
  }

  const parsed = await response.json();

  const payload = {
    items: transformCharacters(parsed.results),
    count: parsed.count,
  }
  return payload;

});