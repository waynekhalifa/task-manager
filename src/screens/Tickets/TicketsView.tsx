import DataTable from "react-data-table-component";
import { Modal } from "react-bootstrap";
import PageHeader from "../../components/common/PageHeader";
import { EnquiresViewData } from "../../components/Data/AppData";
import { useState } from "react";

type IState = { isModal: boolean; siEditModal: any };
const INITIAL_STATE: IState = { isModal: false, siEditModal: "" };

const EnquiresView: React.FC = () => {
  const [state, setState] = useState<IState>(INITIAL_STATE);
  const columnT = [
    {
      name: "TICKET ID",
      selector: (row: any) => row.ticketid,
      sortable: true,
      cell: (row: any) => (
        <a href="Enquires-detail" className="fw-bold text-secondary">
          {row.ticketid}
        </a>
      ),
    },
    {
      name: "SUBJECT",
      selector: (row: any) => row.subject,
      sortable: true,
    },
    {
      name: "ASSIGNED",
      selector: (row: any) => row.assigned,
      sortable: true,
      cell: (row: any) => (
        <>
          <img className="avatar rounded-circle" src={row.image} alt="" />{" "}
          <span className="fw-bold ms-1">{row.assigned}</span>
        </>
      ),
      minWidth: "250px",
    },
    {
      name: "CREATD DATE",
      selector: (row: any) => row.createdate,
      sortable: true,
    },
    {
      name: "STATUS",
      selector: (row: any) => { },
      sortable: true,
      cell: (row: any) => (
        <span
          className={`badge ${row.status === "Completed" ? "bg-success" : "bg-warning"
            }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      name: "ACTION",
      selector: (row: any) => { },
      sortable: true,
      cell: (row: any) => (
        <div
          className="btn-group"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => {
              setState({ siEditModal: row, isModal: true });
            }}
          >
            <i className="icofont-edit text-success"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary deleterow">
            <i className="icofont-ui-delete text-danger"></i>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Enquires"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-dark btn-set-task w-sm-100"
                onClick={() => {
                  setState((prevState) => ({ ...prevState, isModal: true }));
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Enquires
              </button>
            </div>
          );
        }}
      />
      <div className="row clearfix g-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title={EnquiresViewData.title}
                columns={columnT}
                data={EnquiresViewData.rows}
                // defaultSortField="title"
                pagination
                selectableRows={false}
                className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                highlightOnHover={true}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        centered
        show={state.isModal}
        onHide={() => {
          setState({ isModal: false, siEditModal: "" });
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {state.siEditModal !== "" ? "Edit" : "Add"} Ticket
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label htmlFor="sub" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className="form-control"
              id="sub"
              onChange={() => { }}
              value={state.siEditModal ? state.siEditModal.subject : ""}
            />
          </div>
          <div className="deadline-form">
            <form>
              <div className="row g-3 mb-3">
                <div className="col-lg-6">
                  <label htmlFor="depone" className="form-label">
                    Assign Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="depone"
                    onChange={() => { }}
                    value={state.siEditModal ? state.siEditModal.assigned : ""}
                  />
                </div>
                <div className="col-lg-6">
                  <label htmlFor="deptwo" className="form-label">
                    Creted Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="deptwo"
                    onChange={() => { }}
                    value={
                      state.siEditModal ? state.siEditModal.createdate : ""
                    }
                  />
                </div>
              </div>
            </form>
          </div>
          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select">
              <option>In Progress</option>
              <option value="1">Completed</option>
              <option value="2">Wating</option>
              <option value="3">Decline</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setState((prevState) => ({ ...prevState, isModal: false }));
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

export default EnquiresView;
