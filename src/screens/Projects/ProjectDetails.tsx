import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";


interface Props {
  id: number;
}


const ProjectDetails: React.FC<Props> = ({id}) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "",
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(task);
  };

  return (
    <div>
      <h2>Task Details</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={6}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={task.title} onChange={handleChange} />
            </Form.Group>
          </Col>
          <Col sm={6}>
            <Form.Group controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control type="date" name="dueDate" value={task.dueDate} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={task.description} onChange={handleChange} />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit">Save</Button>
      </Form>
    </div>
  );
};

export default ProjectDetails;