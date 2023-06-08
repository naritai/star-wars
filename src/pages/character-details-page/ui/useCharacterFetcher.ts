import { AppDispatch, StateSchema } from 'app/providers/store-provider';
import {
  Character,
  selectCharacterById,
  selectEditableCharacterState,
} from 'entities/character';
import { fetchCharacterById } from 'entities/character/api';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FetchStatus } from 'shared/api';

export function useCharacterFetcher(id: number) {
  const dispatch = useDispatch<AppDispatch>();
  const [resolvedCharacter, setResolvedCharacter] = useState<Character>();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const prefetchedCharacter = useSelector((state) =>
    selectCharacterById(state as StateSchema, Number(id))
  );

  const {
    editableCharacter: refetchedCharacter,
    error: refetchError,
    status: refetchStatus,
  } = useSelector(selectEditableCharacterState);

  useEffect(() => {
    setError(refetchError!);
    setIsLoading(refetchStatus === FetchStatus.LOADING ? true : false);
  }, [refetchError, refetchStatus]);

  useEffect(() => {
    if (prefetchedCharacter) {
      setResolvedCharacter(prefetchedCharacter);
      return;
    }

    if (refetchedCharacter) {
      setResolvedCharacter(refetchedCharacter);
      return;
    }

    if (refetchStatus === FetchStatus.IDLE && id) {
      setIsLoading(true);
      dispatch(fetchCharacterById(Number(id)));
    }
  }, [dispatch, id, refetchStatus, prefetchedCharacter, refetchedCharacter]);

  return [resolvedCharacter, isLoading, error] as [Character, boolean, string];
}
