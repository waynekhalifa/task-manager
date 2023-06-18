import React from "react";
import { Modal, Nav, Tab } from "react-bootstrap";
import CurrentClientProject from "../../components/Clients/CurrentClientProject";
import AddNewUserModal from "../../components/common/AddNewUserModal";
import PageHeader from "../../components/common/PageHeader";
import { useCategoryQuery } from "framework/category/getAllCategory";
import { CategoryUpdateInput } from "types/category";
import {
  projectInput,
  useCreateProject,
} from "framework/project/create-project";
import { Project, SelectedProject } from "types/project";
import FormInputs from "components/FormInputs/FormInputs";
import { IField } from "types/formFields";
import { useProjectsQuery } from "framework/project/get-all-projects";
import { useDeleteProject } from "framework/project/delete.project";

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
  isDeleteModal: boolean;
  isAddUserModal: boolean;
  modalHeader: any;
  modelData: Project;
  selectedProject: SelectedProject;
}

const INITIAlIZE_DATA: State = {
  isAddModal: false,
  isEditModal: false,
  isDeleteModal: false,
  isAddUserModal: false,
  modalHeader: "",
  modelData: {} as Project,
  selectedProject: {} as SelectedProject,
};

const Projects: React.FC<Props> = () => {


  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { isAddModal, isEditModal, isDeleteModal, modalHeader, modelData, selectedProject, isAddUserModal } =
    state;
  const { mutateAsync: createMutation } = useCreateProject();
  const { mutateAsync: deleteMutation } = useDeleteProject();

  let { data: projectData, error: errorProjects, isLoading: loadingProjects } = useProjectsQuery({});


  let {
    data: categoriesData,
    error: errorCategories,
    isLoading: isLoadingCategories,
  } = useCategoryQuery({});
  if (isLoadingCategories || loadingProjects) return <div>Loading...</div>;
  if (errorCategories || errorProjects) return null;


  let projects: Project[] = projectData?.projects.data.results || [];

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

  const handleModalClose = () => {
    setState({
      ...state,
      isAddModal: false,
      isEditModal: false,
      isDeleteModal: false,
      isAddUserModal: false,
      modalHeader: "",
      modelData: {} as Project,
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
      selectedProject: project
    });
  };

  const handleOpenDeleteModal = (project: SelectedProject) => {
    setState({
      ...state,
      isDeleteModal: true,
      selectedProject: project
    });
  };

  const handleOpenAddUserModal = () => {
    setState({
      ...state,
      isAddUserModal: true,
    });
  };


  const handleModelData = (key: string, value: any) => {
    setState({
      ...state,
      modelData: {
        ...modelData,
        [key]: value,
      },
    });
  };


  const formFields: IField[] = [
    {
      label: "Project Name",
      type: "text",
      key: ModelKeys.NAME,
      value: modelData?.name,
      onChange: (e: any) => handleModelData(ModelKeys.NAME, e.target.value),
      placeholder: "Enter Project Name",

    },
    {
      label: "Department",
      type: "select",
      key: ModelKeys.CATEGORY,
      value: modelData?.category,
      onChange: (e: any) => handleModelData(ModelKeys.CATEGORY, e.target.value),
      options: categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      placeholder: "Select Category",
    },
    {
      label: "Description",
      type: "textarea",
      key: ModelKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (e: any) =>
        handleModelData(ModelKeys.DESCRIPTION, e.target.value),
      placeholder: "Enter Description",
    },
    {
      label: "Start Date",
      type: "date",
      key: ModelKeys.START_DATE,
      value: modelData?.start_at,
      onChange: (e: any) =>
        handleModelData(ModelKeys.START_DATE, e.target.value),
      placeholder: "Enter Start Date",
    },
    {
      label: "End Date",
      type: "date",
      key: ModelKeys.END_DATE,
      value: modelData?.end_at,
      onChange: (e: any) =>
        handleModelData(ModelKeys.END_DATE, e.target.value),
      placeholder: "Enter End Date",
    },
    {
      label: "Project thumbnail",
      type: "file",
      key: ModelKeys.FILES,
      value: modelData?.file,
      onChange: (e: any) => {
        let file: File = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (url) => {
          handleModelData(ModelKeys.FILE, file)
        };
      },
      placeholder: "Enter Thumbnail",
    },
    // {
    //   label: "Files",
    //   type: "file",
    //   key: ModelKeys.FILES,
    //   value: modelData?.files,
    //   onChange: (e: any) => {
    //     let files: File[] = [];
    //     for (let i = 0; i < e.target.files.length; i++) {
    //       let file: File = e.target.files[i];
    //       let reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = (url) => {
    //         files.push(file);
    //       };
    //     }

    //     handleModelData(ModelKeys.FILES, files)
    //   },
    //   placeholder: "Enter Files",
    //   multiple: true,
    // },
    {
      label: "Assign Admin",
      type: "select",
      key: ModelKeys.ADMIN,
      value: modelData?.admin,
      onChange: (e: any) => handleModelData(ModelKeys.ADMIN, e.target.value),
      options: admins.map((admin) => ({
        label: admin.label,
        value: admin.value,
      })),
    },
  ]



  const createProject = async () => {
    Object.assign(modelData, { admin: 1 });
    try {
      let createInput = projectInput(modelData);
      let res = await createMutation(createInput);
      projects.push(res);
      handleModalClose();
    } catch (err) {
      alert(err);
    }
  };

  const editProject = async () => {
    Object.assign(modelData, { admin: 1 });
    try {
      let createInput = projectInput(modelData);
      let res = await createMutation(createInput);
      projects.map((project) => {
        if (project.id === res.id) {
          return res;
        }
        return project;
      });
      handleModalClose();
    } catch (err) {
      alert(err);
    }
  };

  const deleteProject = async () => {
    try {
      await deleteMutation(selectedProject);
      let currenProject = projects.find(project => project.id === selectedProject.id);
      currenProject && projects.splice(projects.indexOf(currenProject), 1);
      handleModalClose();
    } catch (err) {
      alert(err);
    }
  };

  const addUser = async () => {
    Object.assign(modelData, { admin: 1 });
    try {
      let createInput = projectInput(modelData);
      await createMutation(createInput);
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
                    <Nav.Link eventKey="Started">Started</Nav.Link>
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
                        key={"ljsdhl" + i}
                        className="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-6"
                      >
                        <CurrentClientProject
                          teamImage={d.thumbnail}
                          logo={d.thumbnail}
                          logoBg={d.thumbnail}
                          title={d.name}
                          sl={d.category}
                          onClickEdit={() => handleOpenEditModal(d)}
                          onClickDelete={() => handleOpenDeleteModal(d)}
                          onClickAdd={handleOpenAddUserModal}
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
      <Modal show={isAddModal || isEditModal || isAddUserModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="card">
                <div className="card-body">
                  <FormInputs
                    formFields={formFields}
                  />
                </div>
              </div>
            </div>
          </div>


          {/* <div className="mb-3">
            <label htmlFor="exampleFormControlInput77" className="form-label">
              Project Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput77"
              placeholder="Explain what the Project Name"
              value={modelData ? modelData.name : ""}
              onChange={(e: any) => {
                setState({
                  ...state,
                  modelData: { ...modelData, name: e.target.value },
                });
              }}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Project Category</label>
            <select
              className="form-select"
              value={categories ? categories[0].id : ""}
              onChange={(e: any) => handleModelData("name", e.target.value)}
            >
              {categories.length > 0 &&
                categories.map((d: any, i: number) => (
                  <option key={"sdf" + i} value={d.id}>
                    {d.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="formFileMultipleone" className="form-label">
              Project Images &amp; Document
            </label>
            <input
              className="form-control"
              type="file"
              id="formFileMultipleone"
              multiple={true}
              onChange={(e: any) => {
                setState({
                  ...state,
                  editModeldata: {
                    ...editModeldata,
                    images: e.target.files,
                  },
                });
              }}
            // multiple=""
            />
          </div>
          <div className="deadline-form">
            <form>
              <div className="row g-3 mb-3">
                <div className="col">
                  <label htmlFor="datepickerded" className="form-label">
                    Project Start Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="datepickerded"
                    value={editModeldata ? editModeldata.start_at : ""}
                    onChange={(e: any) => {
                      setState({
                        ...state,
                        editModeldata: {
                          ...editModeldata,
                          start_at: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <div className="col">
                  <label htmlFor="datepickerdedone" className="form-label">
                    Project End Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="datepickerdedone"
                    value={editModeldata ? editModeldata.end_at : ""}
                    onChange={(e: any) => {
                      setState({
                        ...state,
                        editModeldata: {
                          ...editModeldata,
                          end_at: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col-sm-12">
                  <label htmlFor="formFileMultipleone" className="form-label">
                    Task Assign Person
                  </label>
                  <select
                    className="form-select"
                    multiple={true}
                    value={editModeldata ? editModeldata.assignPerson : ""}
                    onChange={(e: any) => {
                      setState({
                        ...state,
                        editModeldata: {
                          ...editModeldata,
                          admin: parseFloat(e.target.value),
                        },
                      });
                    }}
                  >
                    <option>Lucinda Massey</option>
                    <option value="1">Ryan Nolan</option>
                    <option value="2">Oliver Black</option>
                    <option value="3">Adam Walker</option>
                    <option value="4">Brian Skinner</option>
                    <option value="5">Dan Short</option>
                    <option value="5">Jack Glover</option>
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleFormControlTextarea78"
              className="form-label"
            >
              Description (optional)
            </label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea78"
              rows={3}
              placeholder="Add any extra details about the request"
              value={editModeldata ? editModeldata.description : ""}
              onChange={(e: any) => {
                setState({
                  ...state,
                  editModeldata: {
                    ...editModeldata,
                    description: e.target.value,
                  },
                });
              }}
            />
          </div> */}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={createProject}
          >
            Create
          </button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={isDeleteModal}
        centered
        onHide={handleModalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Delete Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="justify-content-center flex-column d-flex">
          <i className="icofont-ui-delete text-danger display-2 text-center mt-2" />
          <p className="mt-4 fs-5 text-center">
            You can only delete this item Permanently
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleModalClose}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-danger color-fff"
            onClick={deleteProject}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      <AddNewUserModal
        show={isAddUserModal}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Projects;
