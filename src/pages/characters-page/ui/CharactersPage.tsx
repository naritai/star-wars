import { classNames } from 'shared/lib/classNames';
import cls from './CharactersPage.module.scss';
import { CharacterCard, charactersActions } from 'entities/character';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from 'entities/character';
import { Button } from '@mui/material';

interface CharactersPageProps { 
   className?: string; 
}

const gridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function CharactersPage({ className }: CharactersPageProps): JSX.Element {
  const { items } = useSelector(getCharacters);
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(charactersActions.charactersFiltered('Luke'))
  }

  return (
    <div className={classNames(cls.characterspage, {}, [className])}>
      <Button variant='contained' onClick={handleSearch}>Find Luke!</Button>
      <Grid sx={gridStyles} container spacing={3} maxWidth={900} columns={{ xs: 12, md: 6, lg: 4 }}>
        {items.map((character) => (
          <Grid key={character.name} display="flex" justifyContent="center" alignItems="center">
            <CharacterCard data={character} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}