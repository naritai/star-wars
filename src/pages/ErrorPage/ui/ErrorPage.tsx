import { useRouteError } from 'react-router-dom';
import cls from './ErrorPage.module.scss';
import { classNames } from 'shared/lib/classNames';

interface ErrorPageProps { 
   className?: string; 
}

interface RouteError {
  statusText?: string;
  message?: string;
}

export function ErrorPage({ className }: ErrorPageProps): JSX.Element {
  const error: RouteError = useRouteError() as RouteError;
  console.error('ERROR FROM REACT ROUTER', error);

  return (
    <section className={classNames(cls.errorpage, {}, [className])}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </section>
  )
}