import { configureStore } from "@reduxjs/toolkit";
import { StateSchema } from "./stateSchema";
import { charactersReducer } from "entities/character";

export function createReduxStore(initialState?: StateSchema) {
  return configureStore<StateSchema>({
    reducer: {
      characters: charactersReducer
    },
    preloadedState: initialState,
    devTools: process.env.NODE_ENV === 'development'
  })
}