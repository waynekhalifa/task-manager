import React from "react";
import { Nav, Tab } from "react-bootstrap";
import CurrentClientProject from "../../components/Clients/CurrentClientProject";
import AddNewUserModal from "../../components/common/AddNewUserModal";
import PageHeader from "../../components/common/PageHeader";
import { useCategoriesQuery } from "framework/category/getAllCategories";
import { CategoryUpdateInput } from "types/category";
import {
  projectInput,
  useCreateProject,
} from "framework/project/createProject";
import { Project, SelectedProject } from "types/project";
import { useProjectsQuery } from "framework/project/getAllProjects";
import { useDeleteProject } from "framework/project/deleteProject";
import AddNewAttachmentModal from "components/common/AddNewAttachmentModal";
import DescriptionViewModal from "components/common/DescriptionViewModal";
import { projectUpdateInput, useUpdateProject } from "framework/project/updateProject";
import AddCommentModal from "components/common/AddCommentModal";
import ViewTasksModal from "components/common/ViewTasksModal";
import ProjectModal from "components/common/ProjectModal";
import TaskModal from "components/common/TaskModal";
import DeleteModal from "components/common/DeleteModal";
import { SelectedTask, Task } from "types/task";
import { taskInput, useCreateTask } from "framework/task/create-task";
import { useUploadTaskAttachment } from "framework/task/uploadTaskAttachment";
import { useDeleteTaskAttachment } from "framework/task/deleteTaskAttachment";

interface Props { }

enum ModelKeys {
  NAME = "name",
  CATEGORY = "category",
  DESCRIPTION = "description",
  START_DATE = "start_at",
  END_DATE = "end_at",
  ADMIN = "admin",
  FILE = "file",
  FILES = "files",
}

interface State {
  isAddModal: boolean;
  isEditModal: boolean;
  isAddTaskModal: boolean;
  isEditTaskModal: boolean;
  isDeleteModal: boolean;
  isAddUserModal: boolean;
  isAddAttachmentModal: boolean;
  isViewDescriptionModal: boolean;
  isAddCommentModal: Boolean;
  isViewTaskModal: boolean;
  modalHeader: any;
  modelProjectData: Project;
  modelTaskData: Task;
  selectedProject: SelectedProject;
}

const INITIAlIZE_DATA: State = {
  isAddModal: false,
  isEditModal: false,
  isDeleteModal: false,
  isAddUserModal: false,
  isAddAttachmentModal: false,
  isViewDescriptionModal: false,
  isAddCommentModal: false,
  isAddTaskModal: false,
  isEditTaskModal: false,
  isViewTaskModal: false,
  modalHeader: "",
  modelProjectData: {} as Project,
  modelTaskData: {} as Task,
  selectedProject: {} as SelectedProject,
};

