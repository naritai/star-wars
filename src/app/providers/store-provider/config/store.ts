import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./stateSchema";
import { charactersReducer } from "entities/character";
import { NODE_ENVS } from "shared/types/types";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      characters: charactersReducer
    },
    preloadedState: initialState,
    devTools: process.env.NODE_ENV === NODE_ENVS.DEV
  })
}


export const store = createReduxStore();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

