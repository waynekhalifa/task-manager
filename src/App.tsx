import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthIndex = lazy(() => import("./screens/AuthIndex"));
const MainIndex = lazy(() => import("./screens/MainIndex"));



const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <div id="mytask-layout" className="theme-indigo">
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </div >
  );
};

export default App;
