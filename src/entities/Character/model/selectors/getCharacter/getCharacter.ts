import { StateSchema } from "app/providers/store-provider";
import { Character } from "../../types/characterSchema";

export const getCharacter = (state: StateSchema, id: number): Character | undefined => 
  state.characters.items.find((character: Character) => character.id === id);