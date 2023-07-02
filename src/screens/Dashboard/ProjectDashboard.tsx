import React from "react";
import BrandInfoSmallcard from "components/Dashboard/BrandInfoSmallcard";
import ProjectInformationTable from "components/Dashboard/ProjectInformationTable";
import TaskCard from "components/Dashboard/TaskCard";
import { useAuth } from "contexts/AuthContext";

interface Props {}

const ProjectDashboard: React.FC<Props> = () => {
  const { session } = useAuth();
  return (
    <div className="container-xxl">
      <div className="row g-3 mb-3 row-deck">
        <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-4">
          <TaskCard
            label="Total Task"
            value={session?.user?.total_tasks_count}
            iconClass="bi bi-journal-check fs-4"
          />
        </div>
        <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-4">
          <TaskCard
            label="Completed Task"
            value={session?.user?.completed_tasks_count}
            iconClass="bi bi-list-check fs-4"
          />
        </div>
        <div className="col-md-12 col-lg-4 col-xl-4 col-xxl-4">
          <TaskCard
            label="Progress Task"
            value={session?.user?.on_progress_tasks_count}
            iconClass="bi bi-clipboard-data fs-4"
          />
        </div>
      </div>
      {/* <div className="row g-3 mb-3 row-deck">
        <div className="col-md-12 col-lg-8 col-xl-7 col-xxl-7">
          <DylanHunter />
        </div>
        <div className="col-md-12 col-lg-4 col-xl-5 col-xxl-5">
          <ProjectCredentials />
        </div>
      </div> */}
      {/* <div className="row g-3 mb-3 row-deck">
        <div className="col-md-12 col-lg-4">
          <GeneralChartCard
            Title="Income Analytics"
            data={IncomeAnalyticsChartData}
            identity="IncomeAnalytics"
            extraDivBody={() => {
              return (
                <div className="d-flex justify-content-end text-center">
                  <div className="p-2">
                    <h6 className="mb-0 fw-bold">$5,318</h6>
                    <small className="text-muted">Income</small>
                  </div>
                  <div className="p-2 ms-4">
                    <h6 className="mb-0 fw-bold">$2,840</h6>
                    <small className="text-muted">Expense</small>
                  </div>
                </div>
              );
            }}
            TitleRight={undefined}
          />
        </div>
        <div className="col-md-12 col-lg-8">
          <GeneralChartCardDropDown
            Title="Project Timeline"
            data={ProjectTimelineChartData}
            identity="ProjectTimeline"
            TitleRight={undefined}
            extraDivBody={undefined}
          />
        </div>
      </div> */}
      <div className="row g-3 mb-3 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-4 row-cols-xxl-4">
        <div className="col">
          <BrandInfoSmallcard
            title="Total Projects"
            value="550"
            iconClass="icofont-data fs-3"
          />
        </div>
        <div className="col">
          <BrandInfoSmallcard
            title="Coming Projects"
            value="210"
            iconClass="icofont-chart-flow fs-3"
          />
        </div>
        <div className="col">
          <BrandInfoSmallcard
            title="Progress Projects"
            value="8456 Files"
            iconClass="icofont-chart-flow-2 fs-3"
          />
        </div>
        <div className="col">
          <BrandInfoSmallcard
            title="Finished Projects"
            value="88 Files"
            iconClass="icofont-tasks fs-3"
          />
        </div>
      </div>
      <div className="row g-3 mb-3 row-deck">
        <div className="col-md-12">
          <ProjectInformationTable />
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;
