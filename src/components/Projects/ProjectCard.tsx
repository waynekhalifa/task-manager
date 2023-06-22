import useApp from "hooks/useApp";
import { ProgressBar } from "react-bootstrap";
import { SelectedProject } from "types/project";
import { sumDateRange, sumDaysLeftFromToDay } from "utils/convert";

interface Props {
  project: SelectedProject;
  category?: string;
  onClickEdit?: any;
  onClickDelete?: any;
  onClickAddMember?: any;
  onClickAddAttachment?: any;
  onClickViewDescription?: any;
  onClickViewTasks?: any;
  onClickAddTask?: any;
  onClickAddComment: any;

}

const ProjectCard: React.FC<Props> = ({
  project,
  category,
  onClickEdit,
  onClickDelete,
  onClickAddMember,
  onClickAddAttachment,
  onClickViewDescription,
  onClickAddComment,
  onClickViewTasks,
  onClickAddTask,

}) => {


  const { push } = useApp();

  return (
    <div className="dd-handle">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between mt-5">
          <div className="lesson_name pointer"
            onClick={() => push(`/dashboard/projects/${project.id}`)}
          >
            <div className="project-block">
              <img src={project?.file || "https://via.placeholder.com/150"} className={project?.name} alt={project?.name} width={50} height={50} />
            </div>
            <span className="small text-muted project_name fw-bold">{category}</span>
            <h6 className="mb-0 fw-bold  fs-6  mb-2">{project?.name}</h6>
          </div>
          <div
            className="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClickEdit}
            >
              <i className="icofont-edit text-success"></i>
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onClickDelete}
            >
              <i className="icofont-ui-delete text-danger"></i>
            </button>
          </div>
        </div>


        <div className="row g-2 pt-4">

          <div className="col-6">
            <div className="d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={onClickAddAttachment}
            >
              <i className="icofont-paper-clip"></i>
              <span className="badge bg-secondary ms-2">{project?.projectfile_set?.length} Attach</span>
              <span
                className="avatar rounded-circle text-center pointer sm"
              >
                <i className="icofont-ui-add"></i>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="icofont-sand-clock"></i>
              <span className="badge bg-secondary ms-2">{sumDateRange(project?.start_at!, project?.end_at!)} Days</span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={onClickAddMember}
            >
              <i className="icofont-group-students "></i>
              <span className="badge bg-secondary ms-2">{project?.members_count} Members</span>
              <span
                className="avatar rounded-circle text-center pointer sm"
              >
                <i className="icofont-ui-add"></i>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={onClickAddComment}
            >
              <i className="icofont-ui-text-chat"></i>
              <span className="badge bg-secondary ms-2">{project?.comments_count}</span>
              <span
                className="avatar rounded-circle text-center pointer sm"
              >
                <i className="icofont-ui-add"></i>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={onClickViewDescription}
            >
              <i className="icofont-align-left "></i>
              <span className="ms-2">Description</span>
              <span
                className="avatar rounded-circle text-center pointer sm"
              >
                <i className="icofont-eye-alt"></i>
              </span>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center">
              <i className="icofont-tasks"></i>
              <span className="ms-2" style={{ cursor: 'pointer' }}
                onClick={onClickViewTasks}
              >Tasks</span>
              <span className="badge bg-secondary ms-2">{project?.tasks_count}</span>
              <span
                className="avatar rounded-circle text-center pointer sm"
              >
                <i className="icofont-ui-add" style={{ cursor: 'pointer' }}
                  onClick={onClickAddTask}
                ></i>
              </span>
            </div>
          </div>
        </div>


        <div className="dividers-block"></div>
        <div className="d-flex align-items-center justify-content-between mb-2">
          {/* <h4 className="small fw-bold mb-0">Progress</h4> */}
          <span className="small light-danger-bg  p-1 rounded">
            <i className="icofont-ui-clock"></i> {sumDaysLeftFromToDay(project?.start_at!)} Days Left
          </span>
        </div>
        <ProgressBar style={{ height: "8px" }}>
          <ProgressBar variant="secondary" now={15} style={{ width: "25%" }} />
        </ProgressBar>
        25% Complete
      </div>
    </div >
  );
};

export default ProjectCard;
