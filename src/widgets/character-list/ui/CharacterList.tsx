import { classNames } from 'shared/lib/classNames';
import cls from './CharacterList.module.scss';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { CharacterCard, selectCharacterIds, selectCharactersState } from 'entities/character';
import { useSelector } from 'react-redux';
import { FetchStatus } from 'shared/api/types';
import { EntityId } from '@reduxjs/toolkit';

interface CharacterListProps { 
  className?: string; 
}

const gridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export function CharacterList({ className }: CharacterListProps): JSX.Element {
  const characterIds = useSelector(selectCharacterIds);
  const { status, error } = useSelector(selectCharactersState);

  if (status === FetchStatus.LOADING) {
    return <div>Loading CHARACTERS...</div>;
  }

  if (error) {
    return <div>Something went wrong...</div>
  }

  if (characterIds.length === 0) {
    return (<div>No characters found...</div>)
  }

  return (
    <div className={classNames(cls.characterlist, {}, [className])}>
      <Grid sx={gridStyles} container spacing={3} maxWidth={900} columns={{ xs: 12, md: 6, lg: 4 }}>
        {characterIds.map((idx: EntityId) => (
          <Grid key={idx} display="flex" justifyContent="center" alignItems="center">
            <CharacterCard characterId={idx} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}