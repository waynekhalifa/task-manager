import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "components/common/Sidebar";
import Header from "components/common/Header";

const DashboardIndex = lazy(() => import("./DashboardIndex"));

const MainIndex: React.FC = () => {
  const activekey = () => {
    var res: any = window.location.pathname;
    var baseUrl: any = process.env.PUBLIC_URL;
    baseUrl = baseUrl.split("/");
    res = res.split("/");
    // res = res.length > 1 ? res[res.length-1] : "/";
    res = res.length > 0 ? res[baseUrl.length] : "/";
    res = res ? "/" + res : "/";
    const activeKey1 = res;
    //cdv
    return activeKey1;
  };
  return (
    <>
      <Sidebar activekey={activekey()} />
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
