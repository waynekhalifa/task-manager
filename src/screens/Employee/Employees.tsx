import React, { useState } from "react";
import OurClients from "components/Clients/OurClients";
import PageHeader from "components/common/PageHeader";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import {
  useCreateEmployee,
  employeeInput,
} from "framework/employee/createEmployee";

import { Employee, EmployeeCreateInput, Manager } from "types/employee";
import { useCategoriesQuery } from "framework/category/getAllCategories";

import EmployeeModal from "components/common/EmployeeModal";
import { useManagerQuery } from "framework/Manager/getAllManagers";
import { checkPermission, getCategory } from "utils/helper";
import { CategoryUpdateInput } from "types/category";
import { Permission } from "enums/permission";
import { useResetPasswordSend } from "framework/auth/resetPasswordSend";
import { ResetPasswordSendInput } from "types/resetPasswordSend";

interface Props {}

interface State {
  isModal: boolean;
  modelData: EmployeeCreateInput;
}

const INITIAlIZE_DATA: State = {
  isModal: false,
  modelData: {} as EmployeeCreateInput,
};

const Employees: React.FC<Props> = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { isModal, modelData } = state;
  const {
    data: employeeData,
    error: employeeError,
    isLoading: employeeIsLoading,
  } = useEmployeesQuery({});
  const {
    data: managerData,
    error: managerError,
    isLoading: managerIsLoading,
  } = useManagerQuery({});
  const {
    data: departmentData,
    error: departmentError,
    isLoading: departmentIsLoading,
  } = useCategoriesQuery({});
  const { mutateAsync: createMutation } = useCreateEmployee();
  const { mutateAsync: sendResetPassword } = useResetPasswordSend();

  if (employeeIsLoading || departmentIsLoading || managerIsLoading)
    return <div>Loading...</div>;
  if (employeeError || departmentError || managerError) return null;

  const departments: CategoryUpdateInput[] =
    departmentData?.categories?.data?.results || [];
  let employees: Employee[] = employeeData?.employees?.data?.results || [];
  let managers: Manager[] = managerData?.managers?.data?.results || [];

  let managerOptions = managers.map((manager) => {
    return {
      label:
        manager?.employee?.user?.first_name +
        " " +
        manager?.employee?.user?.last_name,
      value: manager.id,
    };
  });
  managerOptions.unshift({
    label: "Select Manager",
    value: 0,
  });

  let departmentOptions = departments.map((department) => {
    return {
      label: department.name,
      value: department.id,
    };
  });
  departmentOptions.unshift({
    label: "Select Department",
    value: 0,
  });

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
      ...state,
      isModal: false,
      modelData: {} as EmployeeCreateInput,
    });
  };

  const openModal = () => {
    setState({ ...state, isModal: true });
  };

  const handleCreateEmployee = async () => {
    if (modelData?.department === 0) {
      alert("Please select department");
      return;
    }
    if (modelData?.manager === 0) {
      alert("Please select manager");
      return;
    }
    try {
      let createInput = employeeInput(modelData);
      await createMutation(createInput);

      /** Send notification email to the newly created user */
      const resetInput: ResetPasswordSendInput = { user: modelData.email };
      await sendResetPassword(resetInput);

      closeModal(true);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Employees"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-dark btn-set-task w-sm-100 me-2"
                onClick={() => {
                  openModal();
                }}
              >
                <i className="icofont-plus-circle me-2 fs-6"></i>Add Employee
              </button>
            </div>
          );
        }}
      />
      <div className="row g-3 row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-deck py-1 pb-4">
        {employees.map((employee, i: number) => {
          return (
            <div key={"skhd" + i} className="col">
              <OurClients
                id={employee?.id}
                avatar={employee?.user?.avatar}
                post={employee?.description}
                name={
                  employee?.user?.first_name + " " + employee?.user?.last_name
                }
                department={getCategory(departments, employee?.department)}
                isMember={true}
              />
            </div>
          );
        })}
      </div>
      {checkPermission(Permission.ADD_USER) && (
        <EmployeeModal
          show={isModal}
          onClose={closeModal}
          handleModelData={handleModelData}
          modelData={modelData}
          departments={departmentOptions}
          managers={managerOptions}
          onCreate={handleCreateEmployee}
          header="Add Employee"
        />
      )}
    </div>
  );
};

export default Employees;
