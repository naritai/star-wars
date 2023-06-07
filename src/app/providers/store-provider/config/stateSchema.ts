import { CharactersState } from "entities/character";
import { EditableCharacterState } from "entities/character/model/slice/editableCharacterSlice";

export interface StateSchema {
  characters: CharactersState;
  editableCharacter: EditableCharacterState;
}