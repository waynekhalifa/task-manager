import { checkImage, getShortString } from "utils/helper";

interface Props {
  avatar: any;
  post: any;
  name: any;
  department: any;
  isMember?: any;
  onClickEdit?: any;
  onClickDelete?: any;
  details?: any;
  id: number;
}

const OurClients: React.FC<Props> = ({
  avatar,
  post,
  name,
  department,
  isMember,
  onClickEdit,
  onClickDelete,
  details,
  id
}) => {
  return (
    <div className="card teacher-card">
      <div className="card-body  d-flex">
        <div className="profile-av pe-xl-4 pe-md-2 pe-sm-4 pe-4 text-center w220">
          <img
            src={checkImage(avatar) ? avatar : "https://via.placeholder.com/150"}
            alt=""
            className="avatar xl rounded-circle img-thumbnail shadow-sm"
          />
          <div className="about-info d-flex align-items-center mt-1 justify-content-center flex-column">
            <h6 className="mb-0 fw-bold d-block fs-6 mt-2">
              {getShortString(name, 50)}
            </h6>
            {/* <div className="d-flex flex-wrap align-items-center justify-content-center mt-3">
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={onClickEdit}
              >
                <i className="icofont-edit me-2 fs-6" />
                Assign Another
              </button>
            </div> */}
          </div>
        </div>
        <div className="teacher-info border-start ps-xl-4 ps-md-3 ps-sm-4 ps-4 w-100">
          <h6 className="mb-0 mt-2  fw-bold d-block fs-6">{getShortString(department, 50)}</h6>
          {/* {isMember ? (
            <span className="light-info-bg py-1 px-2 rounded-1 d-inline-block fw-bold small-11 mb-0 mt-1">
              {getShortString(department, 50)}
            </span>
          ) : (
            <span className="py-1 fw-bold small-11 mb-0 mt-1 text-muted">
                {getShortString(department, 50)}
            </span>
          )} */}
          <div className="video-setting-icon mt-3 pt-3 border-top">
            <p>
              <i className="icofont-ui-user me-2 fs-6" />
              {getShortString(post, 200)}
            </p>
          </div>
          {/* {isMember
            ? <div className="d-flex flex-wrap align-items-center ct-btn-set">
              <a href="tasks" className="btn btn-dark btn-sm mt-1 me-2">
                <i className="icofont-plus-circle me-2 fs-6  " />Add Task
              </a>
              <a href="members-profile" className="btn btn-dark btn-sm mt-1">
                <i className="icofont-invisible me-2 fs-6" />Profile
              </a>
            </div>
            : <div className="d-flex flex-wrap align-items-center ct-btn-set">
              <a href="chat-app" className="btn btn-dark btn-sm mt-1 me-1">
                <i className="icofont-ui-text-chat me-2 fs-6" />Chat
              </a>
              <a href="/dashboard/profile/1" className="btn btn-dark btn-sm mt-1">
                <i className="icofont-invisible me-2 fs-6" />Profile
              </a>
            </div>} */}
          <a href={"/dashboard/profile/" + id} className="btn btn-dark btn-sm mt-1">
            <i className="icofont-invisible me-2 fs-6" />Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default OurClients;
