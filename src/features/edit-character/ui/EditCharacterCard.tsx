import { Grid, Card, Box } from '@mui/material';
import { EditCharacterForm } from './EditCharacterForm';
import { CHARACTERS_TEXT, Character } from 'entities/character';
import { useCharacterFetcher } from 'pages/character-details-page/ui/useCharacterFetcher';
import { useParams } from 'react-router';
import { ERROR_TEXTS } from 'shared/constants';
import { Message } from 'shared/ui/message';
import cls from './EditCharacterCard.module.scss';
import { LoadTrackableCardMedia } from 'shared/ui/load-trackable-image';
import { PageLoader as Spinner } from 'widgets/page-loader';

interface EditCharacterCardProps {
  className?: string;
  edit?: boolean;
}

const gridStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const cardMediaProps = {
  sx: { height: 535, width: 350, objectFit: 'cover' },
};

export function EditCharacterCard({
  edit = false,
}: EditCharacterCardProps): JSX.Element {
  const { id } = useParams();
  const [character, isLoading, error] = useCharacterFetcher(Number(id));

  if (isLoading) {
    return (
      <Box className={cls.centerer}>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return <Message text={error ?? ERROR_TEXTS.GENERAL_ERROR} error={true} />;
  }

  if (!character) {
    return <Message text={CHARACTERS_TEXT.NO_CHARACTERS_FOUND} />;
  }

  const { name, image } = character as Character;

  return (
    <Grid
      sx={gridStyles}
      container
      spacing={3}
      maxWidth={900}
      columns={{ xs: 12, md: 6, lg: 4 }}
    >
      <Grid>
        <Card sx={{ width: 350 }}>
          <LoadTrackableCardMedia
            imageSrc={image}
            alt={name}
            cardMediaProps={cardMediaProps}
            spinner={<Spinner />}
          />
        </Card>
      </Grid>
      <Grid>
        <EditCharacterForm character={character} edit={edit} />
      </Grid>
    </Grid>
  );
}
