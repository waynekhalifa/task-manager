import React, { useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import "react-nestable/dist/styles/index.css";

import TaskNestable1 from "../../components/Tasks/TaskNestable";
import { useProjectsQuery } from "framework/project/getAllProjects";
import { SelectedTask } from "types/task";
import TaskModal from "components/common/TaskModal";
import { SelectedProject } from "types/project";
import { taskInput, useCreateTask } from "framework/task/create-task";
import { useTaskQuery } from "framework/task/get-all-tasks";
import { IOption } from "types/option";
import { useGroupQuery } from "framework/Group/getAllGroups";
import { Group } from "types/group";
import { useEmployeesQuery } from "framework/employee/getAllEmployees";
import { Employee } from "types/employee";

interface State {
  isAddModal: boolean;
  isEditModal: boolean;
  modalHeader: any;
  selectedTask: SelectedTask;
  modelData: any;
}

const INITIAlIZE_DATA: State = {
  isAddModal: false,
  isEditModal: false,
  modalHeader: "",
  selectedTask: {} as SelectedTask,
  modelData: {},
};

const Tasks: React.FC = () => {
  const [state, setState] = useState<State>(INITIAlIZE_DATA);
  const { modelData, isAddModal, isEditModal, modalHeader } = state;
  const { mutateAsync: createTaskMutation } = useCreateTask();

  let {
    data: projectData,
    error: errorProjects,
    isLoading: loadingProjects,
  } = useProjectsQuery({});
  let {
    data: taskData,
    error: errorTask,
    isLoading: loadingTasks,
  } = useTaskQuery({});
  const {
    data: employeeData,
    error: employeeError,
    isLoading: employeeIsLoading,
  } = useEmployeesQuery({});

  const {
    data: groupData,
    error: groupError,
    isLoading: groupIsLoading,
  } = useGroupQuery({});
  let tasks: SelectedTask[] = taskData?.tasks.data.results || [];
  if (loadingProjects || errorTask || groupError || employeeError)
    return <div>Loading...</div>;
  if (errorProjects || loadingTasks || groupIsLoading || employeeIsLoading)
    return null;
  let projects: SelectedProject[] = projectData?.projects.data.results || [];

  const assignedEmployees: Employee[] =
    employeeData?.employees?.data?.results || [];

  const assignedEmployeesOptions = assignedEmployees.map(
    (employee: Employee) => {
      return {
        label: employee.user.first_name + " " + employee.user.last_name,
        value: employee.user.id,
      };
    }
  );
  assignedEmployeesOptions.unshift({ label: "Select Member", value: 0 });
  let groups: Group[] = groupData?.groups?.data?.results || [];
  let groupOptions = groups.map((group) => {
    return {
      label: group.name,
      value: group.id,
    };
  });
  groupOptions.unshift({
    label: "Select Group",
    value: 0,
  });

  let projectsOptions: IOption[] = projects.map((project) => {
    return {
      label: project.name!,
      value: project.id,
    };
  });
  projectsOptions.unshift({
    label: "Select Project",
    value: 0,
  });

  const handleModelData = (key: string, value: any) => {
    if (isEditModal) {
      setState({
        ...state,
        modelData: {
          ...modelData,
          [key]: value,
        },
      });
      return;
    }
    setState((prevState) => ({
      ...prevState,
      modelData: {
        ...prevState.modelData,
        [key]: value,
      },
    }));
  };

  const handleAddModal = () => {
    setState({
      ...state,
      isAddModal: !isAddModal,
      modalHeader: "Create Task",
    });
  };

  const handleModalClose = () => {
    setState({
      ...state,
      isAddModal: false,
      isEditModal: false,
      modelData: {},
    });
  };

  const createTask = async () => {
    if (!modelData.name) {
      alert("Please enter name");
      return;
    }
    if (!modelData.project) {
      alert("Please select project");
      return;
    }

    try {
      let createInput = taskInput(modelData);
      let res = await createTaskMutation(createInput);
      let task = res.session.data;
      tasks.push(task);
      handleModalClose();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container-xxl">
      <PageHeader
        headerTitle="Tasks Management"
        renderRight={() => {
          return (
            <div className="col-auto d-flex w-sm-100">
              <button
                className="btn btn-dark btn-set-task w-sm-100"
                onClick={handleAddModal}
              >
                <i className="icofont-plus-circle me-2 fs-6" />
                Create Task
              </button>
            </div>
          );
        }}
      />
      <div className="row clearfix g-3">
        <div className="col-lg-12 col-md-12 flex-column">
          {/* <div className="row g-3 row-deck">
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <TaskProgress tasks={tasks} />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-6">
              <RecentActivity />
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-12">
              <AllocatedTask />
            </div>
          </div> */}
          <TaskNestable1 tasks={tasks} />
        </div>
      </div>
      {/* <DragDrop /> */}
      <TaskModal
        onClose={handleModalClose}
        modalHeader={modalHeader}
        isAddModal={isAddModal}
        isEditModal={isEditModal}
        handleModelData={handleModelData}
        projects={projectsOptions}
        modelData={modelData}
        onCreate={createTask}
        members={assignedEmployeesOptions}
        groups={groupOptions}
      />
    </div>
  );
};

export default Tasks;
