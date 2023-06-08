import { classNames } from 'shared/lib/classNames';
import { selectCharactersState } from 'entities/character';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { FetchStatus } from 'shared/api/types';
import { NormalizedCharacters, fetchCharacters } from 'entities/character/api';
import { AppDispatch } from 'app/providers/store-provider';
import { CharacterList } from 'widgets/character-list';
import { CharacterSearch } from 'features/character-search';
import { CharactersPagination } from 'features/characters-pagination';
import cls from './CharactersPage.module.scss';
import { PayloadAction } from '@reduxjs/toolkit';

interface CharactersPageProps {
  className?: string;
}

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

export default function CharactersPage({
  className,
}: CharactersPageProps): JSX.Element {
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

  // track new requests and abort prev requests, except the last (newest)
  useEffect(() => {
    return () => {
      while (promiseQueue.length > 1) {
        const promise = promiseQueue.shift();
        if (promise) {
          promise?.abort();
        }
      }
    };
  }, [promiseCount, promiseQueue, dispatch]);

  const handleFetchCharacters = useCallback(() => {
    const promise = dispatch(fetchCharacters());
    promiseQueue.push(promise as CharactersPromise);
    setPromiseCount(promiseQueue.length);
  }, [promiseQueue, dispatch]);

  return (
    <section className={classNames(cls.characterspage, {}, [className])}>
      <CharacterSearch handleFetchCharacters={handleFetchCharacters} />
      <CharactersPagination handleFetchCharacters={handleFetchCharacters} />
      <CharacterList />
    </section>
  );
}
