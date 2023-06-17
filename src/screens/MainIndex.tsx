import { Suspense, lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "components/common/Sidebar";
import Header from "components/common/Header";
import { useAuth } from "contexts/AuthContext";
import useApp from "hooks/useApp";

const DashboardIndex = lazy(() => import("./DashboardIndex"));

const MainIndex: React.FC = () => {
  const { session } = useAuth();
  const { push } = useApp();

  useEffect(() => {
    let access_token = localStorage.getItem("access_token");
    if (!access_token) push("/login");
    // if (!session) push("/");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Sidebar />
      <div className="main px-lg-4 px-md-4">
        <Header />
        <div className="body d-flex py-lg-3 py-md-2">
          {/* <HrDashboard /> */}
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Navigate to="summary" />} />
              <Route path=":slug/*" element={<DashboardIndex />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default MainIndex;
