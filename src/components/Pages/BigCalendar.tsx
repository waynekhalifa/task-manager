import { useProjectsQuery } from "framework/project/getAllProjects";
import Calendar from "components/common/Calendar";
import { useTaskQuery } from "framework/task/get-all-tasks";

const BigCalendar: React.FC = () => {
  const {
    data: projectData,
    error: errorProjects,
    isLoading: loadingProjects,
  } = useProjectsQuery({});
  const {
    data: tasksData,
    error: errorsTask,
    isLoading: loadingTasks,
  } = useTaskQuery({});

  const error: any = errorProjects || errorsTask;
  const loading: boolean = loadingProjects || loadingTasks;

  if (error) return null;

  return (
    <>
      {!loading && (
        <div className="card">
          <div className="py-3 px-3">
            <Calendar
              projects={projectData?.projects.data.results}
              tasks={tasksData?.tasks.data.results}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default BigCalendar;
