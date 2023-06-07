import { classNames } from 'shared/lib/classNames';
import cls from './CharactersPage.module.scss';
import { charactersActions, selectCharactersState } from 'entities/character';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { ChangeEvent, useEffect } from 'react';
import { FetchStatus } from 'shared/api/types';
import { fetchCharacters } from 'entities/character/api';
import { AppDispatch } from 'app/providers/store-provider';
import { CharacterList } from 'widgets/character-list';
import { CharacterSearch } from 'features/character-search';
import { useSearchParams } from 'react-router-dom';

interface CharactersPageProps { 
  className?: string; 
}

const paginationStyles = {
  margin: 4
}

function Paginator() {
  const { currentPage, count } = useSelector(selectCharactersState);
  const dispatch = useDispatch<AppDispatch>();

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    dispatch(charactersActions.pageUpdated(page));
    dispatch(fetchCharacters());
  }

  if (count === 0) {
    return null;
  }

  return (
    <Pagination
      variant='outlined'
      shape='rounded'
      sx={paginationStyles}
      count={Math.ceil(count! / 10)}
      color="primary"
      size="large"
      page={currentPage!}
      onChange={handlePageChange}
    />
  )
}

export default function CharactersPage({ className }: CharactersPageProps): JSX.Element {
  const { status } = useSelector(selectCharactersState);
  const dispatch = useDispatch<AppDispatch>();
  const [params] = useSearchParams();
  const page = params.get('page');

  useEffect(() => {
    if (page) {
      dispatch(charactersActions.pageUpdated(Number(page)));
    }
  }, [page, dispatch]);

  useEffect(() => {
    if (status === FetchStatus.IDLE) {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  return (
    <div className={classNames(cls.characterspage, {}, [className])}>
      <CharacterSearch />
      <Paginator />
      <CharacterList />
    </div>
  )
}