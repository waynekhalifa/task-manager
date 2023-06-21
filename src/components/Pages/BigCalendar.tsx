import { useProjectsQuery } from "framework/project/getAllProjects";
import Calendar from "components/common/Calendar";

const BigCalendar: React.FC = () => {
  let {
    data: projectData,
    error: errorProjects,
    isLoading: loadingProjects,
  } = useProjectsQuery({});

  if (errorProjects) return null;

  return (
    <>
      {!loadingProjects && (
        <div className="card">
          <div className="py-3 px-3">
            <Calendar events={projectData?.projects.data.results} />
          </div>
        </div>
      )}
    </>
  );
};

export default BigCalendar;
