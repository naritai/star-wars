import { classNames } from 'shared/lib/classNames';
import cls from './Spinner.module.scss';

interface SpinnerProps { 
  className?: string; 
}

export function Spinner({ className }: SpinnerProps): JSX.Element {
  return (
    <div className={classNames(cls.spinner, {}, [className])}>
      <div className={cls.spinnerOuter}>
        <div className={cls.spinnerInner}>
        <div></div>
        <div></div>
        <div></div>
        </div>
      </div>
    </div>
  )
}