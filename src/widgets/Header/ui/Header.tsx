import { classNames } from 'shared/lib/classNames';
import cls from './Header.module.scss';
import { Slogan } from './Slogan';

interface HeaderProps { 
   className?: string; 
}

export function Header({ className }: HeaderProps): JSX.Element {
  return (
    <header className={classNames(cls.header, {}, [className])}>
      <Slogan />
    </header>
  )
}