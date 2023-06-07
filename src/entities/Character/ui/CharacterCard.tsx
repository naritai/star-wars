import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Color from "color";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "shared/config/routeConfig";
import { useLocalStorage } from "usehooks-ts";
import { Character } from "../model/types/characterSchema";
import { EntityId } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { selectCharacterById } from "../model/slice/charactersSlice";
import { StateSchema } from "app/providers/store-provider";

const actionAreaStyles = {
  transition: '0.2s',
  '&:hover': {
    transform: 'scale(1.03)',
  },
}

const cardStyles = {
  width: 250,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: `0 3px 9px 0 ${Color('#2a2830')
      .rotate(-12)
      .darken(0.2)
      .fade(0.5)}`,
  },
  '&:hover .character-name': {
    color: 'primary.main'
  }
}

const nameStyles = {
  maxWidth: 250,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}

interface CharacterCardProps {
  characterId: EntityId;
}

export const CharacterCard = ({ characterId }: CharacterCardProps) => {
  const navigate = useNavigate();
  const character = useSelector<StateSchema>(state => selectCharacterById(state, characterId));
  const [LSCharacter] = useLocalStorage<Partial<Character>>(`characters:${characterId}`, character as Partial<Character>);
  const { name, image, id } = LSCharacter ?? character;

  const handleCharacterClick = () => {
    navigate(`/${AppRoutes.CHARACTERS}/${id}`);
  }

  return (
    <CardActionArea sx={actionAreaStyles} onClick={handleCharacterClick}>
      <Card sx={cardStyles}>
        <CardMedia
          sx={{ height: 280, objectFit: 'cover' }}
          image={image}
          title={name}
          component="img"
        />
        <CardContent>
          <Typography className="character-name" sx={nameStyles} variant="h6" component="div" align="center">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}