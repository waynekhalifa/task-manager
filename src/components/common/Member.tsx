import { Dropdown } from "react-bootstrap";
import Avatar2 from "assets/images/xs/avatar2.jpg";
import Avatar3 from "assets/images/xs/avatar3.jpg";
import Avatar8 from "assets/images/xs/avatar8.jpg";

interface Props {
  users: any;
}

const Member: React.FC<Props> = ({ users }) => {
  return (
    <div>
      <div className="inviteby_email">
        <div className="input-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email address"
            id="exampleInputEmail1"
            aria-describedby="exampleInputEmail1"
          />
          <button
            className="btn btn-primary"
            type="button"
            id="button-addon2"
          >
            Sent
          </button>
        </div>
      </div>
      <div className="members_list">
        <h6 className="fw-bold ">Employee </h6>
        <ul className="list-unstyled list-group list-group-custom list-group-flush mb-0">
          <li className="list-group-item py-3 text-center text-md-start">
            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
              <div className="no-thumbnail mb-2 mb-md-0">
                <img
                  className="avatar lg rounded-circle"
                  src={Avatar2}
                  alt=""
                />
              </div>
              <div className="flex-fill ms-3 text-truncate">
                <h6 className="mb-0  fw-bold">Rachel Carr(you)</h6>
                <span className="text-muted">rachel.carr@gmail.com</span>
              </div>
              <div className="members-action">
                <span className="members-role ">Admin</span>
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
                        <i className="icofont-ui-password fs-6 me-2"></i>
                        ResetPassword
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        <i className="icofont-chart-line fs-6 me-2"></i>
                        ActivityReport
                      </a>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </li>
          <li className="list-group-item py-3 text-center text-md-start">
            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
              <div className="no-thumbnail mb-2 mb-md-0">
                <img
                  className="avatar lg rounded-circle"
                  src={Avatar3}
                  alt=""
                />
              </div>
              <div className="flex-fill ms-3 text-truncate">
                <h6 className="mb-0  fw-bold">
                  Lucas Baker
                  <a href="#!" className="link-secondary ms-2">
                    (Resend)
                  </a>
                </h6>
                <span className="text-muted">lucas.baker@gmail.com</span>
              </div>
              <div className="members-action">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn bg-transparent dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Members
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#!">
                        <i className="icofont-check-circled"></i>
                        Member
                        <span>
                          Can view, edit, delete, comment on and save files
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        <i className="fs-6 p-2 me-1"></i>
                        Admin
                        <span>
                          Member, but can invite and manage team members
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
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
                        Member
                      </a>
                    </li>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </li>
          <li className="list-group-item py-3 text-center text-md-start">
            <div className="d-flex align-items-center flex-column flex-sm-column flex-md-row">
              <div className="no-thumbnail mb-2 mb-md-0">
                <img
                  className="avatar lg rounded-circle"
                  src={Avatar8}
                  alt=""
                />
              </div>
              <div className="flex-fill ms-3 text-truncate">
                <h6 className="mb-0  fw-bold">Una Coleman</h6>
                <span className="text-muted">una.coleman@gmail.com</span>
              </div>
              <div className="members-action">
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn bg-transparent dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Members
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <a className="dropdown-item" href="#!">
                        <i className="icofont-check-circled"></i>
                        Member
                        <span>
                          Can view, edit, delete, comment on and save files
                        </span>
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#!">
                        <i className="fs-6 p-2 me-1"></i>
                        Admin
                        <span>
                          Member, but can invite and manage team members
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="btn-group">
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
                          <i className="icofont-ui-password fs-6 me-2"></i>
                          ResetPassword
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#!">
                          <i className="icofont-chart-line fs-6 me-2"></i>
                          ActivityReport
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#!">
                          <i className="icofont-delete-alt fs-6 me-2"></i>
                          Suspend member
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#!">
                          <i className="icofont-not-allowed fs-6 me-2"></i>
                          Delete Member
                        </a>
                      </li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="card-footer border-0 bg-transparent">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#addMemberModal"
            >
              <i className="icofont-plus"></i>
              Add Member

            </button>

            <div
              className="modal fade"
              id="addMemberModal"
              tabIndex={-1}
              aria-labelledby="addMemberModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header border-0">
                    <h5
                      className="modal-title fw-bold"
                      id="addMemberModalLabel"
                    >
                      Add Member
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>

                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="
                        Enter email"
                      />

                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-dismiss="modal"
                    >
                      Add Member
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </div>
  );
};

export default Member;
