import { classNames } from 'shared/lib/classNames/';
import cls from './CharacterSeacrh.module.scss';
import { ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'app/providers/store-provider';
import { fetchCharacters } from 'entities/character/api';
import { Input } from '@mui/material';
import { charactersActions } from 'entities/character';
import { useSelector } from 'react-redux';
import { getCharactersSearch } from 'entities/character/model/selectors/characterSelectors';

interface CharacterSeacrhProps { 
  className?: string; 
}

export function CharacterSearch({ className }: CharacterSeacrhProps): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector(getCharactersSearch);

  const handleSearchCharacter = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(charactersActions.searchUpdated(event.target.value));
    dispatch(fetchCharacters());
  }

  return (
    <div className={classNames(cls.characterseacrh, {}, [className])}>
      <Input value={search} placeholder="search character by name" onChange={handleSearchCharacter} />
    </div>
  )
}