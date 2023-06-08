import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig";
import { Suspense } from "react";
import { PageLoader } from "widgets/page-loader";

export function AppRouter(): JSX.Element {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {routeConfig.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<div className="page-wrapper">{element}</div>}
          />
        ))}
      </Routes>
    </Suspense>
  );
}
