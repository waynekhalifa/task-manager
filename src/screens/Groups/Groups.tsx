import React, { useState } from "react";
import PageHeader from "components/common/PageHeader";

import { Employee } from "types/employee";

import GroupModal from "components/common/GroupModal";
import { Group } from "types/group";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import { groupInput, useCreateGroup } from "framework/Group/createGroup";
import { useGroupQuery } from "framework/Group/getAllGroups";
import DeleteModal from "components/common/DeleteModal";
import AddNewUserModal from "components/common/AddNewUserModal";
import { useCategoriesQuery } from "framework/category/getAllCategories";
import { CategoryUpdateInput } from "types/category";
import { useDeleteGroup } from "framework/Group/deleteGroup";
import { groupInputUpdate, useUpdateGroup } from "framework/Group/updateGroup";

interface Props { }


interface State {
  isAddModal: boolean;
  isEditModal: boolean;
  isDeleteModal: boolean;
  isAssignModal: boolean;
  modelData: Group;
  modalHeader: string;
}

const INITIAlIZE_DATA: State = {
  isAddModal: false,
  isEditModal: false,
  isDeleteModal: false,
  isAssignModal: false,
  modelData: {} as Group,
  modalHeader: "",

};

const Groups: React.FC<Props> = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { isAddModal, isEditModal, isDeleteModal, isAssignModal, modelData, modalHeader } = state;
  const { mutateAsync: createMutation } = useCreateGroup();
  const { mutateAsync: deleteMutation } = useDeleteGroup();
  const { mutateAsync: updateMutation } = useUpdateGroup();

  const { data: groupData, error: groupError, isLoading: groupIsLoading } = useGroupQuery({});
  const { data: employeeData, error: employeeError, isLoading: employeeIsLoading } = useEmployeesQuery({});
  let { data: categoriesData, error: errorCategories, isLoading: isLoadingCategories } = useCategoriesQuery({});


  if (groupIsLoading || employeeIsLoading || isLoadingCategories) return <div>Loading...</div>;
  if (groupError || employeeError || errorCategories) return null;

  let employees: Employee[] = employeeData?.employees?.data?.results || [];
  let groups: Group[] = groupData?.groups?.data?.results || [];

  let usersOptions = employees.map((employee) => {
    return {
      label: employee?.user?.first_name + " " + employee?.user?.last_name,
      value: employee.id,
    };
  }
  );

  let categories: CategoryUpdateInput[] = categoriesData?.categories?.data?.results || [];



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
    setState({
      ...state, isAddModal: false,
      isEditModal: false,
      isDeleteModal: false,
      isAssignModal: false,
      modelData: {} as Group,
      modalHeader: "",
    });
  };

  const handleOpenAddModal = () => {
    setState({ ...state, isAddModal: true, modalHeader: "Add Group" });

  };

  const handleOpenEditModal = (group: Group) => {
    setState({ ...state, isEditModal: true, modelData: group, modalHeader: "Edit Group" });
  };

  const handleOpenDeleteModal = (group: Group) => {
    setState({ ...state, isDeleteModal: true, modelData: group, modalHeader: "Delete Group" });
  };
  const handleAssignMemberModal = (group: Group) => {
    setState({ ...state, isAssignModal: true, modelData: group, modalHeader: "Assign Member" });
  };


  const assignMember = async (employee: Employee) => {
    try {
      Object.assign(modelData, { users: [...modelData.users, employee.user.id] });
      let createInput = groupInputUpdate(modelData);
      await updateMutation(createInput);
      closeModal(true);
    } catch (err) {
      alert(err);
    }
  }
  const createGroup = async () => {
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

  const updateGroup = async () => {
    try {
      let createInput = groupInputUpdate(modelData);
      await updateMutation(createInput);
      closeModal(true);
    } catch (err) {
      alert(err);
    }
  }

  const deleteGroup = async () => {
    try {
      await deleteMutation({ id: modelData.id });
      groups = groups.filter((item) => item.id !== modelData.id);
      closeModal();
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
                  handleOpenAddModal();
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
                <div className="d-flex align-items-center justify-content-between">
                  <div className="row align-items-center">
                    <div className="col-auto">
                      <i className="icofont-users fs-4"></i>
                    </div>
                    <div className="col ps-0">
                      <h5 className="card-title mb-1">{group?.name}</h5>
                      <p className="card-text mb-2">{group?.description}</p>
                      <div className="d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleAssignMemberModal(group)}
                      >
                        <i className="icofont-group-students "></i>
                        <span className="badge bg-light text-dark ms-2">{group?.users?.length} Members</span>
                        <span
                          className="avatar rounded-circle text-center pointer sm"
                        >
                          <i className="icofont-ui-add"></i>
                        </span>
                      </div>
                    </div>

                  </div>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic outlined example"
                  >
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => handleOpenEditModal(group)}
                    >
                      <i className="icofont-edit text-success"></i>
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => handleOpenDeleteModal(group)}
                    >
                      <i className="icofont-ui-delete text-danger"></i>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      <GroupModal
        show={isAddModal || isEditModal}
        onClose={closeModal}
        handleModelData={handleModelData}
        modelData={modelData}
        users={usersOptions}
        onCreate={createGroup}
        onUpdate={updateGroup}
        isEdit={isEditModal}
        header={modalHeader}
      />
      <DeleteModal
        show={isDeleteModal}
        onClose={closeModal}
        onDelete={deleteGroup}
        message="Are you sure you want to delete this project?"
        modalHeader={modalHeader}
      />
      <AddNewUserModal
        show={isAssignModal}
        onClose={closeModal}
        modalHeader={modalHeader}
        employees={employees}
        departments={categories}
        onSelect={assignMember}
      />
    </div>
  );
};

export default Groups;
