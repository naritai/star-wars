import { classNames } from 'shared/lib/classNames/';
import cls from './CharacterSeacrh.module.scss';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/store-provider';
import { fetchCharacters } from 'entities/character/api';
import { Input } from '@mui/material';
import { charactersActions } from 'entities/character';
import { useDebounce } from 'usehooks-ts';

interface CharacterSeacrhProps { 
  className?: string; 
}

export function CharacterSearch({ className }: CharacterSeacrhProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedValue = useDebounce<string>(searchValue, 500);

  useEffect(() => {
    dispatch(charactersActions.searchUpdated(debouncedValue));
    dispatch(fetchCharacters());
  }, [debouncedValue, dispatch])

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }

  return (
    <div className={classNames(cls.characterseacrh, {}, [className])}>
      <Input value={searchValue} placeholder="search character by name" onChange={handleSearch} />
    </div>
  )
}