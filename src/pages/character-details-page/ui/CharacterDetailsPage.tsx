import { classNames } from "shared/lib/classNames";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Card, CardMedia } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { AppDispatch, StateSchema } from "app/providers/store-provider";
import {
  CHARACTERS_TEXT,
  Character,
  selectCharacterById,
  selectEditableCharacterState,
} from "entities/character";
import { useEffect } from "react";
import { EditCharacterForm } from "features/edit-character";
import { useDispatch } from "react-redux";
import { FetchStatus } from "shared/api/types";
import { fetchCharacterById } from "entities/character/api";
import { Message } from "shared/ui/message";
import { ERROR_TEXTS } from "shared/constants";
import { Spinner } from "widgets/spinner";
import cls from "./CharacterDetailsPage.module.scss";

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
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();
  const character = useSelector((state) =>
    selectCharacterById(state as StateSchema, Number(id))
  );
  const { editableCharacter, error, status } = useSelector(
    selectEditableCharacterState
  );

  useEffect(() => {
    if (!character && status === FetchStatus.IDLE && id) {
      dispatch(fetchCharacterById(Number(id)));
    }
  }, [status, dispatch, id, character]);

  if (status === FetchStatus.LOADING) {
    return (
      <Box className={cls.centerer}>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return <Message text={ERROR_TEXTS.GENERAL_ERROR} error={true} />;
  }

  if (!character && !editableCharacter) {
    return <Message text={CHARACTERS_TEXT.NO_CHARACTERS_FOUND} />;
  }

  const resolvedCharacter = character || (editableCharacter as Character);
  const { name, image } = resolvedCharacter;

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
          <EditCharacterForm character={resolvedCharacter} edit={edit} />
        </Grid>
      </Grid>
    </section>
  );
}
