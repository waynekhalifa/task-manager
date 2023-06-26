import { Modal } from "react-bootstrap";
import { Employee } from "types/employee";
import { Group } from "types/group";
import { checkImage, getCategory, getShortString } from "utils/helper";
import { CategoryUpdateInput } from "types/category";
import Avatar1 from "assets/images/sm/avatar4.jpg";
import { useState } from "react";


interface Props {
  onClose: any;
  show: any;
  modalHeader: string;
  employees: Employee[];
  groups?: Group[];
  departments: CategoryUpdateInput[];
  onSelect: (employee: Employee) => void;
}

const AddNewUserModal: React.FC<Props> = ({ onClose, show, modalHeader, groups, employees, departments, onSelect }) => {
  const [searchResult, setSearchResult] = useState<Employee[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return setSearchResult([]);
    if (e.target.value.length > 0) {
      const result = employees.filter((employee) => {
        const fullName = employee?.user?.first_name + " " + employee?.user?.last_name;
        return fullName.toLowerCase().includes(e.target.value.toLowerCase());
      });
      result.length === 0 ? setNotFound(true) : setNotFound(false);
      setSearchResult(result);
    }

  };
  return (
    <Modal centered size="lg" show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title className="fw-bold">{modalHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="inviteby_email 
        scroll_div
        ">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search Employee or Group"
              onChange={handleSearch}
            />
          </div>
          {/* view search result view for employee and group */}
          {searchResult && searchResult.length > 0 && <div className="members_list mb-3 ">
            <h6 className="fw-bold ">Search Result </h6>
            <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0" style={{
              marginTop: "20px",
              maxHeight: "500px",
              overflowY: "scroll",
            }}>
              {searchResult.map((employee) => (
                <li className="list-group-item py-3 text-center text-md-start dd-handle m-1 pointer" key={employee.id}
                onClick={() => onSelect(employee)}
                >
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
                      <span className="text-muted">{getShortString(getCategory(departments, employee?.department!)!, 20)}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>}

          {notFound && <div className="text-center">
            <h6 className="fw-bold ">No data found</h6>
          </div>}
          <div className="divider mb-3 
        border-top         
        "></div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewUserModal;
