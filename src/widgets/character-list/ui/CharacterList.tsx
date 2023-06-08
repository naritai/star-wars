import { classNames } from "shared/lib/classNames";
import cls from "./CharacterList.module.scss";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import {
  CharacterCard,
  selectCharacterIds,
  selectCharactersState,
} from "entities/character";
import { useSelector } from "react-redux";
import { FetchStatus } from "shared/api/types";
import { EntityId } from "@reduxjs/toolkit";
import { Spinner } from "widgets/spinner";
import { Message } from "shared/ui/message";
import { CHARACTERS_TEXT } from "entities/character";
import { ERROR_TEXTS } from "shared/constants";

interface CharacterListProps {
  className?: string;
}

const gridStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export function CharacterList({ className }: CharacterListProps): JSX.Element {
  const characterIds = useSelector(selectCharacterIds);
  const { status, error } = useSelector(selectCharactersState);

  if (status === FetchStatus.LOADING) {
    return <Spinner className={cls.offsetter} />;
  }

  if (error) {
    return (
      <Message
        className={cls.offsetter}
        text={ERROR_TEXTS.GENERAL_ERROR}
        error={true}
      />
    );
  }

  if (status === FetchStatus.SUCCEDED && characterIds.length === 0) {
    return (
      <Message
        className={cls.offsetter}
        text={CHARACTERS_TEXT.NO_CHARACTERS_FOUND}
      />
    );
  }

  return (
    <section className={classNames(cls.characterlist, {}, [className])}>
      <Grid
        sx={gridStyles}
        container
        spacing={3}
        maxWidth={900}
        columns={{ xs: 12, md: 6, lg: 4 }}
      >
        {characterIds.map((idx: EntityId) => (
          <Grid key={idx} sx={gridStyles}>
            <CharacterCard characterId={idx} />
          </Grid>
        ))}
      </Grid>
    </section>
  );
}
