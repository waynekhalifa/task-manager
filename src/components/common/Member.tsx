import { Dropdown } from "react-bootstrap";
import { CategoryUpdateInput } from "types/category";
import { AssignedEmployee, Employee } from "types/employee";
import { Group } from "types/group";
import { checkImage, getShortString } from "utils/helper";
import Avatar1 from "assets/images/sm/avatar4.jpg";
import AddNewUserModal from "./AddNewUserModal";
import React from "react";
import { createAssignInput, useAssignMemberToProject } from "framework/project/assignMember";
import { SelectedProject } from "types/project";
import { useAssignedMembersQuery } from "framework/project/getAssignedMembers";
import { useDeleteAssignedEmployee } from "framework/project/removeAssignMember";

interface Props {
  employees: Employee[];
  groups?: Group[];
  departments: CategoryUpdateInput[];
  project: SelectedProject;
}
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
  isAddUserModal: boolean;
  modalHeader: any;
}

const INITIAlIZE_DATA: State = {
  isAddUserModal: false,
  modalHeader: "",
};

const Member: React.FC<Props> = ({ groups, employees, departments, project }) => {
  const [state, setState] = React.useState<State>(INITIAlIZE_DATA);
  const { modalHeader, isAddUserModal } =
    state;
  const { mutateAsync: AssignMemberMutation } = useAssignMemberToProject();
  const { mutateAsync: deleteMutation } = useDeleteAssignedEmployee();

  let { data, error, isLoading } = useAssignedMembersQuery({ id: project.id });

  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  const assignedEmployees: AssignedEmployee[] = data?.assignedEmployees?.data?.results || [];

  const handleModalClose = (reload: boolean = false) => {
    if (reload === true) window.location.reload();
    setState({
      ...state,
      isAddUserModal: false,
      modalHeader: "",
    });
  };

  const handleOpenAddUserModal = () => {
    setState({
      ...state,
      isAddUserModal: true,
      modalHeader: "Assign Member",
    });
  };

  const assignMember = async (employee: Employee) => {
    try {
      const createInput = createAssignInput({
        user: employee.id,
        project: project?.id!,
      });
      await AssignMemberMutation(createInput)
      handleModalClose(true);
    } catch (err) {
      alert(err);
    }
  };

  const removeAssignedMember = async (employee: AssignedEmployee) => {
    try {
      await deleteMutation(employee);
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };


  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="text-primary"><strong>Members</strong></h5>
        <button
          className="btn btn-primary btn-sm"
          onClick={handleOpenAddUserModal}
        >
          <i className="fa fa-plus"></i> Add Member
        </button>
      </div>
      {assignedEmployees && assignedEmployees.length > 0 && <div className="members_list mb-3">
        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0" style={{
          maxHeight: "400px",
          overflowY: "scroll"
        }}>
          {assignedEmployees.map((employee) => (
            <li className="list-group-item py-3 text-center text-md-start" key={employee.id} >
              <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
                <div className="no-thumbnail mb-2 mb-md-0">
                  <img
                    className="avatar lg rounded-circle"
                    src={checkImage(employee?.user?.avatar) ? employee?.user?.avatar : Avatar1}
                    alt=""
                  />
                </div>
                <div className="flex-fill ms-3 text-truncate">
                  <h6 className="mb-0  fw-bold">{employee?.user?.first_name + " " + employee?.user?.last_name}</h6>
                  <span className="text-muted">{employee?.user?.email}</span>
                  {/* <span className="text-muted">{getShortString(getCategory(departments, employee?.department!)!, 20)}</span> */}
                </div>
                <div className="members-action">
                  <Dropdown className="btn-group">
                    <Dropdown.Toggle
                      as="button"
                      className="btn bg-transparent dropdown-toggle"
                    >
                      <i className="icofont-ui-settings  fs-6"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-end">
                      <li >
                        <a className="dropdown-item" href="#!"
                          onClick={(e) => {
                            e.preventDefault();
                            removeAssignedMember(employee);
                          }}
                        >
                          <i className="icofont-delete-alt fs-6 me-2"></i>Delete
                          Member
                        </a>
                      </li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>}
      {groups && groups.length > 0 && <div className="members_list"  >
        <h6 className="fw-bold ">Groups </h6>
        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0" style={{
          marginTop: "20px",
          maxHeight: "300px",
          overflowY: "scroll"
        }}>
          {groups.map((group) => (
            <li className="list-group-item py-3 text-center text-md-start" key={group.id}>
              < div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
                <div className="no-thumbnail mb-2 mb-md-0 pointer">
                  <i className="icofont-users-alt-4 fs-3"></i>
                </div>
                <div className="flex-fill ms-3 text-truncate pointer">
                  <h6 className="mb-0  fw-bold">{getShortString(group.name, 20)}</h6>
                  <span className="text-muted">{getShortString(group.description, 50)}</span>
                </div>
                <div className="members-action">
                  <Dropdown className="btn-group">
                    <Dropdown.Toggle
                      as="button"
                      className="btn bg-transparent dropdown-toggle"
                    >
                      <i className="icofont-ui-settings  fs-6"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="#!">
                          <i className="icofont-delete-alt fs-6 me-2"></i>Delete
                          Groups
                        </a>
                      </li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>}
      {(!employees || employees.length === 0) && (!groups || groups.length === 0) && <div className="text-center">
        <h6 className="fw-bold ">No data found</h6>
      </div>}

      <AddNewUserModal
        show={isAddUserModal}
        onClose={handleModalClose}
        modalHeader={modalHeader}
        employees={employees}
        // groups={groups}
        departments={departments}
        onSelect={assignMember}
      />
    </div>
  );
};

export default Member;
