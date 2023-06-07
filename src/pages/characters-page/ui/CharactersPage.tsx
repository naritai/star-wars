import { classNames } from 'shared/lib/classNames';
import cls from './CharactersPage.module.scss';
import { charactersActions, selectCharactersState } from 'entities/character';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchStatus } from 'shared/api/types';
import { fetchCharacters } from 'entities/character/api';
import { AppDispatch } from 'app/providers/store-provider';
import { CharacterList } from 'widgets/character-list';
import { CharacterSearch } from 'features/character-search';
import { useSearchParams } from 'react-router-dom';
import { CharactersPagination } from 'features/characters-pagination';

interface CharactersPageProps { 
  className?: string; 
}

export default function CharactersPage({ className }: CharactersPageProps): JSX.Element {
  const { status } = useSelector(selectCharactersState);
  const dispatch = useDispatch<AppDispatch>();
  const [params] = useSearchParams();
  const page = params.get('page');
  const search = params.get('search');

  useEffect(() => {
    if (page) {
      dispatch(charactersActions.pageUpdated(Number(page)));
    }
    if (search) {
      dispatch(charactersActions.searchUpdated(search));
    }
    if (page || search) {
      dispatch(fetchCharacters());
    }
  }, [page, search, dispatch]);

  useEffect(() => {
    if (status === FetchStatus.IDLE) {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  return (
    <section className={classNames(cls.characterspage, {}, [className])}>
      <CharacterSearch defaultValue={search ?? ''} />
      <CharactersPagination />
      <CharacterList />
    </section>
  )
}