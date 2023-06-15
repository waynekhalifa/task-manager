import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Auth = lazy(() => import("./screens/AuthIndex"));
const Dashboard = lazy(() => import("./screens/Dashboard"));

const App: React.FC = () => {
  return (
    <div id="mytask-layout" className="theme-indigo">
      <Routes>
        <Route
          path="/*"
          element={
            <Suspense fallback={null}>
              <Auth />
            </Suspense>
          }
        />
        <Route
          path="dashboard/*"
          element={
            <Suspense fallback={null}>
              <Dashboard />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
