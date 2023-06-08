import { classNames } from "shared/lib/classNames";
import cls from "./EditCharacterForm.module.scss";
import { Character, editableCharacterCleared } from "entities/character";
import { useState, ChangeEvent, FormEvent, Fragment } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Gender } from "entities/character/model/types/characterSchema";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "app/providers/store-provider";
import { useDispatch } from "react-redux";

interface EditCharacterFormProps {
  className?: string;
  character: Character;
  edit?: boolean;
}

const formControlStyle = {
  minWidth: 250,
};

export function EditCharacterForm(props: EditCharacterFormProps): JSX.Element {
  const { className, character, edit = false } = props;
  const [editting, setEditing] = useState<boolean>(edit);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [LSCharacter, setLSCharacter] = useLocalStorage<Partial<Character>>(
    `characters:${character.id}`,
    character
  );
  const { image, id, ...rest } = LSCharacter;
  const [formData, setFormData] = useState<Partial<Character>>(rest);

  const {
    name,
    height,
    mass,
    hairColor,
    skinColor,
    eyeColor,
    birthYear,
    gender,
  } = formData;

  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: Partial<Character>) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleGenderChange = (event: SelectChangeEvent) => {
    setFormData((prev: Partial<Character>) => ({
      ...prev,
      gender: event.target.value as Gender,
    }));
  };

  const handleEditSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLSCharacter({ ...formData, image, id });
    setEditing(false);
  };

  const handleEditStart = () => {
    setEditing(true);
    navigate(`/characters/${id}/edit`);
  };

  const handleEditCancel = () => {
    setEditing(false);
    navigate(`/characters/${id}`);
    dispatch(editableCharacterCleared);
  };

  return (
    <Card sx={{ width: 300, height: 480 }}>
      <CardContent>
        <form
          onSubmit={handleEditSubmit}
          className={classNames(cls.editcharacterform, {}, [className])}
        >
          <FormControl variant="standard" sx={formControlStyle}>
            <InputLabel id="name">Name</InputLabel>
            <Input
              name="name"
              id="name"
              value={name}
              onChange={handleValueChange}
              disabled={!editting}
            />
          </FormControl>

          <FormControl variant="standard" sx={formControlStyle}>
            <InputLabel id="height">Height</InputLabel>
            <Input
              name="height"
              id="height"
              value={height}
              onChange={handleValueChange}
              disabled={!editting}
            />
          </FormControl>

          <FormControl variant="standard" sx={formControlStyle}>
            <InputLabel id="mass">Mass</InputLabel>
            <Input
              name="mass"
              id="mass"
              value={mass}
              onChange={handleValueChange}
              disabled={!editting}
            />
          </FormControl>

          <FormControl variant="standard" sx={formControlStyle}>
            <InputLabel id="hairColor">Hair Color</InputLabel>
            <Input
              name="hairColor"
              id="hairColor"
              value={hairColor}
              onChange={handleValueChange}
              disabled={!editting}
            />
          </FormControl>

          <FormControl variant="standard" sx={formControlStyle}>
            <InputLabel id="skinColor">Skin Color</InputLabel>
            <Input
              name="skinColor"
              id="skinColor"
              value={skinColor}
              onChange={handleValueChange}
              disabled={!editting}
            />
          </FormControl>

          <FormControl variant="standard" sx={formControlStyle}>
            <InputLabel id="eyeColor">Eye Color</InputLabel>
            <Input
              name="eyeColor"
              id="eyeColor"
              value={eyeColor}
              onChange={handleValueChange}
              disabled={!editting}
            />
          </FormControl>

          <FormControl variant="standard" sx={formControlStyle}>
            <InputLabel id="birthEear">Birth Year</InputLabel>
            <Input
              name="birthEear"
              id="birthEear"
              value={birthYear}
              onChange={handleValueChange}
              disabled={!editting}
            />
          </FormControl>

          <FormControl variant="standard" sx={formControlStyle}>
            <InputLabel id="character-gender">Gender</InputLabel>
            <Select
              labelId="character-gender"
              id="gender"
              value={gender}
              label="Gender"
              onChange={handleGenderChange}
              disabled={!editting}
            >
              <MenuItem value={Gender.MALE}>Male</MenuItem>
              <MenuItem value={Gender.FEMALE}>Female</MenuItem>
              <MenuItem value={Gender.NOT_AVAILABLE}>N/A</MenuItem>
            </Select>
          </FormControl>
        </form>
      </CardContent>

      <CardActions>
        {editting && (
          <Fragment>
            <Button
              type="button"
              size="large"
              color="warning"
              onClick={handleEditCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="large"
              color="warning"
              onClick={handleEditSubmit}
            >
              Save
            </Button>
          </Fragment>
        )}
        {!editting && (
          <Button
            color="warning"
            type="button"
            size="large"
            onClick={handleEditStart}
          >
            Edit
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
