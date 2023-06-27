import { useParams } from "react-router-dom";
import { Pages } from "enums/pages";
import { Suspense, lazy } from "react";
import Categories from "./Category/Category";
import TaskDetails from "./Tasks/TaskDetails";
import ProjectDetails from "./Projects/ProjectDetails";
import EmployeeProfile from "./Employee/EmployeeProfile";
import Managers from "./Manager/Managers";
import { useAuth } from "contexts/AuthContext";
import Groups from "./Groups/Groups";

const Projects = lazy(() => import("./Projects/Projects"));
const Tasks = lazy(() => import("./Tasks/Tasks"));
const Tickets = lazy(() => import("./Tickets/TicketsView"));
const Employees = lazy(() => import("./Employee/Employees"));
const Attendance = lazy(() => import("./Employee/Attendance"));
const HrDashboard = lazy(() => import("./Dashboard/HrDashboard"));
const ProjectDashboard = lazy(() => import("./Dashboard/ProjectDashboard"));
const ChatApp = lazy(() => import("./App/ChatApp"));
const Calendar = lazy(() => import("./App/Calendar"));

const DashboardIndex: React.FC = () => {
  let { slug } = useParams<{ slug: string }>();
  let { id } = useParams<{ id: string }>();
  let { projectId } = useParams<{ projectId: string }>();
  const { session } = useAuth();

  const renderDashboard = (): React.ReactNode => {
    const userRole: string = session?.user?.role;

    if (userRole === "superuser") {
      return <HrDashboard />;
    }

    return <ProjectDashboard />;
  };

  const renderContent = () => {
    if (id && typeof parseFloat(id) === "number" && !isNaN(parseFloat(id)) ) {
      switch (slug) {
        case Pages.PROJECTS:
          return <ProjectDetails id={parseFloat(id)} />;
        case Pages.TASKS:
          return <TaskDetails id={parseFloat(id)} projectId={parseFloat(projectId!)} />;
        case Pages.PROFILE:
          return <EmployeeProfile id={parseFloat(id)} />;
      }
    } else
      switch (slug) {
        case Pages.PROJECTS:
          return <Projects />;
        case Pages.TASKS:
          return <Tasks />;
        case Pages.Enquires:
          return <Tickets />;
        case Pages.EMPLOYEES:
          return <Employees />;
        case Pages.MANAGERS:
          return <Managers />;
        case Pages.GROUPS:
          return <Groups />;
        case Pages.CHAT:
          return <ChatApp />;
        case Pages.ATTENDANCE:
          return <Attendance />;
        case Pages.CALENDAR:
          return <Calendar />;
        case Pages.CATEGORIES:
          return <Categories />;
        default:
          return renderDashboard();
      }
  };

  return <Suspense fallback={null}>{renderContent()}</Suspense>;
};

export default DashboardIndex;
