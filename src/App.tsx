import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "contexts/AuthContext";
import useApp from "hooks/useApp";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

const AuthIndex = lazy(() => import("./screens/AuthIndex"));
const MainIndex = lazy(() => import("./screens/MainIndex"));

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { session } = useAuth();
  const { push } = useApp();

  useEffect(() => {
    /** should implement session maintain */
    if (session) push("/dashboard/summary");

    // eslint-disable-next-line
  }, []);

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
