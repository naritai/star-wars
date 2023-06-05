import { StateSchema } from "app/providers/store-provider"
import { getCharacters } from "./getCharacters"
import { DeepPartial } from "@reduxjs/toolkit"

describe('getCharacter', () => {
  test('should return characters slice', () => {
    const state: DeepPartial<StateSchema> ={
      characters: { items: [] }
    }
    expect(getCharacters(state as StateSchema)).toEqual({ items: [] });
  });
});