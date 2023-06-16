import { useParams } from "react-router-dom";
import { Pages } from "enums/pages";
import { Suspense, lazy } from "react";

const Projects = lazy(() => import("./Projects/Projects"));
const Tasks = lazy(() => import("./Projects/Tasks"));
const Tickets = lazy(() => import("./Tickets/TicketsView"));
const Employees = lazy(() => import("./Employee/Members"));
const Attendance = lazy(() => import("./Employee/Attendance"));
const HrDashboard = lazy(() => import("./Dashboard/HrDashboard"));
const ChatApp = lazy(() => import("./App/ChatApp"));
const Calendar = lazy(() => import("./App/Calendar"));

const DashboardIndex: React.FC = () => {
  let { slug } = useParams<{ slug: string }>();

  const renderContent = () => {
    switch (slug) {
      case Pages.PROJECTS:
        return <Projects />;
      case Pages.TASKS:
        return <Tasks />;
      case Pages.Enquires:
        return <Tickets />;
      case Pages.EMPLOYEES:
        return <Employees />;
      case Pages.CHAT:
        return <ChatApp />;
      case Pages.ATTENDANCE:
        return <Attendance />;
      case Pages.CALENDAR:
        return <Calendar />;
      default:
        return <HrDashboard />;
    }
  };

  return <Suspense fallback={null}>{renderContent()}</Suspense>;
};

export default DashboardIndex;
