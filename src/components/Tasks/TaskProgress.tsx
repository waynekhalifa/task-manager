import { ProgressBar } from "react-bootstrap";
import { SelectedTask } from "types/task";


interface Props {
  tasks: SelectedTask[];
}

const TaskProgress: React.FC<Props> = ({ tasks }) => {
  return (
    <div className="card">
      <div className="card-header py-3">
        <h6 className="mb-0 fw-bold ">To Do</h6>
      </div>
      <div className="card-body mem-list">
        <div className="progress-count mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h6 className="mb-0 fw-bold d-flex align-items-center">
              Curriculum Development
            </h6>
            <span className="small text-muted">02/07</span>
          </div>
          <ProgressBar style={{ height: "10px" }}>
            <ProgressBar
              now={92}
              className="light-info-bg"
              style={{ height: "10px" }}
            />
          </ProgressBar>
        </div>
        <div className="progress-count mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h6 className="mb-0 fw-bold d-flex align-items-center">
              Teacher Training
            </h6>
            <span className="small text-muted">01/03</span>
          </div>
          <ProgressBar style={{ height: "10px" }}>
            <ProgressBar
              now={60}
              className="light-lightgreen"
              style={{ height: "10px" }}
            />
          </ProgressBar>
        </div>
        <div className="progress-count mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h6 className="mb-0 fw-bold d-flex align-items-center">
              Assessment System

            </h6>
            <span className="small text-muted">02/07</span>
          </div>
          <ProgressBar style={{ height: "10px" }}>
            <ProgressBar
              now={40}
              className="light-success-bg"
              style={{ height: "10px" }}
            />
          </ProgressBar>
        </div>
        <div className="progress-count mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h6 className="mb-0 fw-bold d-flex align-items-center">
              Student Records

            </h6>
            <span className="small text-muted">01/05</span>
          </div>
          <ProgressBar style={{ height: "10px" }}>
            <ProgressBar
              now={40}
              className="light-orange-bg"
              style={{ height: "10px" }}
            />
          </ProgressBar>
        </div>
        <div className="progress-count mb-4">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <h6 className="mb-0 fw-bold d-flex align-items-center">Testing</h6>
            <span className="small text-muted">01/08</span>
          </div>
          <ProgressBar style={{ height: "10px" }}>
            <ProgressBar
              now={30}
              className="light-lightyellow"
              style={{ height: "10px" }}
            />
          </ProgressBar>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress;
