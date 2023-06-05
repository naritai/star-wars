import { StateSchema } from "app/providers/store-provider";
import { CharactersState } from "../../slice/characterSlice";

export const getCharacters = (state: StateSchema): CharactersState => state.characters;