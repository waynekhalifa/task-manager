import React, { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import AllocatedTask from "../../components/Tasks/AllocatedTask";
import RecentActivity from "../../components/Tasks/RecentActivity";
import TaskProgress from "../../components/Tasks/TaskProgress";
import "react-nestable/dist/styles/index.css";
import {
  CompletedData,
  InProgressTaskData,
  needReviewData,
} from "../../components/Data/AppData";
import TaskNestable1 from "../../components/Tasks/TaskNestable";
import { useProjectsQuery } from "framework/project/getAllProjects";
import { SelectedTask } from "types/task";
import TaskModal from "components/common/TaskModal";
import { SelectedProject } from "types/project";
import { taskInput, useCreateTask } from "framework/task/create-task";
import { useTaskQuery } from "framework/task/get-all-tasks";



interface State {
  isAddModal: boolean;
  isEditModal: boolean;
  isDeleteModal: boolean;
  isAddUserModal: boolean;
  isAddAttachmentModal: boolean;
  isViewDescriptionModal: boolean;
  isAddCommentModal: Boolean;
  modalHeader: any;
  selectedTask: SelectedTask;
  modelData: any;
}

const INITIAlIZE_DATA: State = {
  isAddModal: false,
  isEditModal: false,
  isDeleteModal: false,
  isAddUserModal: false,
  isAddAttachmentModal: false,
  isViewDescriptionModal: false,
  isAddCommentModal: false,
  modalHeader: "",
  selectedTask: {} as SelectedTask,
  modelData: {},
};


const Tasks: React.FC = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { modelData, isAddModal, isEditModal, isDeleteModal, isAddUserModal, isAddAttachmentModal, isViewDescriptionModal, isAddCommentModal, modalHeader } = state;
  const { mutateAsync: createTaskMutation } = useCreateTask();

  let { data: projectData, error: errorProjects, isLoading: loadingProjects } = useProjectsQuery({});
  let { data: taskData, error: errorTask, isLoading: loadingTasks } = useTaskQuery({});
  let tasks: SelectedTask[] = taskData?.tasks.data.results || [];
  if (loadingProjects || errorTask) return <div>Loading...</div>;
  if (errorProjects || loadingTasks) return null;
  let projects: SelectedProject[] = projectData?.projects.data.results || [];
  let members = projectData?.projects.data.results[0].members || [
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

  const handleAddModal = () => {
    setState({
      ...state,
      isAddModal: !isAddModal,
      modalHeader: "Create Task",
    });
  };

  const handleModalClose = () => {
    setState({
      ...state,
      isAddModal: false,
      isEditModal: false,
      isDeleteModal: false,
      isAddUserModal: false,
      isAddAttachmentModal: false,
      isViewDescriptionModal: false,
      isAddCommentModal: false,
      modelData: {},
    });
  };

  const handleEditModal = (task: SelectedTask) => {
    setState({
      ...state,
      isEditModal: !isEditModal,
      modalHeader: "Edit Task",
      selectedTask: task
    });

  };

  const handleDeleteModal = (task: SelectedTask) => {
    setState({
      ...state,
      isDeleteModal: !isDeleteModal,
      modalHeader: "Delete Task",
      selectedTask: task
    });
  };

  const handleAddUserModal = (task: SelectedTask) => {
    setState({
      ...state,
      isAddUserModal: !isAddUserModal,
      modalHeader: "Add User",
      selectedTask: task
    });
  };

  const handleAddAttachmentModal = (task: SelectedTask) => {
    setState({
      ...state,
      isAddAttachmentModal: !isAddAttachmentModal,
      modalHeader: "Add Attachment",
      selectedTask: task
    });
  };

  const handleViewDescriptionModal = (task: SelectedTask) => {
    setState({
      ...state,
      isViewDescriptionModal: !isViewDescriptionModal,
      modalHeader: "View Description",
      selectedTask: task
    });
  };

  const handleAddCommentModal = (task: SelectedTask) => {
    setState({
      ...state,
      isAddCommentModal: !isAddCommentModal,
      modalHeader: "Add Comment",
      selectedTask: task
    });
  };


  const createTask = async () => {
    try {
      let createInput = taskInput(modelData);
      let res = await createTaskMutation(createInput);
      let task = res.session.data;
      tasks.push(task);
      handleModalClose();
    } catch (error) {
      alert(error);
    }
  };

  const editTask = async () => {

    try {
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Tasks Management"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-dark btn-set-task w-sm-100"
                onClick={handleAddModal}
              >
                <i className="icofont-plus-circle me-2 fs-6" />
                Create Task
              </button>
            </div>
          );
        }}
      />
      <div className="row clearfix g-3">
        <div className="col-lg-12 col-md-12 flex-column">
          <div className="row g-3 row-deck">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <TaskProgress tasks={tasks} />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <RecentActivity />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
              <AllocatedTask />
            </div>
          </div>
          <TaskNestable1
            InProgressTaskData={InProgressTaskData}
            needReviewData={needReviewData}
            CompletedData={CompletedData}
            tasks={tasks}
          />
        </div>
      </div>

      <TaskModal
        onClose={handleModalClose}
        modalHeader={modalHeader}
        isAddModal={isAddModal}
        isEditModal={isEditModal}
        handleModelData={handleModelData}
        projects={projects}
        modelData={modelData}
        onCreate={createTask}
        onUpdate={editTask}
        members={members}
      />
    </div>
  );

}

export default Tasks;
