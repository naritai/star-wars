import { StateSchema } from "app/providers/store-provider";
import { FetchStatus } from "shared/api/types";

export const getStatus = (state: StateSchema): FetchStatus => state.characters.status;