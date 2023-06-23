import OurClients from "components/Clients/OurClients";
import NestableCard from "components/Tasks/NestableCard";
import Attachment from "components/common/Attachment";
import Comment from "components/common/Comment";
import DeleteModal from "components/common/DeleteModal";
import TaskModal from "components/common/TaskModal";
import { TaskStatusBadge } from "enums/global";
import { useDeleteTask } from "framework/task/deleteTask";
import { useSingleTask } from "framework/task/get-single-task";
import { taskInput, useUpdateTask } from "framework/task/update-task";
import useApp from "hooks/useApp";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import EnquiresView from "screens/Tickets/TicketsView";
import { SelectedTask } from "types/task";
import { getBtn } from "utils/helper";

interface Props {
  id: number;
}

interface State {
  isEditModal: boolean;
  isDeleteModal: boolean;
  isAddUserModal: boolean;
  modalHeader: any;
  selectedTask: SelectedTask;
  modelData: any;
}

const INITIAlIZE_DATA: State = {
  isEditModal: false,
  isDeleteModal: false,
  isAddUserModal: false,
  modalHeader: "",
  selectedTask: {} as SelectedTask,
  modelData: {},
};

const TaskDetails: React.FC<Props> = ({ id,
}) => {
  const { push } = useApp();
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { modelData, isEditModal, isDeleteModal, isAddUserModal, modalHeader } = state;
  let { data, error, isLoading } = useSingleTask({ id });
  const { mutateAsync: updateTaskMutation } = useUpdateTask();
  const { mutateAsync: deleteTaskMutation } = useDeleteTask();
  let user = {
    avatar: "https://via.placeholder.com/150",
    post: "Teacher",
    name: "John Doe",
    department: "Academic Department",

  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  let task: any = data || {} as SelectedTask;

  let comments = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
    {
      id: 3,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
    {
      id: 4,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
    {
      id: 5,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
  ];
  let members = [
    {

      label: "Select User",
      value: 0,
    },
    {
      label: "User 1",
      value: 1,
    },
    {
      label: "User 2",
      value: 2,
    },
    {
      label: "User 3",
      value: 3,
    },
  ];

  const groups = [
    {
      label: "Group1",
      value: 1,
    },
    {
      label: "Group2",
      value: 1,
    },
    {
      label: "Group2",
      value: 1,
    },
  ]
  const handleModelData = (key: string, value: any) => {
    if (isEditModal) {
      setState({
        ...state,
        modelData: {
          ...modelData,
          [key]: value,
        },
      });
      return;
    }
    setState((prevState) => ({
      ...prevState,
      modelData: {
        ...prevState.modelData,
        [key]: value,
      },
    }));
  };



  const handleModalClose = (reload: boolean = false) => {
    if (reload) {
      window.location.reload();
    }
    setState({
      ...state,
      isEditModal: false,
      isDeleteModal: false,
      isAddUserModal: false,
      modelData: {},
    });
  };


  const handleEditModal = () => {
    setState({
      ...state,
      isEditModal: !isEditModal,
      modalHeader: "Edit Task",
      selectedTask: task,
      modelData: task
    });

  };

  const handleDeleteModal = () => {
    setState({
      ...state,
      isDeleteModal: !isDeleteModal,
      modalHeader: "Delete Task",
      selectedTask: task
    });
  };

  const editTask = async () => {
    let createInput = taskInput(modelData);
    await updateTaskMutation(createInput);
    handleModalClose(true);
    try {
    } catch (error) {
      alert(error);
    }
  };

  const updateTaskProgress = async (progress: string) => {
    let createInput = taskInput({ ...task, task_progress: progress });
    await updateTaskMutation(createInput);
    handleModalClose(true);
    try {
    } catch (error) {
      alert(error);
    }
  };

  const deleteTask = async () => {
    try {
      await deleteTaskMutation(task);
      push("/dashboard/tasks");
    } catch (err) {
      alert(err);
    }
  };


  return (
    <div style={{
      backgroundColor: "#F5F6FA",
      minHeight: "100vh",
      padding: 20,
    }}>

      <div className="container-xxl">
        <div className="d-flex justify-content-between mb-3">
          <h2>Task Details</h2>
          <div className="d-flex justify-content-between mb-3">
            <Dropdown className="d-inline-flex m-1" >
              <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className={getBtn(task.task_progress)}>
                {task.task_progress}
              </Dropdown.Toggle>

              <Dropdown.Menu as="ul" className="border-0 shadow bg-primary">
                {task.task_progress !== TaskStatusBadge.TODO && <li><a className="dropdown-item py-2 rounded text-light" href="#!" onClick={(e) => {
                  e.preventDefault();
                  updateTaskProgress(TaskStatusBadge.TODO);
                }}>
                  {TaskStatusBadge.TODO}</a></li>}
                {task.task_progress !== TaskStatusBadge.ON_PROGRESS && <li><a className="dropdown-item py-2 rounded text-light" href="#!" onClick={(e) => {
                  e.preventDefault();
                  updateTaskProgress(TaskStatusBadge.ON_PROGRESS);
                }}>{TaskStatusBadge.ON_PROGRESS}</a></li>}
                {task.task_progress !== TaskStatusBadge.ON_REVIEW && <li><a className="dropdown-item py-2 rounded text-light" href="#!" onClick={(e) => {
                  e.preventDefault();
                  updateTaskProgress(TaskStatusBadge.ON_REVIEW);
                }}>{TaskStatusBadge.ON_REVIEW}</a></li>}
                {task.task_progress !== TaskStatusBadge.COMPLETED && <li><a className="dropdown-item py-2 rounded text-light" href="#!" onClick={(e) => {
                  e.preventDefault();
                  updateTaskProgress(TaskStatusBadge.COMPLETED);
                }}>{TaskStatusBadge.COMPLETED}</a></li>}
              </Dropdown.Menu>
            </Dropdown>
            <button className="btn btn-primary  m-1"
              onClick={handleEditModal}
            >Edit</button>
            <button className="btn btn-danger text-white m-1"
              onClick={handleDeleteModal}
            >Delete</button>
          </div>

        </div>
        <div className="row g-3 mb-3 mt-3">
          <div className="col-lg-4 col-md-12">
            <NestableCard data={data} />
          </div>
          <div className="col-lg-8 col-md-12">
            <OurClients
              avatar={user.avatar}
              post={user.post}
              name={user.name}
              department={user.department}
              onClickEdit={() => { }}
              onClickDelete={() => { }}
              details="lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.              
              "
            />
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p className="card-text">{task.description}</p>
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary"><strong>Attachments</strong></h5>
                <Attachment
                  task={task}
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary"><strong>Tickets</strong></h5>
                <EnquiresView />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Comments</h5>
                <div className="row g-3">
                  {comments.map((comment, index: number) => (
                    <div className="col-md-6" key={index}>
                      <Comment data={comment} />
                    </div>
                  ))}
                  <div className="col-md-12">
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Comment" aria-label="Comment" aria-describedby="button-addon2" />
                      <button className="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TaskModal
        onClose={handleModalClose}
        modalHeader={modalHeader}
        isEditModal={isEditModal}
        handleModelData={handleModelData}
        modelData={modelData}
        SelectedTask={task}
        onUpdate={editTask}
        members={members}
        groups={groups}
      />
      <DeleteModal
        show={isDeleteModal}
        onClose={handleModalClose}
        onDelete={deleteTask}
        message="Are you sure you want to delete this Task?"
        modalHeader={modalHeader}
      />
    </div>
  );
};

export default TaskDetails;