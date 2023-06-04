import { classNames } from 'shared/lib/classNames';
import cls from './CharactersPage.module.scss';

interface CharactersPageProps { 
   className?: string; 
 }

export default function CharactersPage({ className }: CharactersPageProps): JSX.Element {
  return (
    <div className={classNames(cls.characterspage, {}, [className])}>
      <ul className={cls.list}>
        <li className={cls.listItem}>
          Character 1
        </li>
        <li className={cls.listItem}>
          Character 1
        </li>
        <li className={cls.listItem}>
          Character 1
        </li>
        <li className={cls.listItem}>
          Character 1
        </li>
        <li className={cls.listItem}>
          Character 1
        </li>
        <li className={cls.listItem}>
          Character 1
        </li>
      </ul>
    </div>
  )
}