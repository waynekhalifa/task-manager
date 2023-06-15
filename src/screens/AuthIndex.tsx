import LeftSide from "components/Auth/LeftSide";
import SignIn from "../components/Auth/SignIn";

const AuthIndex: React.FC = () => {
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
