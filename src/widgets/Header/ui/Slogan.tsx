import { classNames } from 'shared/lib/classNames';
import cls from './Header.module.scss';

interface SloganProps { 
   className?: string; 
 }

export function Slogan({ className }: SloganProps): JSX.Element {
  return (
    <div className={classNames(cls.slogan, {}, [className])}>
      <span className={cls.star}>star</span>
      <div className={cls.vertical}></div>
      <span className={cls.wars}>wars</span>
    </div>
  )
}