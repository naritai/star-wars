import { RawCharacter, Character } from "../model/types/characterSchema";

export const CHARACTERS_IMAGE_BASE =
  "https://starwars-visualguide.com/assets/img/characters";

export function parseId(url: string): number {
  const idRegExp = /\/([0-9]*)\/$/;
  const id = url.match(idRegExp)![1];
  return Number(id);
}

export function getCharacterImage(id: number): string {
  return `${CHARACTERS_IMAGE_BASE}/${id}.jpg`;
}

export function normalizeCharacter(raw: RawCharacter): Character {
  const {
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    mass,
    name,
    skin_color,
    url,
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
  };
}

export function normalizeCharacters(raw: RawCharacter[]): Character[] {
  return raw.map(normalizeCharacter);
}