const Projects: React.FC<Props> = () => {


  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { isAddModal, isEditModal, isDeleteModal, modalHeader, modelProjectData, modelTaskData, selectedProject, isAddUserModal, isAddAttachmentModal, isViewDescriptionModal, isAddCommentModal, isAddTaskModal, isEditTaskModal, isViewTaskModal } =
    state;
  const { mutateAsync: createProjectMutation } = useCreateProject();
  const { mutateAsync: updateProjectMutation } = useUpdateProject();
  const { mutateAsync: deleteProjectMutation } = useDeleteProject();
  const { mutateAsync: createTaskMutation } = useCreateTask();
  const { mutateAsync: updateTaskMutation } = useUpdateProject();
  const { mutateAsync: deleteTaskMutation } = useDeleteProject();
  const { mutateAsync: uploadTaskAttachmentMutation } = useUploadTaskAttachment();
 
  let { data: projectData, error: errorProjects, isLoading: loadingProjects } = useProjectsQuery({});
  let tasks: SelectedTask[] = [] as SelectedTask[];

  let {
    data: categoriesData,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useCategoriesQuery({});
  if (isLoadingCategories || loadingProjects) return <div>Loading...</div>;
  if (errorCategories || errorProjects) return null;


  let projects: SelectedProject[] = projectData?.projects.data.results || [];

  let categories: CategoryUpdateInput[] =
    categoriesData?.categories.data.results || [];

  const admins = [
    {
      label: "Badr",
      value: 1,
    },
    {
      label: "Jo",
      value: 1,
    },
    {
      label: "Wani",
      value: 1,
    },
  ]

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


  const handleModalClose = (reload: boolean = false) => {
    if (reload === true) window.location.reload();
    setState({
      ...state,
      isAddModal: false,
      isEditModal: false,
      isDeleteModal: false,
      isAddUserModal: false,
      isAddAttachmentModal: false,
      isViewDescriptionModal: false,
      isAddCommentModal: false,
      isAddTaskModal: false,
      isEditTaskModal: false,
      isViewTaskModal: false,
      modalHeader: "",
      modelProjectData: {} as Project,
      modelTaskData: {} as Task,
    });
  };

  const handleOpenAddModal = () => {
    setState({
      ...state,
      isAddModal: true,
      modalHeader: "Create Project",
    });
  };

  const handleOpenEditModal = (project: SelectedProject) => {
    setState({
      ...state,
      isEditModal: true,
      modalHeader: "Edit Project",
      selectedProject: project,
    });
  };

  const handleOpenDeleteModal = (project: SelectedProject) => {
    setState({
      ...state,
      isDeleteModal: true,
      selectedProject: project,
      modalHeader: "Delete Project",
    });
  };

  const handleOpenAddUserModal = () => {
    setState({
      ...state,
      isAddUserModal: true,
      modalHeader: "Add User",
    });
  };
  const handleOpenAddAttachmentModal = (project: Project) => {
    setState({
      ...state,
      isAddAttachmentModal: true,
      modelProjectData: project,
      modalHeader: "Add Attachment",
    });
  };

  const handleOpenViewDescriptionModal = (project: SelectedProject) => {
    setState({
      ...state,
      isViewDescriptionModal: true,
      selectedProject: project,
      modalHeader: "View Description",
    });
  };

  const handleOpenAddCommentModal = (project: SelectedProject) => {
    setState({
      ...state,
      isAddCommentModal: true,
      selectedProject: project,
      modalHeader: "Add Comment",
    });
  }

  const handleOpenAddTaskModal = (project: SelectedProject) => {
    setState({
      ...state,
      isAddTaskModal: true,
      selectedProject: project,
      modalHeader: "Add Task",
    });
  }

  const handleOpenEditTaskModal = (project: SelectedProject) => {
    setState({
      ...state,
      isEditTaskModal: true,
      selectedProject: project,
      modalHeader: "Edit Task",
    });
  };


  const handleOpenViewTaskModal = (project: SelectedProject) => {
    setState({
      ...state,
      isViewTaskModal: true,
      selectedProject: project,
      modalHeader: "View Tasks",
    });
  }

  const handleProjectModelData = (key: string, value: any) => {
    if (isEditModal) {
      setState({
        ...state,
        selectedProject: {
          ...selectedProject,
          [key]: value,
        },
      });
      return;
    }
    setState({
      ...state,
      modelProjectData: {
        ...modelProjectData,
        [key]: value,
      },
    });
  };

  const handleTaskModelData = (key: string, value: any) => {
    if (isEditTaskModal) {
      setState({
        ...state,
        modelTaskData: {
          ...modelTaskData,
          [key]: value,
        },
      });
      return;
    }
    setState((prevState) => ({
      ...prevState,
      modelTaskData: {
        ...prevState.modelTaskData,
        [key]: value,
      },
    }));
  };

  const getCategory = (id: number) => {
    let category = categories.find((category) => category.id === id);
    return category?.name;
  };


  const createTask = async () => {
    setState({
      ...state,
      modelTaskData: {
        ...modelTaskData,
        
      },
    });
    try {
      Object.assign(modelTaskData, { project: selectedProject.id });
      let createInput = taskInput(modelTaskData);
      let res = await createTaskMutation(createInput);
      let task = res.session.data;
      tasks.push(task);
      handleModalClose(true);
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



  const createProject = async () => {
    Object.assign(modelProjectData, { admin: 1 });
    try {
      let createInput = projectInput(modelProjectData);
      let res = await createProjectMutation(createInput);
      projects.push(res.session.data);
      handleModalClose();
    } catch (err) {
      alert(err);
    }
  };

  const editProject = async () => {
    // Object.assign(selectedProject, { admin: 1 });
    try {
      let createInput = projectUpdateInput(selectedProject);
      let res = await updateProjectMutation(createInput);
      let updatedProject = res.session.data;
      projects.map((project) => {
        if (project.id === updatedProject.id) {
          return {
            name: updatedProject.name,
            description: updatedProject.description,
            start_at: updatedProject.start_at,
            end_at: updatedProject.end_at,
            category: updatedProject.category,
            admin: updatedProject.admin,
            ...project,
          };
        }
        else return project;
      });
      handleModalClose(true);
    } catch (err) {
      alert(err);
    }
  };

  const deleteProject = async () => {
    try {
      await deleteProjectMutation(selectedProject);
      let currenProject = projects.find(project => project.id === selectedProject.id);
      currenProject && projects.splice(projects.indexOf(currenProject), 1);
      handleModalClose();
    } catch (err) {
      alert(err);
    }
  };

  const addUser = async () => {
    Object.assign(modelProjectData, { admin: 1 });
    try {
      let createInput = projectInput(modelProjectData);
      await createProjectMutation(createInput);
      handleModalClose(true);
    } catch (err) {
      alert(err);
    }
  };



  return (
    <div className="container-xxl">
      <Tab.Container defaultActiveKey="All">
        <PageHeader
          headerTitle="Projects"
          renderRight={() => {
            return (
              <div className="d-flex py-2 project-tab flex-wrap w-sm-100">
                <button
                  type="button"
                  className="btn btn-dark w-sm-100"
                  onClick={handleOpenAddModal}
                >
                  <i className="icofont-plus-circle me-2 fs-6" />
                  Create Project
                </button>
                <Nav
                  variant="pills"
                  className="nav nav-tabs tab-body-header rounded ms-3 prtab-set w-sm-100"
                >
                  <Nav.Item>
                    <Nav.Link eventKey="All">All</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="Scheduled">Scheduled</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="Approval">Approval</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="Completed">Completed</Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            );
          }}
        />
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12 flex-column">
            <Tab.Content>
              <Tab.Pane eventKey="All">
                <div className="row g-3 gy-5 py-3 row-deck">
                  {projects && projects.length > 0 && projects.map((d: any, i: number) => {
                    return (
                      <div
                        key={"key" + i}
                        className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                      >
                        <CurrentClientProject
                          teamImage={d.file}
                          logo={d.file}
                          logoBg={d.file}
                          title={d.name}
                          category={getCategory(d.category)}
                          startDate={d.start_at}
                          endDate={d.end_at}
                          onClickEdit={() => handleOpenEditModal(d)}
                          onClickDelete={() => handleOpenDeleteModal(d)}
                          onClickAddMember={handleOpenAddUserModal}
                          onClickAddAttachment={() => handleOpenAddAttachmentModal(d)}
                          onClickViewDescription={() => handleOpenViewDescriptionModal(d)}
                          onClickAddComment={() => handleOpenAddCommentModal(d)}
                          onClickAddTask={() => handleOpenAddTaskModal(d)}
                          onClickViewTasks={() => handleOpenViewTaskModal(d)}
                          comments_count={d.comments_count}
                          members_count={d.members_count}
                          attachment_count={d.projectfile_set.length}
                          tasks_count={d.tasks_count}
                        />
                      </div>
                    );
                  })}
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
        </div>
      </Tab.Container>
      <ProjectModal
        onClose={handleModalClose}
        modalHeader={modalHeader}
        isAddModal={isAddModal}
        isEditModal={isEditModal}
        handleModelData={handleProjectModelData}
        selectedProject={selectedProject}
        modelData={modelProjectData}
        categories={categories}
        admins={admins}
        onCreate={createProject}
        onUpdate={editProject}
      />
      <DeleteModal
        show={isDeleteModal}
        onClose={handleModalClose}
        onDelete={deleteProject}
        message="Are you sure you want to delete this project?"
        modalHeader={modalHeader}
      />
      <AddNewUserModal
        show={isAddUserModal}
        onClose={handleModalClose}
        modalHeader={modalHeader}
      />
      <AddNewAttachmentModal
        show={isAddAttachmentModal}
        onClose={handleModalClose}
        project={modelProjectData}
        modalHeader={modalHeader}
      />
      <DescriptionViewModal
        show={isViewDescriptionModal}
        data={selectedProject.description}
        onClose={handleModalClose}
        modalHeader={modalHeader}
      />
      <AddCommentModal
        show={isAddCommentModal}
        onClose={handleModalClose}
        modalHeader={modalHeader}
      />
      <TaskModal
        onClose={handleModalClose}
        modalHeader={modalHeader}
        isAddModal={isAddTaskModal}
        isEditModal={isEditTaskModal}
        handleModelData={handleTaskModelData}
        selectedProject={selectedProject}
        modelData={modelTaskData}
        onCreate={createTask}
        onUpdate={editTask}
        members={members}
      />
      <ViewTasksModal
        show={isViewTaskModal}
        onClose={handleModalClose}
        modalHeader={modalHeader}
      />
    </div>
  );
};

export default Projects;
