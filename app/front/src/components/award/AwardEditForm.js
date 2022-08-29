import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {

  const [title, setTitle] = useState(currentAward.title);
  const [description, setDescription] = useState(currentAward.description);

  const objectId = currentAward._id
  // currentAward._id 는 mongoDB ObjectId 로 보임

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const id = currentAward.id;
    
    await Api.put(`awards/${objectId}`, {
      id,
      objectId,
      title,
      description,
    });

    const res = await Api.get("awardlist", id);
    setAwards(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicObjectId">
        <Form.Control
          type="hidden"
          value={objectId}
        />
      </Form.Group>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="수상내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      <Form.Group as={Row} className="mt-3 text-center mb-4">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardEditForm;
