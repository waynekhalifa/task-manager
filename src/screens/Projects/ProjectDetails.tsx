import CurrentClientProject from "components/Clients/CurrentClientProject";
import TaskNestable from "components/Tasks/TaskNestable";
import Attachment from "components/common/Attachment";
import Comment from "components/common/Comment";
import DeleteModal from "components/common/DeleteModal";
import Member from "components/common/Member";
import ProjectModal from "components/common/ProjectModal";
import TaskModal from "components/common/TaskModal";
import { useGroupQuery } from "framework/Group/getAllGroups";
import { useCategoriesQuery } from "framework/category/getAllCategories";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import { useDeleteProject } from "framework/project/deleteProject";
import { useSingleProject } from "framework/project/getSingleProject";
import { projectUpdateInput, useUpdateProject } from "framework/project/updateProject";
import { taskInput, useCreateTask } from "framework/task/create-task";
import { useTaskQuery } from "framework/task/get-all-tasks";
import useApp from "hooks/useApp";
import React from "react";
import { CategoryUpdateInput } from "types/category";
import { Employee } from "types/employee";
import { Group } from "types/group";
import { Project, SelectedProject } from "types/project";
import { SelectedTask, Task } from "types/task";

interface Props {
  id: number;
}

enum ModelKeys {
  NAME = "name",
  CATEGORY = "category",
  DESCRIPTION = "description",
  START_DATE = "start_at",
  END_DATE = "end_at",
  ADMIN = "admin",
  FILE = "file",
  FILES = "files",
  ClOUD_FILES = "cloudFiles",
  USER = "user",
}
interface State {
  isEditModal: boolean;
  isAddTaskModal: boolean;
  isEditTaskModal: boolean;
  isDeleteModal: boolean;
  isAddUserModal: boolean;
  isViewTaskModal: boolean;
  modalHeader: any;
  modelProjectData: Project;
  modelTaskData: Task;
  selectedProject: SelectedProject;
}

const INITIAlIZE_DATA: State = {
  isEditModal: false,
  isDeleteModal: false,
  isAddTaskModal: false,
  isEditTaskModal: false,
  isViewTaskModal: false,
  isAddUserModal: false,
  modalHeader: "",
  modelProjectData: {} as Project,
  modelTaskData: {} as Task,
  selectedProject: {} as SelectedProject,
};

const ProjectDetails: React.FC<Props> = ({ id }) => {
  const { push } = useApp();
  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { isEditModal, isDeleteModal, modalHeader, modelProjectData, modelTaskData, selectedProject, isAddUserModal, isAddTaskModal, isEditTaskModal, isViewTaskModal } =
    state;
  let { data, error, isLoading } = useSingleProject({ id });

  const { mutateAsync: updateProjectMutation } = useUpdateProject();
  const { mutateAsync: deleteProjectMutation } = useDeleteProject();
  const { mutateAsync: createTaskMutation } = useCreateTask();



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

  let {
    data: categoriesData,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useCategoriesQuery({});
  const {
    data: tasksData,
    error: errorsTask,
    isLoading: loadingTasks,
  } = useTaskQuery({ query: "?project=" + id });
  const { data: employeeData, error: employeeError, isLoading: employeeIsLoading } = useEmployeesQuery({});
  const { data: groupData, error: groupError, isLoading: groupIsLoading } = useGroupQuery({});


  if (isLoading || isLoadingCategories || loadingTasks || employeeIsLoading || groupIsLoading) return <div>Loading...</div>;
  if (error || errorCategories || errorsTask || employeeError || groupError) return null;

  let project: SelectedProject = data || {} as SelectedProject;
  let categories: CategoryUpdateInput[] = categoriesData?.categories?.data?.results || [];
  let tasks: SelectedTask[] = tasksData?.tasks?.data?.results || [] as SelectedTask[];
  let employees: Employee[] = employeeData?.employees?.data?.results || [];
  let employeeOptions = employees.map((employee) => {
    return {
      label: employee?.user?.first_name + " " + employee?.user?.last_name,
      value: employee.id,
    };
  }
  );

  let groups: Group[] = groupData?.groups?.data?.results || [];
  let groupOptions = groups.map((group) => {
    return {
      label: group.name,
      value: group.id,
    };
  }
  );
  groupOptions.unshift({
    label: "Select Group",
    value: 0,
  });
  const getCategoryNameById = (id: number) => {
    let category = categories.find((category) => category.id === id);
    return category;
  };

  const categoriesOptions = categories.map((category) => {
    return { label: category.name, value: category.id };
  }
  );
  categoriesOptions.unshift({ label: "Select Department", value: 0 });




  const handleOpenAddTaskModal = (project: SelectedProject) => {
    setState({
      ...state,
      isAddTaskModal: true,
      selectedProject: project,
      modalHeader: "Add Task",
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

  const handleModalClose = (reload: boolean = false) => {
    if (reload === true) window.location.reload();
    setState({
      ...state,
      isEditModal: false,
      isDeleteModal: false,
      isAddUserModal: false,
      isAddTaskModal: false,
      isEditTaskModal: false,
      isViewTaskModal: false,
      modelTaskData: {} as Task,
      modelProjectData: {} as Project
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
      let res = await createTaskMutation(createInput);
      let task = res.session.data;
      tasks.push(task);
      handleModalClose();
    } catch (error) {
      alert(error);
    }
  };




  const editProject = async () => {
    // Object.assign(selectedProject, { admin: 1 });
    try {
      let createInput = projectUpdateInput(selectedProject);
      await updateProjectMutation({
        id: selectedProject.id,
        data: createInput,
      });
      handleModalClose(true);
    } catch (err) {
      alert(err);
    }
  };

  const deleteProject = async () => {
    try {
      await deleteProjectMutation(project);
      push("/dashboard/projects");
    } catch (err) {
      alert(err);
    }
  };

  const addUser = async () => {
    Object.assign(modelProjectData, { admin: 1 });
    try {

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
      <h2>Project Details</h2>
      <div className="container-xxl">
        <div className="row g-3 mb-3 mt-3">
          <div className="col-lg-4 col-md-12">
            <CurrentClientProject
              project={project}
              category={getCategoryNameById(project?.category!)?.name}
              onClickEdit={() => handleOpenEditModal(project)}
              onClickDelete={() => handleOpenDeleteModal(project)}
            />


          </div>
          <div className="col-lg-8 col-md-12">
            <div className="dd-handle mt-2">
              <Member
                employees={employees}
                departments={categories}

              />
            </div>
          </div>

          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary"><strong>Attachments</strong></h5>
                <Attachment
                  project={project}
                />
              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary mb-3"><strong>Comments</strong></h5>
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
                  <div className="col-md-12">
                    <div className="d-flex justify-content-end pt-2">
                      <button className="btn btn-primary"
                        onClick={() => handleOpenAddTaskModal(project)}
                      >Create Task</button>
                    </div>
                    <TaskNestable
                      tasks={tasks}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ProjectModal
        onClose={handleModalClose}
        modalHeader={modalHeader}
        isEditModal={isEditModal}
        handleModelData={handleProjectModelData}
        selectedProject={selectedProject}
        modelData={modelProjectData}
        categories={categoriesOptions}
        admins={employeeOptions}
        // groups={groupOptions}
        onUpdate={editProject}
      />
      <DeleteModal
        show={isDeleteModal}
        onClose={handleModalClose}
        onDelete={deleteProject}
        message="Are you sure you want to delete this project?"
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
    </div>
  );
};

export default ProjectDetails;