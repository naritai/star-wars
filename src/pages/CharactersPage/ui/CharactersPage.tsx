import { classNames } from 'shared/lib/classNames';
import cls from './CharactersPage.module.scss';
import { mockPeopleData } from 'shared/mockData/characters';
import { CharacterCard } from 'entities/Character';
import Grid from '@mui/material/Unstable_Grid2';

interface CharactersPageProps { 
   className?: string; 
}

const gridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function CharactersPage({ className }: CharactersPageProps): JSX.Element {
  return (
    <div className={classNames(cls.characterspage, {}, [className])}>
      <Grid sx={gridStyles} container spacing={3} maxWidth={900} columns={{ xs: 12, md: 6, lg: 4 }}>
        {mockPeopleData.map((character) => (
          <Grid  display="flex" justifyContent="center" alignItems="center">
            <CharacterCard data={character} key={character.name} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}