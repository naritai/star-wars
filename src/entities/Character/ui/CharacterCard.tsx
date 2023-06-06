import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import Color from "color";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "shared/config/routeConfig";
import { useLocalStorage } from "usehooks-ts";
import { Character } from "../model/types/characterSchema";

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
}

export const CharacterCard = ({ data }: any) => {
  const navigate = useNavigate();
  const [LSCharacter] = useLocalStorage<Partial<Character>>(`characters:${data.id}`, data);
  const { name, image, id } = LSCharacter ?? data;

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
          <Typography gutterBottom variant="h6" component="div" align="center">
            {name}
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  )
}