import React from "react";
import { Dropdown, Modal } from "react-bootstrap";
import OurClients from "components/Clients/OurClients";
import PageHeader from "components/common/PageHeader";
import { MembersData } from "components/Data/AppData";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import FormInputs from "components/FormInputs/FormInputs";
import { IField } from "types/formFields";
import { EmployeeCreateInput } from "types/employee";
interface Props { }

enum ModelKeys {
  NAME = "name",
  CATEGORY = "category",
  DESCRIPTION = "description",
  START_DATE = "start_at",
  END_DATE = "end_at",
  ADMIN = "admin",
  FILES = "files",
}

interface State {
  isModal: boolean;
  show: boolean;
  modelData: {} as EmployeeCreateInput;
  // fullName: string;
  // username: string;
  // email: string;
  // password1: string;
  // password2: string;
  // onboard_at: string;
  // employee_id: string;
  // phone: string;
  // department: string;
}
const INITIAlIZE_DATA: State = {
  isModal: false,
  show: false,
  modelData: {} as EmployeeCreateInput,
  // fullName: "",
  // username: "",
  // email: "",
  // password1: "",
  // password2: "",
  // onboard_at: "",
  // employee_id: "",
  // phone: "",
  // department: "",
};

const Members: React.FC<Props> = () => {
  const [state, setState] = React.useState(INITIAlIZE_DATA);
  const { isModal, modelData : {
    fullName: '',
    username: '',
    email: '',
    password1: '',
    password2: '',
    onboard_at: '',
    employee_id: '',
    phone: '',
    department: '',
  } } = state;

  let { data, error, isLoading } = useEmployeesQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

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
      label: "Files",
      type: "file",
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
      label: "Assign Admin",
      type: "select",
      key: ModelKeys.ADMIN,
      value: modelData?.admin,
      onChange: (e: any) => handleModelData(ModelKeys.ADMIN, e.target.value),
      options: [
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
    },



  ]




  const handleSubmit = () => {
    const name = fullName.split(" ");
    const first_name = name[0];
    const last_name = name[1];
    const data = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password1: password1,
      password2: password2,
      employee: {
        onboard_at: onboard_at,
        employee_id: employee_id,
        phone: phone,
        department: department,
      },
    };
    console.log(data);
  }



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
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput877"
                className="form-label"
              >
                Employee Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput877"
                placeholder="Employee Full Name"
                onChange={(e) => setState((prevState) => ({ ...prevState, fullName: e.target.value }))}
              />
            </div>
            {/* <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput977"
                className="form-label"
              >
                Employee Company
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleFormControlInput977"
                placeholder="Explain what the Project Name"
              />
            </div> */}
            <div className="mb-3">
              <label htmlFor="formFileMultipleoneone" className="form-label">
                Employee Profile Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFileMultipleoneone"
              />
            </div>
            <div className="deadline-form">
              <form>
                <div className="row g-3 mb-3">
                  <div className="col-sm-6">
                    <label
                      htmlFor="exampleFormControlInput1778"
                      className="form-label"
                    >
                      Employee ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput1778"
                      placeholder="ID or User Name"
                      onChange={(e) => setState((prevState) => ({ ...prevState, employee_id: e.target.value }))}
                    />
                  </div>
                  <div className="col-sm-6">
                    <label
                      htmlFor="exampleFormControlInput2778"
                      className="form-label"
                    >
                      Joining Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="exampleFormControlInput2778"
                      onChange={(e) => setState((prevState) => ({ ...prevState, joining_date: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleFormControlInput177"
                      className="form-label"
                    >
                      Employee User Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput177"
                      placeholder="User Name"
                      onChange={(e) => setState((prevState) => ({ ...prevState, username: e.target.value }))}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleFormControlInput277"
                      className="form-label"
                    >
                      Password
                    </label>
                    <input
                      type="Password"
                      className="form-control"
                      id="exampleFormControlInput277"
                      placeholder="Password"
                      onChange={(e) => setState((prevState) => ({ ...prevState, password1: e.target.value, password2: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleFormControlInput477"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleFormControlInput477"
                      placeholder="User Name"
                      onChange={(e) => setState((prevState) => ({ ...prevState, email: e.target.value }))}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label
                      htmlFor="exampleFormControlInput777"
                      className="form-label"
                    >
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleFormControlInput777"
                      placeholder="User Name"
                      onChange={(e) => setState((prevState) => ({ ...prevState, phone: e.target.value }))}
                    />
                  </div>
                </div>
                <div className="row g-3 mb-3">
                  <div className="col">
                    <label className="form-label">Department</label>
                    <select className="form-select">
                      <option>Web Development</option>
                      <option value="1">It Management</option>
                      <option value="2">Marketing</option>
                    </select>
                  </div>
                  <div className="col">
                    <label className="form-label">Designation</label>
                    <select className="form-select">
                      <option>Curriculum Development</option>
                      <option value="1">Technology Integration</option>
                      <option value="2">Teacher Training</option>
                      <option value="3">Assessment System</option>
                      <option value="4">Student Records</option>
                      <option value="5">Inclusive Education</option>
                      <option value="6">Technology Integration</option>
                      <option value="7">Educational Field Trips</option>
                      <option value="8">Parental Involvement</option>
                      <option value="9">Parental Feedback</option>
                      <option value="10">Other</option>
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
              ></textarea>
            </div>
            <div className="table-responsive">
              <table className="table table-striped custom-table">
                <thead>
                  <tr>
                    <th>Project Permission</th>
                    <th className="text-center">Read</th>
                    <th className="text-center">Write</th>
                    <th className="text-center">Create</th>
                    <th className="text-center">Delete</th>
                    <th className="text-center">Import</th>
                    <th className="text-center">Export</th>
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
          <div className="modal-body">
           <FormInputs
                    formFields={formFields}
            />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setState({ ...state, show: false });
              handleSubmit()
            }}
          >
            Done
          </button>
          <button type="button" className="btn btn-primary">
            Sent
          </button>
          </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Members;
