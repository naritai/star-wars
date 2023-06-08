import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "shared/config/routeConfig";
import { useLocalStorage } from "usehooks-ts";
import { Character } from "../model/types/characterSchema";
import { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectCharacterById } from "../model/slice/charactersSlice";
import { StateSchema } from "app/providers/store-provider";
import cls from "./CharacterCard.module.scss";

const actionAreaStyles = {
  transition: "0.2s",
  "&:hover": {
    transform: "scale(1.03)",
  },
};

const cardStyles = {
  width: 250,
  boxShadow: "none",
  "&:hover .character-name": {
    color: "orangered",
  },
};

const nameStyles = {
  maxWidth: 250,
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

interface CharacterCardProps {
  characterId: EntityId;
}

export const CharacterCard = ({ characterId }: CharacterCardProps) => {
  const navigate = useNavigate();
  const character = useSelector<StateSchema>((state) =>
    selectCharacterById(state, characterId)
  );
  const [LSCharacter] = useLocalStorage<Partial<Character>>(
    `characters:${characterId}`,
    character as Partial<Character>
  );
  const { name, image, id } = LSCharacter ?? character;

  const handleCharacterClick = () => {
    navigate(`/${AppRoutes.CHARACTERS}/${id}`);
  };

  return (
    <CardActionArea sx={actionAreaStyles} onClick={handleCharacterClick}>
      <Card sx={cardStyles} className={cls.test}>
        <CardMedia
          sx={{ height: 280, objectFit: "cover" }}
          image={image}
          title={name}
          component="img"
        />
        <CardContent>
          <Typography
            className="character-name"
            sx={nameStyles}
            variant="h6"
            component="div"
            align="center"
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};
