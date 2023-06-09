import { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from 'app/providers/store-provider';
import { selectCharactersState } from 'entities/character';
import { NormalizedCharacters, fetchCharacters } from 'entities/character/api';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from 'shared/api';

type CharactersPromise = Promise<
  PayloadAction<
    NormalizedCharacters,
    string,
    {
      arg: void;
      requestId: string;
      requestStatus: string;
    },
    never
  >
> & { abort: any };

export function useCharactersFetcher() {
  const { status } = useSelector(selectCharactersState);
  const dispatch = useDispatch<AppDispatch>();
  const [promiseQueue] = useState<CharactersPromise[]>([]);
  const [promiseCount, setPromiseCount] = useState<number>(0);

  // first render fetch
  useEffect(() => {
    if (status === FetchStatus.IDLE) {
      const promise = dispatch(fetchCharacters());
      promiseQueue.push(promise as CharactersPromise);
      setPromiseCount(promiseQueue.length);
    }
  }, [status, promiseQueue, dispatch]);

  // track new requests and abort prev requests
  // used instead of debouncing for more consistent and responsive UI
  useEffect(() => {
    return () => {
      while (promiseQueue.length > 1) {
        const promise = promiseQueue.shift();
        if (promise && status !== FetchStatus.SUCCEDED) {
          promise?.abort();
        }
      }
    };
  }, [promiseCount, promiseQueue, status, dispatch]);

  const handleFetchCharacters = useCallback(() => {
    const promise = dispatch(fetchCharacters());
    promiseQueue.push(promise as CharactersPromise);
    setPromiseCount(promiseQueue.length);
  }, [promiseQueue, dispatch]);

  return handleFetchCharacters;
}
