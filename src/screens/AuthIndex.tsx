import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import LeftSide from "components/Auth/LeftSide";
import Auth from "components/Auth";
import SignIn from "../components/Auth/SignIn";
import useApp from "hooks/useApp";
import { RefreshTokenInput } from "types/refreshToken";
import { useRefreshToken } from "framework/auth/refreshToken";
import { useAuth } from "contexts/AuthContext";
import { Screens } from "enums/screens";
import { Pages } from "enums/pages";

type IState = { initialized: boolean };
const INITIAL_STATE: IState = { initialized: false };

const AuthIndex: React.FC = () => {
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

      push(Screens.DASHBOARD + Pages.SUMMARY);
    } catch (err: Error | any) {
      console.log(err);
      setState({ ...state, initialized: true });
    }
  };

  if (!initialized) return <>Loading...</>;

  return (
    <div className="main p-2 py-3 p-xl-5 ">
      <div className="body d-flex p-0 p-xl-5">
        <div className="container-xxl">
          <div className="row g-0">
            <LeftSide />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path=":slug/*" element={<Auth />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthIndex;
