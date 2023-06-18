import LeftSide from "components/Auth/LeftSide";
import SignIn from "../components/Auth/SignIn";
import { useEffect, useState } from "react";
import { RefreshTokenInput } from "types/refreshToken";
import { useRefreshToken } from "framework/auth/refreshToken";
import useApp from "hooks/useApp";
import { useAuth } from "contexts/AuthContext";

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
      // console.log("no session");
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
    } catch (err: Error | any) {
      console.log(err);
      setState({ ...state, initialized: true });

      push("/");
    }
  };

  if (!initialized) return <>Loading...</>;

  return (
    <div className="main p-2 py-3 p-xl-5 ">
      <div className="body d-flex p-0 p-xl-5">
        <div className="container-xxl">
          <div className="row g-0">
            <LeftSide />
            <SignIn />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthIndex;
