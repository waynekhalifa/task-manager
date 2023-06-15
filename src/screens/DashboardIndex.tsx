import { useParams } from "react-router-dom";
import HrDashboard from "./Dashboard/HrDashboard";

const DashboardIndex: React.FC = () => {
  let { slug } = useParams<{ slug: string }>();

  const renderContent = () => {
    switch (slug) {
      default:
        return <HrDashboard />;
    }
  };

  return <>{renderContent()}</>;
};

export default DashboardIndex;
