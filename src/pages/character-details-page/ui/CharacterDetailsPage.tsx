import { classNames } from 'shared/lib/classNames';
import cls from './CharacterDetailsPage.module.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { StateSchema } from 'app/providers/store-provider';
import { Character, getCharacterById } from 'entities/character';
import { useState } from 'react';
import { EditCharacterForm } from 'features/edit-character';
import { useLocalStorage } from 'usehooks-ts';

interface CharacterDetailsPageProps { 
  className?: string; 
}

const gridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

type StaicContentProps = {
  character: Character;
}

function StaticContent({ character }: StaicContentProps) {
  const [LSCharacter] = useLocalStorage<Partial<Character>>(`characters:${character.id}`, character);
  const { name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender } = LSCharacter;
  return (
    <>
      <Typography>
        Name: {name}
      </Typography>
      <Typography>
        Height: {height}
      </Typography>
      <Typography>
        Mass: {mass}
      </Typography>
      <Typography>
        Hair color: {hairColor}
      </Typography>
      <Typography>
        Skin color: {skinColor}
      </Typography>
      <Typography>
        Eye Color: {eyeColor}
      </Typography>
      <Typography>
        Birth year: {birthYear}
      </Typography>
      <Typography>
        Gender: {gender}
      </Typography>
    </>
  )
}

export default function CharacterDetailsPage({ className }: CharacterDetailsPageProps): JSX.Element {
  const [editting, setEditing] = useState(false);
  const { id } = useParams();

  const character = useSelector(state => getCharacterById(state as StateSchema, Number(id)));

  const handleEditCharacter = () => setEditing(true);

  if (!character) {
    return <div>Character not found with provided id: {id}</div>
  }

  const { name, image } = character;

  return (
    <div className={classNames(cls.characterdetailspage, {}, [className])}>
      <Grid sx={gridStyles} container spacing={3} maxWidth={900} columns={{ xs: 12, md: 6, lg: 4 }}>
        <Grid>
          <Card sx={{ width: 350 }}>
            <CardMedia
              sx={{ height: 480, width: 350, objectFit: 'cover' }}
              image={image}
              title={name}
              component="img"
            />
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ width: 300, height: 480 }}>
            <CardContent>
              {
                editting 
                  ? <EditCharacterForm character={character} onCancel={() => setEditing(false)} /> 
                  : <StaticContent character={character} /> 
              }
            </CardContent>
            <CardActions>
              <Button size="large" color="secondary" onClick={handleEditCharacter}>EDIT</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}