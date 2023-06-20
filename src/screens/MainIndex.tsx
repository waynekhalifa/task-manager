import { Suspense, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "components/common/Sidebar";
import Header from "components/common/Header";
import { useAuth } from "contexts/AuthContext";
import useApp from "hooks/useApp";
import { useRefreshToken } from "framework/auth/refreshToken";
import { RefreshTokenInput } from "types/refreshToken";

const DashboardIndex = lazy(() => import("./DashboardIndex"));

type IState = { initialized: boolean };
const INITIAL_STATE: IState = { initialized: false };

const MainIndex: React.FC = () => {
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const { initialized } = state;
  const { push } = useApp();
  const { setSession } = useAuth();
  const { mutateAsync: refreshToken } = useRefreshToken();

  useEffect(() => {
    const session: string | null = localStorage.getItem("session");

    if (session) {
      const sessionObj: any = JSON.parse(session);

      if (sessionObj.refresh) getSession(sessionObj);
    } else {
      setState({ ...state, initialized: true });

      push("/");
    }

    // eslint-disable-next-line
  }, []);

  const getSession = async (sessionObj: any) => {
    const params: RefreshTokenInput = { refresh: sessionObj.refresh };

    try {
      const result = await refreshToken(params);
      setSession({ ...sessionObj, access: result });
      localStorage.setItem(
        "session",
        JSON.stringify({ ...sessionObj, access: result })
      );

      setState({ ...state, initialized: true });
    } catch (err: Error | any) {
      console.log(err);
      setState({ ...state, initialized: true });

      push("/");
    }
  };

  if (!initialized) return <>Loading...</>;

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
