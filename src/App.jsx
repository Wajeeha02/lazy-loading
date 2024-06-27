import { Suspense, lazy } from "react";
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Routes, useNavigate } from "react-router-dom";
import ErrorFallBack from './components/ErrorFallback';
import Home from "./components/Home";
import Layout from "./components/Layout";
import SkeletonAdmin from './components/skeletons/SkeletonAdmin';

const Admin = lazy(() => import("./components/Admin"));

function App() {
  const navigate = useNavigate();
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="admin"
          element={
            <ErrorBoundary
              FallbackComponent={ErrorFallBack}
              onReset={() => navigate('/')}
            >
              <Suspense Fallback={<SkeletonAdmin />}>
                <Admin />
              </Suspense>
            </ErrorBoundary>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
