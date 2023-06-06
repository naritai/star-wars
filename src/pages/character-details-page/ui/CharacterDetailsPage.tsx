import { classNames } from 'shared/lib/classNames';
import cls from './CharacterDetailsPage.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { AppDispatch, StateSchema } from 'app/providers/store-provider';
import { Character, getCharacterById } from 'entities/character';
import { useEffect, useState } from 'react';
import { EditCharacterForm } from 'features/edit-character';
import { useLocalStorage } from 'usehooks-ts';
import { getCharacterOnEdit, getCharacterOnEditError, getCharacterOnEditStatus } from 'entities/character/model/selectors/characterSelectors';
import { useDispatch } from 'react-redux';
import { FetchStatus } from 'shared/api/types';
import { fetchCharacterById } from 'entities/character/api';

interface CharacterDetailsPageProps { 
  className?: string;
  edit?: boolean;
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

export default function CharacterDetailsPage({ className, edit = false }: CharacterDetailsPageProps): JSX.Element {
  const [editting, setEditing] = useState(edit);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const character = useSelector(state => getCharacterById(state as StateSchema, Number(id)));
  const editableCharacter = useSelector(getCharacterOnEdit) as Character;
  const editableCharcterError = useSelector(getCharacterOnEditError);
  const editableCharcterStatus = useSelector(getCharacterOnEditStatus);

  useEffect(() => {
    const idleStatus = editableCharcterStatus === FetchStatus.IDLE;
    if (!character && idleStatus && id) {
      dispatch(fetchCharacterById(Number(id)));
    }
  }, [editableCharcterStatus, dispatch, id, character]);


  const handleEditCharacter = () => {
    setEditing(true);
    navigate(`/characters/${id}/edit`);
  };

  const handleEditCancel = () => {
    setEditing(false);
    navigate(`/characters/${id}`);
  };

  if (editableCharcterError) {
    return <div>Something went wrong... sorry.</div>
  }

  if (editableCharcterStatus === FetchStatus.LOADING) {
    return <div>Loading character...</div>
  }

  if (!character && !editableCharacter) {
    return <div>Character not found with provided id: {id}</div>
  }

  const resolvedCharacter = character || editableCharacter;
  const { name, image } = resolvedCharacter;

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
                  ? <EditCharacterForm character={resolvedCharacter} onCancel={handleEditCancel} /> 
                  : <StaticContent character={resolvedCharacter} /> 
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