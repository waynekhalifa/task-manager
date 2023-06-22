import OurClients from "components/Clients/OurClients";
import NestableCard from "components/Tasks/NestableCard";
import Attachment from "components/common/Attachment";
import Comment from "components/common/Comment";
import { TaskStatusBadge } from "enums/global";
import { useSingleTask } from "framework/task/get-single-task";
import { Dropdown } from "react-bootstrap";
import EnquiresView from "screens/Tickets/TicketsView";
import { SelectedTask } from "types/task";
import { getBtn } from "utils/helper";

interface Props {
  id: number;
}


const TaskDetails: React.FC<Props> = ({ id }) => {
  let { data, error, isLoading } = useSingleTask({ id });
  let user = {
    avatar: "https://via.placeholder.com/150",
    post: "Teacher",
    name: "John Doe",
    department: "Academic Department",

  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return null;

  let task: any = data || {} as SelectedTask;

  let comments = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
    {
      id: 2,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
    {
      id: 3,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
    {
      id: 4,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
    {
      id: 5,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.",
      time: "2 hours ago"
    },
  ];

  return (
    <div style={{
      backgroundColor: "#F5F6FA",
      minHeight: "100vh",
      padding: 20,
    }}>
      <h2>Task Details</h2>
      <div className="container-xxl">
        <div className="row g-3 mb-3 mt-3">
          <div className="col-lg-4 col-md-12">
            <NestableCard data={data} />
          </div>
          <div className="col-lg-8 col-md-12">
            <OurClients
              avatar={user.avatar}
              post={user.post}
              name={user.name}
              department={user.department}
              onClickEdit={() => { }}
              onClickDelete={() => { }}
              details="lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula.              
              "
            />
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p className="card-text">{task.description}</p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <div>
                  <h5 className="card-title">Task Status</h5>
                  <Dropdown className="d-inline-flex m-1">
                    <Dropdown.Toggle as="a" variant="" id="dropdown-basic" className={getBtn(task.task_progress)}>
                      {task.task_progress}
                    </Dropdown.Toggle>

                    <Dropdown.Menu as="ul" className="border-0 shadow bg-primary">
                      <li><a className="dropdown-item py-2 rounded text-light" href="#!" onClick={(e) => { e.preventDefault(); }}>
                        {TaskStatusBadge.TODO}</a></li>
                      <li><a className="dropdown-item py-2 rounded text-light" href="#!" onClick={(e) => { e.preventDefault(); }}>{TaskStatusBadge.ON_PROGRESS}</a></li>
                      <li><a className="dropdown-item py-2 rounded text-light" href="#!" onClick={(e) => { e.preventDefault(); }}>{TaskStatusBadge.ON_REVIEW}</a></li>
                      <li><a className="dropdown-item py-2 rounded text-light" href="#!" onClick={(e) => { e.preventDefault(); }}>{TaskStatusBadge.COMPLETED}</a></li>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary"><strong>Attachments</strong></h5>
                <Attachment
                  task={task}
                />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title text-primary"><strong>Tickets</strong></h5>
                <EnquiresView />
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Comments</h5>
                <div className="row g-3">
                  {comments.map((comment, index: number) => (
                    <div className="col-md-6" key={index}>
                      <Comment data={comment} />
                    </div>
                  ))}
                  <div className="col-md-12">
                    <div className="input-group mb-3">
                      <input type="text" className="form-control" placeholder="Comment" aria-label="Comment" aria-describedby="button-addon2" />
                      <button className="btn btn-outline-secondary" type="button" id="button-addon2">Send</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;