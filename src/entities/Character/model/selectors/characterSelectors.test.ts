import { StateSchema } from "app/providers/store-provider";
import { getAllCharacters } from "./characterSelectors";
import { DeepPartial } from "@reduxjs/toolkit";

describe('getCharacter', () => {
  test('should return characters slice', () => {
    const state: DeepPartial<StateSchema> ={
      characters: { items: [] }
    }
    expect(getAllCharacters(state as StateSchema)).toEqual({ items: [] });
  });
});