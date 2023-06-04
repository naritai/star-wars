import { classNames } from 'shared/lib/classNames';
import cls from './MainPage.module.scss';

interface MainPageProps { 
  className?: string; 
}

export default function MainPage({ className }: MainPageProps): JSX.Element {
  return (
    <div className={classNames(cls.mainpage, {}, [className])}>
      <h1>MAIN PAGE!</h1>
    </div>
  )
}