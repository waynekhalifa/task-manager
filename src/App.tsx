import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthIndex = lazy(() => import("./screens/AuthIndex"));
const MainIndex = lazy(() => import("./screens/MainIndex"));

const App: React.FC = () => {
  return (
    <div id="mytask-layout" className="theme-indigo">
      <Routes>
        <Route
          path="/*"
          element={
            <Suspense fallback={null}>
              <AuthIndex />
            </Suspense>
          }
        />
        <Route
          path="dashboard/*"
          element={
            <Suspense fallback={null}>
              <MainIndex />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
