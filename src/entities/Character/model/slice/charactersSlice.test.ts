import { DeepPartial } from '@reduxjs/toolkit';
import {
  CharactersState,
  charactersActions,
  charactersReducer,
} from './charactersSlice';

describe('characterSlice', () => {
  // TODO: uncomment when use real data
  // test('should work with empty state', () => {
  //   expect(charactersReducer(undefined, charactersActions.charactersFiltered('Luke'))).toEqual({
  //     items: []
  //   });
  // });
  // test('filter action should filter items by name', () => {
  //   const state: DeepPartial<CharactersState> = {
  //     items: [
  //       {
  //         name: "Luke Skywalker",
  //       },
  //       {
  //         name: "C-3PO",
  //       },
  //       {
  //         name: "R2-D2",
  //       }
  //     ]
  //   };
  //   expect(
  //     charactersReducer(state as CharactersState, charactersActions.charactersFiltered('Luke'))
  //   ).toEqual({
  //     items: [{ name: "Luke Skywalker", }]
  //   })
  // });
});
