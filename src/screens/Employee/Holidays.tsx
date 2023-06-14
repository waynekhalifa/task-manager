import React from "react";
import { Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import PageHeader from "components/common/PageHeader";
import { HolidaysData } from "components/Data/AppData";


interface Props { }

interface State {
    isModal: boolean,
    isEditModalData: any
}

const INITIAlIZE_DATA: State = {
    isModal: false,
    isEditModalData: ""
}

var columnsT: any[] = [];

const Holidays: React.FC<Props> = () => {

    const [state, setState] = React.useState(INITIAlIZE_DATA);
    const { isModal, isEditModalData } = state;

    React.useEffect(() => {
        columnsT = [
            {
                name: "#",
                selector: (row: any) => <span className={row.txtClass}>{row.ticketid}</span>,
                sortable: true
            },
            {
                name: "HOLIDAY DAY",
                selector: (row: any) => <span className={row.txtClass}>{row.Holidayday}</span>,
                sortable: true
            },
            {
                name: "HOLIDAY DATE",
                selector: (row: any) => <span className={row.txtClass}>{row.holidaydate}</span>,
                sortable: true
            },
            {
                name: "HOLIDAY NAME",
                selector: (row: any) => <span className={row.txtClass}>{row.holidayname}</span>,
                sortable: true
            },
            {
                name: "ACTION",
                selector: () => { },
                sortable: true,
                cell: (row:any) => <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => { 
                        setState({ isEditModalData: row, isModal: true })
                     }}><i className="icofont-edit text-success"></i></button>
                    <button type="button" className="btn btn-outline-secondary deleterow"><i className="icofont-ui-delete text-danger"></i></button>
                </div>
            }

        ]
    }, [])

    return (
        <div className="container-xxl">
            <PageHeader headerTitle="Holidays" renderRight={() => {
                return <div className="col-auto d-flex w-sm-100">
                    <button className="btn btn-dark btn-set-task w-sm-100 me-2" onClick={() => { 
                        setState({ isModal: true, isEditModalData: "" })
                     }}><i className="icofont-plus-circle me-2 fs-6"></i>Add Holidays</button>
                </div>
            }} />
            <div className="row clearfix g-3">
                <div className="card">
                    <div className="card-body">
                        <DataTable
                            title={HolidaysData.title}
                            columns={columnsT}
                            data={HolidaysData.rows}
                            defaultSortFieldId={1}
                            pagination
                            selectableRows={false}
                            className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                            highlightOnHover={true}
                        />
                    </div>
                </div>
            </div>
            <Modal centered show={isModal} onHide={() => { 
                setState({ isModal: false, isEditModalData: "" })
             }}>
                <Modal.Header closeButton>
                    <Modal.Title className="fw-bold">{isEditModalData ? "Edit" : "Add"} Holiday</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mb-3">
                        <label className="form-label">Holiday Name</label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onClick={() => { }} value={isEditModalData ? isEditModalData.holidayname : ""} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Holiday Date</label>
                        <input type="date" className="form-control" id="exampleFormControlInput2778" onClick={() => { }} value={isEditModalData ? isEditModalData.holidaydate : ""} />
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-secondary" onClick={() => { 
                        setState({ isModal: false, isEditModalData: "" })
                    }}>Done</button>
                    <button type="button" className="btn btn-primary">Sent</button>
                </Modal.Footer>
            </Modal>
        </div>
    )

}

export default Holidays;