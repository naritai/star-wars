import { StateSchema } from "app/providers/store-provider";

export const getError = (state: StateSchema): string | null => state.characters.error;