import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "contexts/AuthContext";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AuthIndex = lazy(() => import("./screens/AuthIndex"));
const MainIndex = lazy(() => import("./screens/MainIndex"));

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
