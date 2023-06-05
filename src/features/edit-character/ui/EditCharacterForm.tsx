import { classNames } from 'shared/lib/classNames';
import cls from './EditCharacterForm.module.scss';

interface EditCharacterFormProps { 
  className?: string; 
}

export function EditCharacterForm({ className }: EditCharacterFormProps): JSX.Element {


  const onSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    // call action to save post to the store
    // save post to local storage (where ??? - on the action!)
    // call history.push(`/character/${id}`);
  }
  return (
    <div className={classNames(cls.editcharacterform, {}, [className])}>
      Here will be some form and editables
      that eventually will submit actions and save data to store & local storage
    </div>
  )
}