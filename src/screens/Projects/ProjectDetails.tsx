import CurrentClientProject from "components/Clients/CurrentClientProject";
import Attachment from "components/common/Attachment";
import Comment from "components/common/Comment";
import DeleteModal from "components/common/DeleteModal";
import Member from "components/common/Member";
import ProjectModal from "components/common/ProjectModal";
import TaskModal from "components/common/TaskModal";
import { useCategoriesQuery } from "framework/category/getAllCategories";
import { useCreateProject } from "framework/project/createProject";
import { useDeleteProject } from "framework/project/deleteProject";
import { useSingleProject } from "framework/project/getSingleProject";
import { projectUpdateInput, useUpdateProject } from "framework/project/updateProject";
import { useCreateTask } from "framework/task/create-task";
import { useUploadTaskAttachment } from "framework/task/uploadTaskAttachment";
import React from "react";
import { CategoryUpdateInput } from "types/category";
import { IField } from "types/formFields";
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
  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { isEditModal, isDeleteModal, modalHeader, modelProjectData, modelTaskData, selectedProject, isAddUserModal, isAddTaskModal, isEditTaskModal, isViewTaskModal } =
    state;
  let { data, error, isLoading } = useSingleProject({ id });

  const { mutateAsync: createProjectMutation } = useCreateProject();
  const { mutateAsync: updateProjectMutation } = useUpdateProject();
  const { mutateAsync: deleteProjectMutation } = useDeleteProject();
  const { mutateAsync: createTaskMutation } = useCreateTask();
  const { mutateAsync: updateTaskMutation } = useUpdateProject();
  const { mutateAsync: deleteTaskMutation } = useDeleteProject();
  const { mutateAsync: uploadTaskAttachmentMutation } = useUploadTaskAttachment();

  let tasks: SelectedTask[] = [
    {
      id: 1,
      name: "Task 1",
      description: "Task 1 description",
      start_at: "2021-09-01",
      end_at: "2021-09-01",
      task_progress: "In Progress",
      task_priority: "HIGH",
      files: [],
      user: 1
    },
    {
      id: 2,
      name: "Task 2",
      description: "Task 2 description",
      start_at: "2021-09-01",
      end_at: "2021-09-01",
      task_progress: "In Progress",
      task_priority: "HIGH",
      files: [],
      user: 1
    },

  ];

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

  if (isLoading || isLoadingCategories) return <div>Loading...</div>;
  if (error || errorCategories) return null;

  let project: SelectedProject = data || {} as SelectedProject;
  let categories: CategoryUpdateInput[] = categoriesData?.categories?.data?.results || [];

  const getCategoryNameById = (id: number) => {
    let category = categories.find((category) => category.id === id);
    return category;
  };

  const getAdminNameById = (id: number) => {
    let admin = users.find((user) => user.id === id);
    return admin;
  };


  let users = [
    {
      id: 1,
      avatar: "https://via.placeholder.com/150",
      post: "Teacher",
      name: "John Doe",
      department: "Academic Department",

    },
    {
      id: 2,
      avatar: "https://via.placeholder.com/150",
      post: "Teacher",
      name: "John Doe",
      department: "Academic Department",

    },
    {
      id: 3,
      avatar: "https://via.placeholder.com/150",
      post: "Teacher",
      name: "John Doe",
      department: "Academic Department",

    },
    {
      id: 4,
      avatar: "https://via.placeholder.com/150",
      post: "Teacher",
      name: "John Doe",
      department: "Academic Department",

    }

  ];



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

  let members = project?.members || [
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

  const formFields: IField[] = [
    {
      label: "Project Name",
      type: "text",
      key: ModelKeys.NAME,
      value: isEditModal ? selectedProject.name : modelProjectData?.name,
      onChange: (e: any) => handleProjectModelData(ModelKeys.NAME, e.target.value),
      placeholder: "Enter Project Name",
      width: "col-md-12",
      default: project.name
    },
    {
      label: "Stages",
      type: "select",
      key: ModelKeys.CATEGORY,
      value: isEditModal ? selectedProject.category : modelProjectData?.category,
      onChange: (e: any) => handleProjectModelData(ModelKeys.CATEGORY, e.target.value),
      options: categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      placeholder: "Select Category",
      width: "col-md-12",
      default: {
        label: getCategoryNameById(project?.category!),
        value: project.category,
      }
    },
    {
      label: "Description",
      type: "textarea",
      key: ModelKeys.DESCRIPTION,
      value: isEditModal ? selectedProject.description : modelProjectData?.description,
      onChange: (e: any) =>
        handleProjectModelData(ModelKeys.DESCRIPTION, e.target.value),
      placeholder: "Enter Description",
      width: "col-md-12",
      default: project.description
    },
    {
      label: "Start Date",
      type: "date",
      key: ModelKeys.START_DATE,
      value: isEditModal ? selectedProject.start_at : modelProjectData?.start_at,
      onChange: (e: any) =>
        handleProjectModelData(ModelKeys.START_DATE, e.target.value),
      placeholder: "Enter Start Date",
      width: "col-md-6",
      default: new Date(project?.end_at!).toISOString().split('T')[0]
    },
    {
      label: "End Date",
      type: "date",
      key: ModelKeys.END_DATE,
      value: isEditModal ? selectedProject.end_at : modelProjectData?.end_at,
      onChange: (e: any) =>
        handleProjectModelData(ModelKeys.END_DATE, e.target.value),
      placeholder: "Enter End Date",
      width: "col-md-6",
      default: new Date(project?.end_at!).toISOString().split('T')[0]
    },
    // {
    //   label: "Project thumbnail",
    //   type: "file",
    //   key: ModelKeys.FILES,
    //   value: isEditModal ? selectedProject.file : modelProjectData?.file,
    //   onChange: (e: any) => {
    //     let file: File = e.target.files[0];
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = (url) => {
    //       handleProjectModelData(ModelKeys.FILE, file)
    //     };
    //   },
    //   placeholder: "Enter Thumbnail",
    //   hide: isEditModal,
    //   width: "col-md-12",

    // },
    {
      label: "Assign Admin",
      type: "select",
      key: ModelKeys.ADMIN,
      value: isEditModal ? selectedProject.admin : modelProjectData?.admin,
      onChange: (e: any) => handleProjectModelData(ModelKeys.ADMIN, e.target.value),
      options: admins.map((admin) => ({
        label: admin.label,
        value: admin.value,
      })),
      width: "col-md-12",
      default: {
        label: getAdminNameById(project?.admin!),
        value: project?.admin,
      },
    },
  ]


  const handleOpenAddTaskModal = (project: SelectedProject) => {
    setState({
      ...state,
      isAddTaskModal: true,
      selectedProject: project,
      modalHeader: "Add Task",
    });
  }

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

  const handleOpenEditTaskModal = (project: SelectedProject) => {
    setState({
      ...state,
      isEditTaskModal: true,
      selectedProject: project,
      modalHeader: "Edit Task",
    });
  };


  const handleTaskModelData = (key: string, value: any) => {
    let users: any[] = [];
    if (key === ModelKeys.USER) {
      users = modelTaskData?.user || [];
      users.push(value);
    }
    if (isEditTaskModal) {
      setState({
        ...state,
        modelTaskData: {
          ...modelTaskData,
          [key]: key === ModelKeys.USER ? users : value,
        },
      });
      return;
    }

    setState((prevState) => ({
      ...prevState,
      modelTaskData: {
        ...prevState.modelTaskData,
        [key]: key === ModelKeys.USER ? users : value,
      },
    }));
  };


  const createTask = async () => {
    setState({
      ...state,
      modelTaskData: {
        ...modelTaskData,

      },
    });
    try {
      tasks.push(
        {
          id: tasks.length + 1,
          name: modelTaskData.name,
          description: modelTaskData.description,
          start_at: modelTaskData.start_at,
          end_at: modelTaskData.end_at,
          task_progress: "To Do",
          task_priority: modelTaskData.task_priority,
          files: [],
          user: modelTaskData.user[0]
        },
      )
      handleModalClose();
      // Object.assign(modelTaskData, { project: selectedProject.id });
      // let createInput = taskInput(modelTaskData);
      // let res = await createTaskMutation(createInput);
      // let task = res.session.data;
      // tasks.push(task);
      // handleModalClose();
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



  const editProject = async () => {
    // Object.assign(selectedProject, { admin: 1 });
    try {
      let createInput = projectUpdateInput(selectedProject);
      await updateProjectMutation(createInput);
      handleModalClose(true);
    } catch (err) {
      alert(err);
    }
  };

  const deleteProject = async () => {
    try {
      await deleteProjectMutation(project);
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
            {/* tasks */}
            <div className="dd-handle mt-2">
              <h5 className="text-primary"><strong>Tasks</strong></h5>

              {tasks.map((task, index: number) => (
                <div className="d-flex justify-content-between" key={index}>
                  <p className="badge bg-light ms-2 text-dark">{task.name}</p>
                  <p className="badge bg-secondary ms-2">{task.task_progress}</p>

                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                    // onClick={han}
                    >
                      <i className="icofont-edit text-success"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                    // onClick={onClickDelete}
                    >
                      <i className="icofont-ui-delete text-danger"></i>
                    </button>
                  </div>

                </div>

              ))}
              <div className="d-flex justify-content-end py-2">
                <button className="btn btn-primary"
                  onClick={() => handleOpenAddTaskModal(project)}
                >Add Task</button>
              </div>
            </div>


          </div>
          <div className="col-lg-8 col-md-12">
            <div className="dd-handle mt-2">
              <h5 className="card-title text-primary"><strong>Members</strong></h5>
              <Member users={users} />
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
        categories={categories}
        admins={admins}
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
        onUpdate={editTask}
        members={members}
      />
    </div>
  );
};

export default ProjectDetails;