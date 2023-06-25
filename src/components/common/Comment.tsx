import React from 'react';
import { Col, Row } from 'react-bootstrap';

interface Props {
  data: any;
}

const Comment: React.FC<Props> = ({ data }) => {

  return (
    <Row>
      <Col md={2}>
        <img src={data.avatar} alt={data.name} style={{
          width: 60,
          height: 60,
          borderRadius: '50%'
        }} />
      </Col>
      <Col md={10}>
        <div className="comment__content">
          <div className="comment__content__header">
            <h5 className="badge bg-secondary ms-2 mx-2">{data.name}</h5>
            <small className="comment__content__header__date">{data.time}</small>
          </div>
          <p className="comment__content__body">{data.comment}</p>
        </div>
      </Col>
    </Row>
  );
}

export default Comment;