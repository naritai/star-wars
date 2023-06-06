import { classNames } from 'shared/lib/classNames';
import cls from './CharacterList.module.scss';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { getAllCharacters, CharacterCard, getCharactersStatus, getCharactersError } from 'entities/character';
import { useSelector } from 'react-redux';
import { FetchStatus } from 'shared/api/types';

interface CharacterListProps { 
  className?: string; 
}

const gridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export function CharacterList({ className }: CharacterListProps): JSX.Element {
  const characters = useSelector(getAllCharacters);
  const status = useSelector(getCharactersStatus);
  const error = useSelector(getCharactersError);

  if (status === FetchStatus.LOADING) {
    return <div>Loading CHARACTERS...</div>;
  }

  if (error) {
    return <div>Something wen wrong...</div>
  }

  return (
    <div className={classNames(cls.characterlist, {}, [className])}>
      <Grid sx={gridStyles} container spacing={3} maxWidth={900} columns={{ xs: 12, md: 6, lg: 4 }}>
        {characters.map((character) => (
          <Grid key={character.name} display="flex" justifyContent="center" alignItems="center">
            <CharacterCard data={character} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}