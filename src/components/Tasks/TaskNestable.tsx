import Nestable from "react-nestable";
import NestableCard from "./NestableCard";
import { SelectedTask } from "types/task";

interface Props {
  tasks: SelectedTask[];
}

enum TaskProgress {
  ToDo = "To Do",
  InProgress = "ON PROGRESS",
  NeedReview = "Need Review",
  Completed = "Completed",
}

const TaskNestable: React.FC<Props> = ({
  tasks,
}) => {

  let toDoTasks: SelectedTask[] = tasks.filter((task: SelectedTask) => task.task_progress === TaskProgress.ToDo);
  let inProgressTasks: SelectedTask[] = tasks.filter((task: SelectedTask) => task.task_progress === TaskProgress.InProgress);
  let needReviewTasks: SelectedTask[] = tasks.filter((task: SelectedTask) => task.task_progress === TaskProgress.NeedReview);
  let completedTasks: SelectedTask[] = tasks.filter((task: SelectedTask) => task.task_progress === TaskProgress.Completed);
  return (
    <div className="container">
      <div className="row taskboard  py-xxl-4">
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4"
          style={{

            borderRadius: "10px",
            boxShadow: "0px 0px 10px #e5e5e5",
          }}
        >
          <h6 className="fw-bold py-3 mb-0 text-center text-danger"> To Do</h6>
          {toDoTasks && toDoTasks.length > 0 && <div>
            <Nestable
              key="kjdfhgkj"
              items={toDoTasks}
              renderItem={({ item }) => {
                return <NestableCard data={item} />;
              }}
              threshold={0}
            />
          </div>}
          {toDoTasks && toDoTasks.length === 0 && <div className="text-center">
            <h6 className="text-danger">
              No Tasks To Do
            </h6>
          </div>}
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4"
          style={{

            borderRadius: "10px",
            boxShadow: "0px 0px 10px #e5e5e5",
          }}
        >
          <h6 className="fw-bold py-3 mb-0 text-center text-primary">In Progress</h6>
          {inProgressTasks && inProgressTasks.length > 0 && <div>
            <Nestable
              key="kjdfhgkj"
              items={inProgressTasks}
              renderItem={({ item }) => {
                return <NestableCard data={item} />;
              }}
              threshold={0}
            />
          </div>}
          {inProgressTasks && inProgressTasks.length === 0 && <div className="text-center">
            <h6 className="text-danger">
              No Tasks In Progress
            </h6>
          </div>}
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4"
          style={{

            borderRadius: "10px",
            boxShadow: "0px 0px 10px #e5e5e5",
          }}
        >
          <h6 className="fw-bold py-3 mb-0 text-center text-secondary">Needs Review</h6>
          {needReviewTasks && needReviewTasks.length > 0 && <div>
            <Nestable
              key="kjdfhgkj"
              items={needReviewTasks}
              renderItem={({ item }) => {
                return <NestableCard data={item} />;
              }}
              threshold={0}
            />
          </div>}
          {needReviewTasks && needReviewTasks.length === 0 && <div className="text-center">
            <h6 className="text-danger">
              No Tasks Need Review
            </h6>
          </div>}
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 mt-xxl-4 mt-xl-4 mt-lg-4 mt-md-4 mt-sm-4 mt-4"
          style={{
            borderRadius: "10px",
            boxShadow: "0px 0px 10px #e5e5e5",
          }}>
          <h6 className="fw-bold py-3 mb-0 text-center text-success">Completed</h6>
          {completedTasks && completedTasks.length > 0 && <div>
            <Nestable
              key="kjdfhgkj"
              items={completedTasks}
              renderItem={({ item }) => {
                return <NestableCard data={item} />;
              }}
              threshold={0}
            />
          </div>}
          {completedTasks && completedTasks.length === 0 && <div className="text-center">
            <h6 className="text-danger">No Tasks Completed</h6>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default TaskNestable;
