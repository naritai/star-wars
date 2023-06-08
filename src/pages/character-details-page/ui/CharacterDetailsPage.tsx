import { classNames } from "shared/lib/classNames";
import { useParams } from "react-router-dom";
import { Box, Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { CHARACTERS_TEXT, Character } from "entities/character";
import { EditCharacterForm } from "features/edit-character";
import { Message } from "shared/ui/message";
import { ERROR_TEXTS } from "shared/constants";
import { Spinner } from "widgets/spinner";
import cls from "./CharacterDetailsPage.module.scss";
import { useCharacterFetcher } from "./useCharacterFetcher";

interface CharacterDetailsPageProps {
  className?: string;
  edit?: boolean;
}

const gridStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function CharacterDetailsPage({
  className,
  edit = false,
}: CharacterDetailsPageProps): JSX.Element {
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
    return <Message text={ERROR_TEXTS.GENERAL_ERROR} error={true} />;
  }

  if (!character) {
    return <Message text={CHARACTERS_TEXT.NO_CHARACTERS_FOUND} />;
  }

  const { name, image } = character as Character;

  return (
    <section className={classNames(cls.characterdetailspage, {}, [className])}>
      <Grid
        sx={gridStyles}
        container
        spacing={3}
        maxWidth={900}
        columns={{ xs: 12, md: 6, lg: 4 }}
      >
        <Grid>
          <Card sx={{ width: 350 }}>
            <CardMedia
              sx={{ height: 480, width: 350, objectFit: "cover" }}
              image={image}
              title={name}
              component="img"
            />
          </Card>
        </Grid>

        <Grid>
          <EditCharacterForm character={character} edit={edit} />
        </Grid>
      </Grid>
    </section>
  );
}
