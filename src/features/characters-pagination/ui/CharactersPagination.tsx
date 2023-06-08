import { Pagination } from '@mui/material';
import { AppDispatch } from 'app/providers/store-provider';
import { selectCharactersState, charactersActions } from 'entities/character';
import { fetchCharacters } from 'entities/character/api';
import { ChangeEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FetchStatus } from 'shared/api';

const DEFAULT_PAGINATION_COUNT = 10;

export function CharactersPagination(): JSX.Element {
  const { currentPage, count, status } = useSelector(selectCharactersState);
  const [resolvedCount, setResolvedCount] = useState(DEFAULT_PAGINATION_COUNT);
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (count && currentPage) {
      setResolvedCount(Math.ceil(count! / 10));
      setDisabled(false);
    }
  }, [currentPage, count]);

  const handlePageChange = (_: ChangeEvent<unknown>, page: number) => {
    dispatch(charactersActions.pageUpdated(page));
    dispatch(fetchCharacters());
  };

  const disablePagination = disabled || status === FetchStatus.LOADING;

  return (
    <Pagination
      variant="outlined"
      shape="rounded"
      sx={{ m: 4 }}
      count={resolvedCount}
      color="primary"
      size="large"
      page={currentPage}
      onChange={handlePageChange}
      disabled={disablePagination}
    />
  );
}
