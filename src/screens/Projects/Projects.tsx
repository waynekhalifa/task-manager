import React from "react";
import { Tab } from "react-bootstrap";
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
import {
  projectUpdateInput,
  useUpdateProject,
} from "framework/project/updateProject";
import AddCommentModal from "components/common/AddCommentModal";
import ViewTasksModal from "components/common/ViewTasksModal";
import ProjectModal from "components/common/ProjectModal";
import TaskModal from "components/common/TaskModal";
import DeleteModal from "components/common/DeleteModal";
import { Task } from "types/task";
import { taskInput, useCreateTask } from "framework/task/create-task";
import ProjectCard from "components/Projects/ProjectCard";
import { checkPermission, getCategory } from "utils/helper";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import { Employee } from "types/employee";
import { useGroupQuery } from "framework/Group/getAllGroups";
import { Group } from "types/group";
import {
  createAssignInput,
  useAssignMemberToProject,
} from "framework/project/assignMember";
import { Permission } from "enums/permission";

interface Props {}

enum ModelKeys {
  NAME = "name",
  CATEGORY = "category",
  DESCRIPTION = "description",
  START_DATE = "start_at",
  END_DATE = "end_at",
  ADMIN = "admin",
  GROUP = "group",
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
  const {
    isAddModal,
    isEditModal,
    isDeleteModal,
    modalHeader,
    modelProjectData,
    modelTaskData,
    selectedProject,
    isAddUserModal,
    isAddAttachmentModal,
    isViewDescriptionModal,
    isAddCommentModal,
    isAddTaskModal,
    isEditTaskModal,
    isViewTaskModal,
  } = state;
  const { mutateAsync: createProjectMutation } = useCreateProject();
  const { mutateAsync: updateProjectMutation } = useUpdateProject();
  const { mutateAsync: deleteProjectMutation } = useDeleteProject();
  const { mutateAsync: createTaskMutation } = useCreateTask();
  const { mutateAsync: AssignMemberMutation } = useAssignMemberToProject();

  let {
    data: projectData,
    error: errorProjects,
    isLoading: loadingProjects,
  } = useProjectsQuery({});
  const {
    data: employeeData,
    error: employeeError,
    isLoading: employeeIsLoading,
  } = useEmployeesQuery({});
  let {
    data: categoriesData,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useCategoriesQuery({});
  const {
    data: groupData,
    error: groupError,
    isLoading: groupIsLoading,
  } = useGroupQuery({});

  if (
    isLoadingCategories ||
    loadingProjects ||
    employeeIsLoading ||
    groupIsLoading
  )
    return <div>Loading...</div>;
  if (errorCategories || errorProjects || employeeError || groupError)
    return null;

  let projects: SelectedProject[] = projectData?.projects.data.results || [];
  let categories: CategoryUpdateInput[] =
    categoriesData?.categories.data.results || [];

  let categoryOptions = categories.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });
  categoryOptions.unshift({
    label: "Select Department",
    value: 0,
  });

  let employees: Employee[] = employeeData?.employees?.data?.results || [];
  let employeeOptions = employees.map((employee) => {
    return {
      label: employee?.user?.first_name + " " + employee?.user?.last_name,
      value: employee.id,
    };
  });

  let groups: Group[] = groupData?.groups?.data?.results || [];
  let groupOptions = groups.map((group) => {
    return {
      label: group.name,
      value: group.id,
    };
  });
  groupOptions.unshift({
    label: "Select Group",
    value: 0,
  });

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

  const handleOpenAddUserModal = (project: SelectedProject) => {
    setState({
      ...state,
      isAddUserModal: true,
      modalHeader: "Assign Member",
      selectedProject: project,
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
  };

  const handleOpenAddTaskModal = (project: SelectedProject) => {
    setState({
      ...state,
      isAddTaskModal: true,
      selectedProject: project,
      modalHeader: "Add Task",
    });
  };

  const handleOpenViewTaskModal = (project: SelectedProject) => {
    setState({
      ...state,
      isViewTaskModal: true,
      selectedProject: project,
      modalHeader: "View Tasks",
    });
  };

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

  const assignMember = async (employee: Employee) => {
    try {
      const createInput = createAssignInput({
        user: employee.id,
        project: selectedProject?.id!,
      });
      await AssignMemberMutation(createInput);
      handleModalClose(true);
    } catch (err) {
      alert(err);
    }
  };

  const createTask = async () => {
    if (!modelTaskData.name) {
      alert("Please enter title");
      return;
    }

    if (!modelTaskData.group) {
      alert("Please select group");
      return;
    }
    if (!modelTaskData.user) {
      alert("Please select member");
      return;
    }
    try {
      Object.assign(modelTaskData, { project: selectedProject.id });
      let createInput = taskInput(modelTaskData);
      await createTaskMutation(createInput);
      handleModalClose(true);
    } catch (error) {
      alert(error);
    }
  };

  const createProject = async () => {
    if (!modelProjectData.name) {
      alert("Please enter title");
      return;
    }
    if (!modelProjectData.category || modelProjectData.category === 0) {
      alert("Please select department");
      return;
    }
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
    try {
      let createInput = projectUpdateInput(selectedProject);
      let res = await updateProjectMutation({
        id: selectedProject.id,
        data: createInput,
      });
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
        } else return project;
      });
      handleModalClose(true);
    } catch (err) {
      alert(err);
    }
  };

  const deleteProject = async () => {
    try {
      await deleteProjectMutation(selectedProject);
      let currenProject = projects.find(
        (project) => project.id === selectedProject.id
      );
      currenProject && projects.splice(projects.indexOf(currenProject), 1);
      handleModalClose();
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
                {checkPermission(Permission.ADD_PROJECT) && (
                  <button
                    type="button"
                    className="btn btn-dark w-sm-100"
                    onClick={handleOpenAddModal}
                  >
                    <i className="icofont-plus-circle me-2 fs-6" />
                    Create Project
                  </button>
                )}
                {/* <Nav
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
                </Nav> */}
              </div>
            );
          }}
        />
        <div className="row align-items-center">
          <div className="col-lg-12 col-md-12 flex-column">
            <Tab.Content>
              <Tab.Pane eventKey="All">
                <div className="row g-3 gy-5 py-3 row-deck">
                  {projects &&
                    projects.length > 0 &&
                    projects.map((d: any, i: number) => {
                      return (
                        <div
                          key={"key" + i}
                          className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                        >
                          <ProjectCard
                            project={d}
                            category={getCategory(categories, d.category)}
                            onClickEdit={() => handleOpenEditModal(d)}
                            onClickDelete={() => handleOpenDeleteModal(d)}
                            onClickAddMember={() => handleOpenAddUserModal(d)}
                            onClickAddAttachment={() =>
                              handleOpenAddAttachmentModal(d)
                            }
                            onClickViewDescription={() =>
                              handleOpenViewDescriptionModal(d)
                            }
                            onClickAddComment={() =>
                              handleOpenAddCommentModal(d)
                            }
                            onClickAddTask={() => handleOpenAddTaskModal(d)}
                            onClickViewTasks={() => handleOpenViewTaskModal(d)}
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
        categories={categoryOptions}
        admins={employeeOptions}
        onCreate={createProject}
        onUpdate={editProject}
        groups={groupOptions}
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
        employees={employees}
        // groups={groups}
        departments={categories}
        onSelect={assignMember}
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
        members={employeeOptions}
        groups={groupOptions}
      />
      <ViewTasksModal
        show={isViewTaskModal}
        onClose={handleModalClose}
        modalHeader={modalHeader}
        project={selectedProject}
      />
    </div>
  );
};

export default Projects;
