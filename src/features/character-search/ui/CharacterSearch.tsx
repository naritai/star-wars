import { classNames } from 'shared/lib/classNames/';
import cls from './CharacterSeacrh.module.scss';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/store-provider';
import { fetchCharacters } from 'entities/character/api';
import { Input, Paper } from '@mui/material';
import { charactersActions } from 'entities/character';
import { useDebounce } from 'usehooks-ts';

interface CharacterSeacrhProps { 
  className?: string;
}

export function CharacterSearch({ className }: CharacterSeacrhProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 500);
  const firstUpdate = useRef(true);

  useEffect(() => {
    // skip first useDebounce update
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    dispatch(charactersActions.searchUpdated(debouncedValue));
    dispatch(fetchCharacters());
  }, [debouncedValue, dispatch]);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  return (
    <section className={classNames(cls.characterseacrh, {}, [className])}>
      <Paper elevation={2} sx={{ padding: 3, width: '100%' }}>
        <Input
          sx={{ width: '100%', fontSize: "1.3em" }}
          value={searchValue}
          placeholder="type character name..."
          onChange={handleSearch}
        />
      </Paper>
    </section>
  )
}