import { classNames } from 'shared/lib/classNames/';
import cls from './CharacterSeacrh.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/store-provider';
import { Input, Paper } from '@mui/material';
import { charactersActions, selectCharactersState } from 'entities/character';
import { useDebounce } from 'usehooks-ts';
import { useSelector } from 'react-redux';

interface CharacterSeacrhProps {
  className?: string;
  handleFetchCharacters: () => void;
}

export function CharacterSearch({
  className,
  handleFetchCharacters,
}: CharacterSeacrhProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const { search } = useSelector(selectCharactersState);
  const [searchValue, setSearchValue] = useState<string>(search);
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const firstUpdate = useRef<boolean>(true);

  useEffect(() => {
    // skip first useDebounce update
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    dispatch(charactersActions.searchUpdated(debouncedValue));
    handleFetchCharacters();
  }, [debouncedValue, handleFetchCharacters, dispatch]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <section className={classNames(cls.characterseacrh, {}, [className])}>
      <Paper elevation={2} sx={{ padding: 3, width: '100%' }}>
        <Input
          sx={{ width: '100%', fontSize: '1.3em' }}
          value={searchValue}
          placeholder="type character name..."
          onChange={handleSearch}
        />
      </Paper>
    </section>
  );
}
