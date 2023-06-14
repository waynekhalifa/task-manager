import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import PageHeader from "components/common/PageHeader";
import { DepartmentsData } from "components/Data/AppData";


interface Props { }

interface State {
    isModal: boolean,
    isEditModalData: any,
    modalheader: any
}

const INITIAlIZE_DATA: State = {
    isModal: false,
    isEditModalData: "",
    modalheader: null
}

let columnsT: any[] = [];
const Departments: React.FC<Props> = () => {

    const [state, setState] = React.useState(INITIAlIZE_DATA);
    const { isModal, isEditModalData, modalheader } = state;
    useEffect(() => {
        columnsT = [
            {
                name: "#",
                selector: (row: any) => row.employeeId,
                sortable: true,
                // cell:row=><a href="#!" className="fw-bold text-secondary">{row.employeeId}</a>
            },
            {
                name: "DEPARTMENT HEAD",
                selector: (row: any) => row.DepartmentHead,
                sortable: true,
                cell: (row: any) => <> <img className="avatar rounded-circle" src={row.image} alt=""></img>
                    <span className="fw-bold ms-1">{row.DepartmentHead}</span>
                </>
            },
            {
                name: "DEPARTMENT NAME",
                selector: (row: any) => row.DepartmentName,
                sortable: true
            },
            {
                name: "EMPLOYEE UNDER WORK",
                selector: (row: any) => row.employeeNo,
                sortable: true
            },
            {
                name: "ACTION",
                selector: (row: any) => { },
                sortable: true,
                cell: (row: any) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#depedit" onClick={() => { setState({ isEditModalData: row, isModal: true, modalheader: 'Edit Departments' }) }}><i className="icofont-edit text-success"></i></button>
                    <button className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }

        ]
    }, [])
    return (
        <div className="container-xxl">
            <PageHeader headerTitle="Departments" renderRight={() => {
                return <div className="col-auto d-flex w-sm-100">
                    <button className="btn btn-dark btn-set-task w-sm-100" onClick={() => {
                        setState({ isModal: true, isEditModalData: "", modalheader: 'Add Departments' })
                    }}><i className="icofont-plus-circle me-2 fs-6"></i>Add Departments</button>
                </div>
            }} />
            <div className="row clearfix g-3">
                <div className="col-sm-12">
                    <DataTable
                        title={DepartmentsData.title}
                        columns={columnsT}
                        data={DepartmentsData.rows}
                        defaultSortFieldId={1}
                        pagination
                        selectableRows={false}
                        className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                        highlightOnHover={true}
                    />
                </div>
            </div>
            <Modal centered show={isModal} onHide={() => { 
                setState({ isModal: false, isEditModalData: "", modalheader: null })
             }}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">{modalheader}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1111" className="form-label">Department Name</label>
                        <input type="text" className="form-control" id="exampleFormControlInput1111" onClick={() => { }} value={isEditModalData ? isEditModalData.DepartmentName : ""} />
                    </div>
                    <div className="deadline-form">
                        <form>
                            <div className="row g-3 mb-3">
                                <div className="col-sm-6">
                                    <label htmlFor="depone" className="form-label">Department Head</label>
                                    <input type="text" className="form-control" id="depone" onClick={() => { }} value={isEditModalData ? isEditModalData.DepartmentHead : ""} />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="deptwo" className="form-label">Employee UnderWork</label>
                                    <input type="text" className="form-control" id="deptwo" onClick={() => { }} value={isEditModalData ? isEditModalData.employeeNo : ""} />
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => { 
                        setState({ isModal: false, isEditModalData: "", modalheader: null })
                    }}>Done</button>
                    <button type="button" className="btn btn-primary">Save</button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Departments; 