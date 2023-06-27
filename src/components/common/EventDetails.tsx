import { TaskStatusBadge } from "enums/global";
import { useSingleTask } from "framework/task/get-single-task";
import { taskInput, useUpdateTask } from "framework/task/update-task";
import { Dropdown } from "react-bootstrap";
import { getBtn } from "utils/helper";

interface Props {
  id: number;
}

const EventDetails: React.FC<Props> = ({ id }) => {
  const { data, error, isLoading } = useSingleTask({ id });
  const { mutateAsync: updateTaskMutation } = useUpdateTask();

  if (error) return null;

  const taskData: any = data || {};

  const getUserName = (user: any): string => {
    let firstName: string = user?.first_name || "unknown";
    let lastName: string = user?.last_name || "user";

    return `${firstName} ${lastName}`;
  };

  const getProjectName = (project: any): string => project?.name || "unknown";

  const updateTaskProgress = async (progress: string) => {
    try {
      let createInput = taskInput({ ...taskData, task_progress: progress });
      await updateTaskMutation(createInput);
      // handleModalClose(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="row">
      {isLoading && <>Loading...</>}
      {!isLoading && (
        <>
          <h2 className="fw-bold mb-4">{taskData.name}</h2>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Assignee</h6>
            </div>
            <div className="col-8">
              <div className="d-flex align-items-center">
                <div
                  className="border border-primary p-2 rounded-circle d-flex align-items-center justify-content-center me-2"
                  style={{ width: 32, height: 32 }}
                >
                  <i className="icofont-user"></i>
                </div>
                <span>{getUserName(taskData.user)}</span>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Due Date</h6>
            </div>
            <div className="col-8">
              <input
                type="date"
                className="form-control"
                id="datepickerdedass"
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Project</h6>
            </div>
            <div className="col-8">{getProjectName(taskData.project)}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Status</h6>
            </div>
            <div className="col-8">
              {/* <select className="form-select">
                <option>In Progress</option>
                <option value="1">Completed</option>
                <option value="2">Wating</option>
                <option value="3">Decline</option>
              </select> */}
              <Dropdown className="d-inline-flex m-1">
                <Dropdown.Toggle
                  as="a"
                  variant=""
                  id="dropdown-basic"
                  className={getBtn(taskData.task_progress)}
                >
                  {taskData.task_progress}
                </Dropdown.Toggle>
                <Dropdown.Menu as="ul" className="border-0 shadow bg-primary">
                  {taskData.task_progress !== TaskStatusBadge.TODO && (
                    <li>
                      <a
                        className="dropdown-item py-2 rounded text-light"
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          updateTaskProgress(TaskStatusBadge.TODO);
                        }}
                      >
                        {TaskStatusBadge.TODO}
                      </a>
                    </li>
                  )}
                  {taskData.task_progress !== TaskStatusBadge.ON_PROGRESS && (
                    <li>
                      <a
                        className="dropdown-item py-2 rounded text-light"
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          updateTaskProgress(TaskStatusBadge.ON_PROGRESS);
                        }}
                      >
                        {TaskStatusBadge.ON_PROGRESS}
                      </a>
                    </li>
                  )}
                  {taskData.task_progress !== TaskStatusBadge.ON_REVIEW && (
                    <li>
                      <a
                        className="dropdown-item py-2 rounded text-light"
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          updateTaskProgress(TaskStatusBadge.ON_REVIEW);
                        }}
                      >
                        {TaskStatusBadge.ON_REVIEW}
                      </a>
                    </li>
                  )}
                  {taskData.task_progress !== TaskStatusBadge.COMPLETED && (
                    <li>
                      <a
                        className="dropdown-item py-2 rounded text-light"
                        href="#!"
                        onClick={(e) => {
                          e.preventDefault();
                          updateTaskProgress(TaskStatusBadge.COMPLETED);
                        }}
                      >
                        {TaskStatusBadge.COMPLETED}
                      </a>
                    </li>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Priority</h6>
            </div>
            <div className="col-8">
              <select className="form-select">
                <option value={"MEDIUM"}>MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="LOW">LOW</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-4">
              <h6 className="fw-bold">Description</h6>
            </div>
            <div className="col-12">{taskData ? taskData.description : ""}</div>
          </div>
          <div className="row">
            <div className="col-12">
              <textarea
                className="form-control"
                id="comment"
                rows={3}
              ></textarea>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;
