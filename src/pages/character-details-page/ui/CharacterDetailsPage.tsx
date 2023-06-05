import { classNames } from 'shared/lib/classNames';
import cls from './CharacterDetailsPage.module.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { getCharacter } from 'entities/character/model/selectors/getCharacter/getCharacter';
import { StateSchema } from 'app/providers/store-provider';

interface CharacterDetailsPageProps { 
  className?: string; 
}

const gridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export default function CharacterDetailsPage({ className }: CharacterDetailsPageProps): JSX.Element {
  const { id } = useParams();
  const character = useSelector(state => getCharacter(state as StateSchema, Number(id)));

  if (!character) {
    return <div>Character not found with provided id: {id}</div>
  }

  const {
    name, height, mass, hairColor, skinColor, eyeColor, birthEear, gender, image
  } = character;

  return (
    <div className={classNames(cls.characterdetailspage, {}, [className])}>
      <Grid sx={gridStyles} container spacing={3} maxWidth={900} columns={{ xs: 12, md: 6, lg: 4 }}>
        <Grid>
          <Card sx={{ width: 300 }}>
            <CardMedia
              sx={{ height: 280, width: 300, objectFit: 'cover' }}
              image={image}
              title={name}
              component="img"
            />
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ width: 300 }}>
            <CardContent>
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
                Birth year: {birthEear}
              </Typography>
              <Typography>
                Gender: {gender}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="large" color="secondary">EDIT</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  )
}