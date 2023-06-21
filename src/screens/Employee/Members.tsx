import React, { useEffect, useMemo, useState } from "react";
import { Dropdown, Modal } from "react-bootstrap";
import OurClients from "components/Clients/OurClients";
import PageHeader from "components/common/PageHeader";
import { MembersData } from "components/Data/AppData";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import { useCreateEmployee, employeeInput } from "framework/employee/createEmployee";
import FormInputs from "components/FormInputs/FormInputs";
import { IField } from "types/formFields";
import { EmployeeCreateInput } from "types/employee";
import { useCategoriesQuery } from "framework/category/getAllCategories";
import { Category } from "types/category";
import PermissionsTable from "./PermissionsTable";

interface Props { }

enum ModelKeys {
  FIRST_NAME = "first_name",
  LAST_NAME = "last_name",
  USERNAME = "username",
  EMAIL = "email",
  PASSWORD1 = "password1",
  ONBOARD_AT = "onboard_at",
  EMPLOYEE_ID = "employee_id",
  PHONE = "phone",
  DEPARTMENT = "department",
  FILES = "files",
  DESCRIPTION = "description",
}

interface State {
  isModal: boolean;
  show: boolean;
  modelData: EmployeeCreateInput;
  departmentValue: string;
  isDepartmentAdmin: boolean;
  createdEmployee: any;

}

const INITIAlIZE_DATA: State = {
  isModal: false,
  show: false,
  modelData: {} as EmployeeCreateInput,
  departmentValue: "",
  isDepartmentAdmin: false,
  createdEmployee: null,
};

const Members: React.FC<Props> = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { isModal, modelData, isDepartmentAdmin, departmentValue, createdEmployee } = state;
  const { data: employeeData, error: employeeError, isLoading: employeeIsLoading } = useEmployeesQuery({});
  const { data: departmentData, error: departmentError, isLoading: departmentIsLoading } = useCategoriesQuery({});
  const { mutateAsync: createMutation } = useCreateEmployee();

  const handleCreateEmployee = async () => {
    Object.assign(modelData, { admin: 1 });
    try {
      let createInput = employeeInput(modelData);
      const employeeData = await createMutation(createInput);
      if (employeeData) {
        setState({ ...state, createdEmployee: employeeData?.session?.data });
      }
      // closeModal();
    } catch (err) {
      alert(err);
    }
  }
  
  const departments = useMemo(() => departmentData?.categories?.data?.results || [], [departmentData]);

  const handleModelData = (key: string, value: any) => {
    if (key === ModelKeys.DEPARTMENT) {
      const stringValue = departments.find((department: any) => String(department.id) === value)?.name;
      setState({ ...state, departmentValue: stringValue });
    }

    setState({
      ...state,
      modelData: {
        ...modelData,
        [key]: value,
      },
    });
  };
  
  useEffect(() => {
    if (departmentValue === 'Accounter') { 
        setState({ ...state, isDepartmentAdmin: true });
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentValue]);
  
  if (employeeIsLoading || departmentIsLoading) return <div>Loading...</div>;
  if (employeeError || departmentError) return null;
  
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
      value: modelData?.last_name,
      onChange: (e: any) => handleModelData(ModelKeys.LAST_NAME, e.target.value),
      placeholder: "Enter Last Name",
    },
    {
      label: "Employee Profile Image",
      type: "file",
      width: "col-md-12",
      key: ModelKeys.FILES,
      value: modelData?.files,
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
      key: ModelKeys.EMPLOYEE_ID,
      value: modelData?.employee_id,
      onChange: (e: any) => handleModelData(ModelKeys.EMPLOYEE_ID, e.target.value),
      placeholder: "ID or User Name",
    },
    {
      label: "Joining Date",
      type: "date",
      width: "col-md-6",
      key: ModelKeys.ONBOARD_AT,
      value: modelData?.onboard_at,
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
      key: ModelKeys.PASSWORD1,
      value: modelData?.password1,
      onChange: (e: any) => handleModelData(ModelKeys.PASSWORD1, e.target.value),
      placeholder: "Password",
    },
    {
      label: "Email",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.EMAIL,
      value: modelData?.email,
      onChange: (e: any) => handleModelData(ModelKeys.EMAIL, e.target.value),
      placeholder: "Email",
    },
    {
      label: "Phone Number",
      type: "text",
      width: "col-md-6",
      key: ModelKeys.PHONE,
      value: modelData?.phone,
      onChange: (e: any) => handleModelData(ModelKeys.PHONE, e.target.value),
      placeholder: "Phone Number",
    },
    {
      label: "Department",
      type: "select",
      width: "col-md-12",
      key: ModelKeys.DEPARTMENT,
      value: modelData?.department?.name,
      onChange: (e: any) => handleModelData(ModelKeys.DEPARTMENT, e.target.value),
      options: departments.map((department: Category) => ({
        label: department.name,
        value: department.id,
      })),
      placeholder: "Select Department",
    },
    {
      label: "Description",
      type: "textarea",
      width: "col-md-12",
      key: ModelKeys.DESCRIPTION,
      value: modelData?.description,
      onChange: (e: any) =>
        handleModelData(ModelKeys.DESCRIPTION, e.target.value),
      placeholder: "Enter Description",
    },
  ]

  const closeModal = () => {
    setState({ ...state, isModal: false, createdEmployee: null });
  };

  const openModal = () => {
    setState({ ...state, isModal: true });
  };

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
                  openModal();
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
                CompanyName={data.Companyname}
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
            <PermissionsTable isDepartmentAdmin={isDepartmentAdmin} closeModal={closeModal} employeeData={createdEmployee} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              closeModal()
            }}
          >
            Cancel
          </button>
          <button type="button" className="btn btn-primary"
            onClick={() => {
              // closeModal()
              handleCreateEmployee()
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


