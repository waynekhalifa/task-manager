import { Pages } from "enums/pages";
import { Suspense, lazy } from "react";
import { useParams } from "react-router-dom";

const Page404 = lazy(() => import("./Page404"));
const PasswordReset = lazy(() => import("./PasswordReset"));

const Auth: React.FC = () => {
  let { slug } = useParams<{ slug: string }>();

  const renderContent = () => {
    switch (slug) {
      case Pages.PASSWORD_RESET:
        return <PasswordReset />;
      default:
        return <Page404 />;
    }
  };

  return <Suspense fallback={null}>{renderContent()}</Suspense>;
};

export default Auth;
