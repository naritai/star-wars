import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig';
import { Suspense } from 'react';

export function AppRouter(): JSX.Element {
  return (
    <Suspense fallback={(<div>loading...</div>)}>
      <Routes>
        {routeConfig.map(({ path, element }) => (
          <Route key={path} path={path} element={(<div className='page-wrapper'>{element}</div>)} />
        ))}
      </Routes>
    </Suspense>
  )
}