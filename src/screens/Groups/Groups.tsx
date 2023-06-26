import React, { useState } from "react";
import PageHeader from "components/common/PageHeader";

import { Employee } from "types/employee";

import GroupModal from "components/common/GroupModal";
import { Group } from "types/group";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import { groupInput, useCreateGroup } from "framework/Group/createGroup";
import { useGroupQuery } from "framework/Group/getAllGroups";

interface Props { }


interface State {
  isModal: boolean;
  modelData: Group;

}

const INITIAlIZE_DATA: State = {
  isModal: false,
  modelData: {} as Group,

};

const Groups: React.FC<Props> = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { isModal, modelData } = state;
  const { mutateAsync: createMutation } = useCreateGroup();

  const { data: groupData, error: groupError, isLoading: groupIsLoading } = useGroupQuery({});
  const { data: employeeData, error: employeeError, isLoading: employeeIsLoading } = useEmployeesQuery({});


  if (groupIsLoading || employeeIsLoading) return <div>Loading...</div>;
  if (groupError || employeeError) return null;

  let employees: Employee[] = employeeData?.employees?.data?.results || [];
  let groups: Group[] = groupData?.groups?.data?.results || [];

  let usersOptions = employees.map((employee) => {
    return {
      label: employee?.user?.first_name + " " + employee?.user?.last_name,
      value: employee.id,
    };
  }
  );



  const handleModelData = (key: string, value: any) => {
    setState({
      ...state,
      modelData: {
        ...modelData,
        [key]: value,
      },
    });
  };




  const closeModal = (reload: boolean = false) => {
    if (reload) {
      window.location.reload();
    }
    setState({ ...state, isModal: false, modelData: {} as Group });
  };

  const openModal = () => {
    setState({ ...state, isModal: true });
  };

  const handleCreateGroup = async () => {
    if (!modelData?.users || modelData?.users?.length === 0) {
      alert("Please select department");
      return;
    }
    try {
      let createInput = groupInput(modelData);
      await createMutation(createInput);
      closeModal(true);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Groups"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-dark btn-set-task w-sm-100 me-2"
                onClick={() => {
                  openModal();
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Group
              </button>

            </div>
          );
        }}
      />
      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
        {groups && groups.length > 0 && groups.map((group) => (
          < div className="col" key={group.id}>
            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-auto">
                    <i className="icofont-users fs-4"></i>
                  </div>
                  <div className="col ps-0">
                    <h5 className="card-title mb-1">{group?.name}</h5>
                    <p className="card-text mb-2">{group?.description}</p>
                    <p className="card-text mb-2">{group?.users?.length} Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <GroupModal
        show={isModal}
        onClose={closeModal}
        handleModelData={handleModelData}
        modelData={modelData}
        users={usersOptions}
        onCreate={handleCreateGroup}
        header="Add Group"
      />
    </div>
  );
};

export default Groups;


