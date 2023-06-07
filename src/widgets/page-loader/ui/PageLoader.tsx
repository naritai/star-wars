import { classNames } from 'shared/lib/classNames';
import cls from './PageLoader.module.scss';
import PlanetLoader from './page-loader.svg';

interface PageLoaderProps { 
  className?: string; 
}

export function PageLoader({ className }: PageLoaderProps): JSX.Element {
  return (
    <section className={classNames(cls.pageloader, {}, [className])}>
      <img src={PlanetLoader} alt="page loader" />
    </section>
  )
}