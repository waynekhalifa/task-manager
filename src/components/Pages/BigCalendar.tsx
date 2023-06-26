import Calendar from "components/common/Calendar";
import { useTaskQuery } from "framework/task/get-all-tasks";

const BigCalendar: React.FC = () => {
  const {
    data: tasksData,
    error: errorsTask,
    isLoading: loadingTasks,
  } = useTaskQuery({});

  const error: any = errorsTask;
  const loading: boolean = loadingTasks;

  if (error) return null;

  return (
    <>
      {!loading && (
        <div className="card">
          <div className="py-3 px-3">
            <Calendar tasks={tasksData?.tasks.data.results} />
          </div>
        </div>
      )}
    </>
  );
};

export default BigCalendar;
