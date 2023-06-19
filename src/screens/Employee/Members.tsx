import React from "react";
import { Dropdown, Modal } from "react-bootstrap";
import OurClients from "components/Clients/OurClients";
import PageHeader from "components/common/PageHeader";
import { MembersData } from "components/Data/AppData";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import FormInputs from "components/FormInputs/FormInputs";
import { IField } from "types/formFields";
import { EmployeeCreateInput } from "types/employee";
import { usePermissionsQuery } from "framework/permissions/getAllPermissions";
import { useCategoriesQuery } from "framework/category/getAllCategories";
import { Category } from "types/category";

interface Props { }

enum ModelKeys {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD = "password1",
  ONBOARD_AT = "onboard_at",
  EMPLOYEE_ID = "employee_id",
  PHONE = "phone",
  DEPARTMENT = "department",
  FILES = "files",
}

interface State {
  isModal: boolean;
  show: boolean;
  modelData: EmployeeCreateInput;
}

const INITIAlIZE_DATA: State = {
  isModal: false,
  show: false,
  modelData: {} as EmployeeCreateInput,
};

const Members: React.FC<Props> = () => {
  const [state, setState] = React.useState(INITIAlIZE_DATA);
  const { isModal, modelData } = state;

  const { data: employeeData, error: employeeError, isLoading: employeeIsLoading } = useEmployeesQuery({});
  const { data: permissionsData, error: permissionsError, isLoading: permissionsIsLoading } = usePermissionsQuery({});
  const { data: departmentData, error: departmentError, isLoading: departmentIsLoading } = useCategoriesQuery({});

  let permissions = permissionsData?.permissions?.data?.results || [];
  let departments = departmentData?.categories?.data?.results || [];
  console.log("permissions", permissions)
  console.log("departments", departments)

  if (employeeIsLoading || permissionsIsLoading || departmentIsLoading) return <div>Loading...</div>;
  if (employeeError || permissionsError || departmentError) return null;

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
      label: "First Name",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.FIRST_NAME,
      value: modelData?.first_name,
      onChange: (e: any) => handleModelData(ModelKeys.FIRST_NAME, e.target.value),
      placeholder: "Enter First Name",
    },
      {
      label: "Last Name",
        type: "text",
      width: "col-md-6",
      key: ModelKeys.FIRST_NAME,
      value: modelData?.first_name,
      onChange: (e: any) => handleModelData(ModelKeys.FIRST_NAME, e.target.value),
      placeholder: "Enter Last Name",
    },
    {
      label: "Employee Profile Image",
      type: "file",
      width: "col-md-12",
      key: ModelKeys.FILES,
      value: modelData?.employee?.files,
      onChange: (e: any) => {
        let files: File[] = [];
        for (let i = 0; i < e.target.files.length; i++) {
          let file: File = e.target.files[i];
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (url) => {
            files.push(file);
          };
        }

        handleModelData(ModelKeys.FILES, files)
      },
      placeholder: "Enter Files",
    },
    {
      label: "Employee ID",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.USERNAME,
      value: modelData?.username,
      onChange: (e: any) => handleModelData(ModelKeys.USERNAME, e.target.value),
      placeholder: "ID or User Name",
    },
    {
      label: "Joining Date",
      type: "date",
      width: "col-md-6",
      key: ModelKeys.ONBOARD_AT,
      value: modelData?.employee?.onboard_at,
      onChange: (e: any) =>
        handleModelData(ModelKeys.ONBOARD_AT, e.target.value),
      placeholder: "Enter Start Date",
    },
    {
      label: "Employee User Name",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.USERNAME,
      value: modelData?.username,
      onChange: (e: any) => handleModelData(ModelKeys.USERNAME, e.target.value),
      placeholder: "User Name",
    },
    {
      label: "Password",
      type: "password",
      width: "col-md-6",
      key: ModelKeys.USERNAME,
      value: modelData?.username,
      onChange: (e: any) => handleModelData(ModelKeys.USERNAME, e.target.value),
      placeholder: "Password",
    },
    {
      label: "Email",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.USERNAME,
      value: modelData?.username,
      onChange: (e: any) => handleModelData(ModelKeys.USERNAME, e.target.value),
      placeholder: "Email",
    },
    {
      label: "Phone Number",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.USERNAME,
      value: modelData?.username,
      onChange: (e: any) => handleModelData(ModelKeys.USERNAME, e.target.value),
      placeholder: "Phone Number",
    },
    {
      label: "Department",
      type: "select",
      width: "col-md-6",
      key: ModelKeys.DEPARTMENT,
      value: modelData?.employee?.department,
      onChange: (e: any) => handleModelData(ModelKeys.DEPARTMENT, e.target.value),
      options: departments.map((department : Category) => ({
        label: department.name,
        value: department.id,
      })),
      placeholder: "Select Department",
    },
    {
      label: "Designation",
      type: "select",
      width: "col-md-6",
      key: ModelKeys.DESIGNATION,
      value: modelData?.employee?.Designation,
      onChange: (e: any) => handleModelData(ModelKeys.DEPARTMENT, e.target.value),
      options: departments.map((department : Category) => ({
        label: department.name,
        value: department.id,
      })),
      placeholder: "Select Department",
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: ModelKeys.EMAIL,
      value: modelData?.email,
      onChange: (e: any) =>
        handleModelData(ModelKeys.EMAIL, e.target.value),
      placeholder: "Enter Description",
    },
  ]


  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Employee"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-dark btn-set-task w-sm-100 me-2"
                onClick={() => {
                  setState((prevState) => ({ ...prevState, isModal: true }));
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Employee
              </button>
              <Dropdown>
                <Dropdown.Toggle as="button" className="btn btn-primary ">
                  Status
                </Dropdown.Toggle>
                <Dropdown.Menu as="ul" className="dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="#!">
                      Company
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      AgilSoft Tech
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Macrosoft
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Google
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Pixelwibes
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Deltasoft Tech
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#!">
                      Design Tech
                    </a>
                  </li>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          );
        }}
      />
      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
        {MembersData.map((data: any, i: number) => {
          return (
            <div key={"skhd" + i} className="col">
              <OurClients
                avatar={data.avatar}
                post={data.post}
                name={data.name}
                Companyname={data.Companyname}
                isMember={true}
              />
            </div>
          );
        })}
      </div>
      <Modal
        centered
        show={isModal}
        size="lg"
        onHide={() => {
          setState((prevState) => ({ ...prevState, isModal: false }));
        }}
      >

        
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Add Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="modal-body">
            <FormInputs formFields={formFields} formName={"employee"} />
            
            <div className="table-responsive">
              <table className="table table-striped custom-table mt-3">
                <thead>
                  <tr>
                    <th>Project Permission</th>
                    {permissions.map((permission: any, i: number) => {
                          return (
                            <th key={"key" + i} className="text-center">{permission.name}</th>
                          );
                        })}
                    {/* <th className="text-center">Read</th>
                    <th className="text-center">Write</th>
                    <th className="text-center">Create</th>
                    <th className="text-center">Delete</th>
                    <th className="text-center">Import</th>
                    <th className="text-center">Export</th> */}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="fw-bold">Projects</td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault1"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault2"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault3"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault4"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault5"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault6"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Tasks</td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault7"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault8"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault9"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault10"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault11"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault12"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Chat</td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault13"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault14"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault15"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault16"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault17"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault18"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Estimates</td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault19"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault20"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault21"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault22"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault23"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault24"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Invoices</td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault25"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault26"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault27"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault28"
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault29"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault30"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="fw-bold">Timing Sheets</td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault31"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault32"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault33"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault34"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault35"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                    <td className="text-center">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault36"
                        checked={true}
                        onChange={() => { }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setState({ ...state, isModal: false });
            }}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary"
          onClick={() => {
              setState({ ...state, isModal: false });
              handleSubmit()
            }}
          >
            Add Employee
          </button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Members;
