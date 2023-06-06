import { classNames } from 'shared/lib/classNames';
import cls from './EditCharacterForm.module.scss';
import { Character } from 'entities/character';
import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, CardActions, FormControl, Input, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Gender } from 'entities/character/model/types/characterSchema';
import { useLocalStorage } from 'usehooks-ts';

interface EditCharacterFormProps { 
  className?: string;
  character: Character;
  onCancel: () => void;
}

const formControlStyle = {
  minWidth: 250
}

export function EditCharacterForm({ className, character, onCancel }: EditCharacterFormProps): JSX.Element {
  const [LSCharacter, setLSCharacter] = useLocalStorage<Partial<Character>>(`characters:${character.id}`, character);
  const { image, id, ...rest } = LSCharacter;
  const [formData, setFormData] = useState<Partial<Character>>(rest);

  const {
    name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender
  } = formData;
  
  const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev: Partial<Character>) => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleGenderChange = (event: SelectChangeEvent) => {
    setFormData((prev: Partial<Character>) => ({ ...prev, gender: event.target.value as Gender }));
  };

  const onCharacterSave = (event: FormEvent) => {
    event.preventDefault();
    setLSCharacter(formData);
    onCancel();
  }

  const handleCancel = () => onCancel();

  return (
    <form onSubmit={onCharacterSave} className={classNames(cls.editcharacterform, {}, [className])}>
      <FormControl variant="standard" sx={formControlStyle}>
        <InputLabel id="name">Name</InputLabel>
        <Input
          name="name"
          id="name"
          value={name}
          onChange={handleValueChange}
        />
      </FormControl>

      <FormControl variant="standard" sx={formControlStyle}>
        <InputLabel id="height">Height</InputLabel>
        <Input
          name="height"
          id="height"
          value={height}
          onChange={handleValueChange}
        />
      </FormControl>

      <FormControl variant="standard" sx={formControlStyle}>
        <InputLabel id="mass">Mass</InputLabel>
        <Input
          name="mass"
          id="mass"
          value={mass}
          onChange={handleValueChange}
        />
      </FormControl>

      <FormControl variant="standard" sx={formControlStyle}>
        <InputLabel id="hairColor">Hair Color</InputLabel>
        <Input
          name="hairColor"
          id="hairColor"
          value={hairColor}
          onChange={handleValueChange}
        />
      </FormControl>

      <FormControl variant="standard" sx={formControlStyle}>
        <InputLabel id="skinColor">Skin Color</InputLabel>
        <Input
          name="skinColor"
          id="skinColor"
          value={skinColor}
          onChange={handleValueChange}
        />
      </FormControl>

      <FormControl variant="standard" sx={formControlStyle}>
        <InputLabel id="eyeColor">Eye Color</InputLabel>
        <Input
          name="eyeColor"
          id="eyeColor"
          value={eyeColor}
          onChange={handleValueChange}
        />
      </FormControl>

      <FormControl variant="standard" sx={formControlStyle}>
        <InputLabel id="birthEear">Birth Year</InputLabel>
        <Input
          name="birthEear"
          id="birthEear"
          value={birthYear}
          onChange={handleValueChange}
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
          >
            <MenuItem value={Gender.MALE}>Male</MenuItem>
            <MenuItem value={Gender.FEMALE}>Female</MenuItem>
            <MenuItem value={Gender.NOT_AVAILABLE}>N/A</MenuItem>
          </Select>
      </FormControl>

      <CardActions>
        <Button type="button" size="large" color="secondary" onClick={handleCancel}>Cancel</Button>
        <Button type="submit" size="large" color="secondary" onClick={onCharacterSave}>Save</Button>
      </CardActions>
    </form>
  )
}