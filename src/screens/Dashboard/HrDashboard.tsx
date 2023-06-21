import React from "react";
import GeneralChartCard from "components/Dashboard/GeneralChartCard";
import {
  EmployeeInfoChartData,
  TopHiringSourcesChartData,
  TotalEmployeesChartData,
} from "components/Data/DashboardData";
import BigCalendar from "components/Pages/BigCalendar";
import Employeesavaibility from "components/Dashboard/Employeesavaibility";

const HrDashboard: React.FC = () => {
  return (
    <div className="container-xxl">
      {/* <PageHeader headerTitle="Hr Dashboard"  /> */}
      <div className="row clearfix g-3">
        <div className="col-xl-8 col-lg-12 col-md-12 flex-column">
          <div className="row g-3">
            <div className="col-md-12">
              <GeneralChartCard
                Title="Employees Info"
                data={EmployeeInfoChartData}
                identity={undefined}
                TitleRight={undefined}
                extraDivBody={undefined}
              />
            </div>
            {/* <div className="col-md-6">
              <Employeesavaibility />
            </div>
            <div className="col-md-6">
              <GeneralChartCard
                Title="Total Employees"
                data={TotalEmployeesChartData}
                TitleRight="423"
                identity="totalemployee"
                extraDivBody={undefined}
              />
            </div> */}
            <div className="col-md-12">
              <GeneralChartCard
                Title="Top Hiring Sources"
                data={TopHiringSourcesChartData}
                identity="TopHiringSources"
                TitleRight={undefined}
                extraDivBody={undefined}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-12 col-md-12">
          <div className="row g-3">
            <div className="col-md-6 col-lg-6 col-xl-12">
              <Employeesavaibility />
            </div>
            <div className="col-md-6 col-lg-6 col-xl-12">
              <GeneralChartCard
                Title="Total Employees"
                data={TotalEmployeesChartData}
                TitleRight="423"
                identity="totalemployee"
                extraDivBody={undefined}
              />
            </div>
            {/* <div className="col-md-6 col-lg-6 col-xl-12 flex-column">
              <InterviewCard
                value={246}
                iconClass="icofont-users-alt-2 fs-5"
                label="Interviews"
                chartClass="icofont-chart-bar-graph fs-3 text-muted"
              />
              <InterviewCard
                value={101}
                iconClass="icofont-holding-hands fs-5"
                label="Hired"
                chartClass="icofont-chart-line fs-3 text-muted"
              />
            </div>
            <div className="col-md-12 col-lg-12 col-xl-12">
              <UpcommingInterviews />
            </div> */}
          </div>
        </div>
        <div className="col-md-12">
          {/* <TopPerformers /> */}
          <BigCalendar />
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;
