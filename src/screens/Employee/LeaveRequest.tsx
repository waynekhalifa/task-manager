import React from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import PageHeader from "components/common/PageHeader";
import { LeaveRequestData } from "components/Data/AppData";

interface Props { }

interface State {
    isModal: boolean,
    isEditModal: boolean,
    isDeleteModal: boolean
}

const INITIAlIZE_DATA: State = {
    isModal: false,
    isEditModal: false,
    isDeleteModal: false
}

var columnT: any[] = [];

const LeaveRequest: React.FC<Props> = () => {

    const [state, setState] = React.useState(INITIAlIZE_DATA);
    const { isModal, isEditModal, isDeleteModal } = state;

    React.useEffect(() => {
        columnT = [
            {
                name: "EMPLOYEE ID",
                selector: (row: any) => row.employeeId,
                sortable: true,
                cell: (row: any) => <a href="members-profile" className="fw-bold text-secondary">{row.employeeId}</a>
            },
            {
                name: "EMPLOYEE NAME",
                selector: (row: any) => { },
                sortable: true,
                cell: (row: any) => <> <img className="avatar rounded-circle" src={row.image} alt=""></img>
                    <span className="fw-bold ms-1">{row.employeeName}</span>
                </>
            },
            {
                name: "LEAVE TYPE",
                selector: (row: any) => row.leavetype,
                sortable: true
            },
            {
                name: "FROM",
                selector: (row: any) => row.from,
                sortable: true
            },
            {
                name: "TO",
                selector: (row: any) => row.to,
                sortable: true
            },
            {
                name: "REASON",
                selector: (row: any) => row.reason,
                sortable: true
            },
            {
                name: "ACTION",
                selector: (row:any) => { },
                sortable: true,
                cell: () => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => {
                       setState(state => ({ ...state, isEditModal: true }) )
                    }}><i className="icofont-check-circled text-success"></i></button>
                    <button type="button" className="btn btn-outline-secondary deleterow" onClick={() => { setState(state => ({ ...state, isEditModal: true })) }}><i className="icofont-close-circled text-danger"></i></button>
                </div>
            }

        ]
    }, [])
    return (
        <div className="container-xxl">
            <PageHeader headerTitle="Leave Request" renderRight={() => {
                return <div className="col-auto d-flex w-sm-100">
                    <button className="btn btn-dark btn-set-task w-sm-100" onClick={() => {
                        setState(state => ({ ...state, isModal: true }))
                    }}><i className="icofont-plus-circle me-2 fs-6"></i>Add Leave</button>
                </div>
            }} />
            <div className="row clearfix g-3">
                <div className="col-sm-12">
                    <DataTable
                        title={LeaveRequestData.title}
                        columns={columnT}
                        data={LeaveRequestData.rows}
                        defaultSortFieldId={1}
                        pagination
                        selectableRows={false}
                        className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                        highlightOnHover={true}
                    />
                </div>
            </div>
            <Modal centered show={isModal} onHide={() => { 
                setState(state => ({ ...state, isModal: false }))
             }}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">Add Leave</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Select Leave type</label>
                        <select className="form-select">
                            <option >Medical Leave</option>
                            <option value="1">Casual Leave</option>
                            <option value="2">Maternity Leave</option>
                        </select>
                    </div>
                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <label htmlFor="datepickerdedass" className="form-label">Leave From Date</label>
                                    <input type="date" className="form-control" id="datepickerdedass" />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="datepickerdedoneddsd" className="form-label">Leave to Date</label>
                                    <input type="date" className="form-control" id="datepickerdedoneddsd" />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea78d" className="form-label">Leave Reason</label>
                        <textarea className="form-control" id="exampleFormControlTextarea78d" rows={3}></textarea>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => { 
                        setState(state => ({ ...state, isModal: false }))
                    }}>Done</button>
                    <button type="button" className="btn btn-primary">Save</button>
                </Modal.Footer>
            </Modal>
            <Modal centered show={isEditModal} onHide={() => { 
                setState(state => ({ ...state, isEditModal: false }))
             }}>
                <Modal.Header closeButton><h5 className="modal-title  fw-bold" id="dremovetaskLabel"> Leave Approve</h5></Modal.Header>
                <Modal.Body className="justify-content-center flex-column d-flex">
                    <i className="icofont-simple-smile text-success display-2 text-center mt-2"></i>
                    <p className="mt-4 fs-5 text-center">Leave Approve Successfully</p>
                </Modal.Body>
            </Modal>
            <Modal centered show={isDeleteModal} onHide={() => { 
                setState(state => ({ ...state, isDeleteModal: false }))
             }}>
                <Modal.Header closeButton><h5 className="modal-title  fw-bold" id="leaverejectLabel"> Leave Reject</h5></Modal.Header>
                <Modal.Body className="justify-content-center flex-column d-flex">
                    <i className="icofont-sad text-danger display-2 text-center mt-2"></i>
                    <p className="mt-4 fs-5 text-center">Leave Reject</p>
                </Modal.Body>
            </Modal>
        </div>
    )

}

export default LeaveRequest; 