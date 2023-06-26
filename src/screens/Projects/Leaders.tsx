import React, { useState } from "react";
import DataTable from "react-data-table-component";
import AddNewUserModal from "../../components/common/AddNewUserModal";
import PageHeader from "../../components/common/PageHeader";
import { LeadersListData } from "../../components/Data/AppData";

interface Props {}

interface State {
  isAddUserModal: Boolean;
}

const INITIAlIZE_DATA: State = {
  isAddUserModal: false
};

const Leaders: React.FC<Props> = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);

  return (
    <div className="container-xxl">
      <PageHeader headerTitle="Leaders" />
      <div className="row clearfix g-3">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <DataTable
                title={LeadersListData.title}
                columns={LeadersListData.columns}
                data={LeadersListData.rows}
                defaultSortFieldId="title"
                pagination
                selectableRows={false}
                className="table myDataTable table-hover align-middle mb-0 d-row nowrap dataTable no-footer dtr-inline"
                highlightOnHover={true}
                onRowClicked={() => {
                  setState({ ...state, isAddUserModal: true });
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <AddNewUserModal
        show={state.isAddUserModal}
        onClose={() => {
          setState({ ...state, isAddUserModal: false });
        }}
        modalHeader="Add New User"
      /> */}
    </div>
  );
};

export default Leaders;
