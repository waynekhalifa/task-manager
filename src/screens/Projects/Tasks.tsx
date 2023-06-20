import React, { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import AllocatedTask from "../../components/Projects/AllocatedTask";
import RecentActivity from "../../components/Projects/RecentActivity";
import TaskProgress from "../../components/Projects/TaskProgress";
import "react-nestable/dist/styles/index.css";
import {
  CompletedData,
  InProgressTaskData,
  needReviewData,
} from "../../components/Data/AppData";
import TaskNestable1 from "../../components/Projects/TaskNestable";
import { useProjectsQuery } from "framework/project/getAllProjects";
import { SelectedTask } from "types/task";
import AddTaskModal from "components/common/AddTaskModal";



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
};


const Tasks: React.FC = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { isAddModal, isEditModal, isDeleteModal, isAddUserModal, isAddAttachmentModal, isViewDescriptionModal, isAddCommentModal, modalHeader } = state;

  let { data: projectData, error: errorProjects, isLoading: loadingProjects } = useProjectsQuery({});

  if (loadingProjects) return <div>Loading...</div>;
  if (errorProjects) return null;


  const handleAddModal = () => {
    setState({
      ...state,
      isAddModal: !isAddModal,
      modalHeader: "Create Task",
    });
  };

  const handleEditModal = () => {
    setState({
      ...state,
      isEditModal: !isEditModal,
      modalHeader: "Edit Task",
    });

  };

  const handleDeleteModal = () => {
    setState({
      ...state,
      isDeleteModal: !isDeleteModal,
      modalHeader: "Delete Task",
    });
  };

  const handleAddUserModal = () => {
    setState({
      ...state,
      isAddUserModal: !isAddUserModal,
      modalHeader: "Add User",
    });
  };

  const handleAddAttachmentModal = () => {
    setState({
      ...state,
      isAddAttachmentModal: !isAddAttachmentModal,
      modalHeader: "Add Attachment",
    });
  };

  const handleViewDescriptionModal = () => {
    setState({
      ...state,
      isViewDescriptionModal: !isViewDescriptionModal,
      modalHeader: "View Description",
    });
  };

  const handleAddCommentModal = () => {
    setState({
      ...state,
      isAddCommentModal: !isAddCommentModal,
      modalHeader: "Add Comment",
    });
  };

  const handleSelectedTask = (task: SelectedTask) => {
    setState({
      ...state,
      selectedTask: task,
    });
  };

  const handleCloseModal = () => {
    setState({
      ...state,
      isAddModal: false,
      isEditModal: false,
      isDeleteModal: false,
      isAddUserModal: false,
      isAddAttachmentModal: false,
      isViewDescriptionModal: false,
      isAddCommentModal: false,
    });
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
              <TaskProgress />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <RecentActivity />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
              <AllocatedTask />
            </div>
          </div>
          {/* <TaskNestable
                        InProgressTaskData={InProgressTaskData}
                        needReviewData={needReviewData}
                        CompletedData={CompletedData}
                         /> */}
          <TaskNestable1
            InProgressTaskData={InProgressTaskData}
            needReviewData={needReviewData}
            CompletedData={CompletedData}
          />
        </div>
      </div>
      <AddTaskModal
        show={isAddModal}
        onClose={handleCloseModal}
        modalHeader={modalHeader}
      />
    </div>
  );

}

export default Tasks;
