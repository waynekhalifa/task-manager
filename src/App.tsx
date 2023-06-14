import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Auth = lazy(() => import("./screens/Auth"));
const Dashboard = lazy(() => import("./screens/Dashboard"));

const App: React.FC = () => {
  return (
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
  );
};

export default App;
