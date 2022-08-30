import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import moment from "moment";

function changeFormat(date, format) { //moment 변환을 함수로 미리 빼 두어서 사용.
  if (moment(date).isValid()) {
      return moment(date).format(format);
  } else {
      return null;
  }
}

function AwardEditForm({ currentAward, setAwards, setIsEditing }) {

  const [title, setTitle] = useState(currentAward.title);
  const [description, setDescription] = useState(currentAward.description);
  const [awardedDate, setAwardedDate] = useState(new Date());

  const object_id = currentAward.object_id

  console.log(`currentAward:`,currentAward)

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const changedAwardedDate = changeFormat(awardedDate, "yyyy-MM-DD");  // 미리 만든 moment 함수를 적용

    await Api.put(`award/${currentAward.object_id}`, {
      object_id,
      title,
      description,
      changedAwardedDate,
    });

    const res = await Api.get("awards", currentAward.user_id);
    setAwards(res.data);
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <Form.Group as={Row} className="mt-3">
        <Col>
          수상일 <DatePicker 
          dateFormat = "yyyy.MM.dd"
          selected={awardedDate}
          onChange={(date) => setAwardedDate(date)}
          />
        </Col>
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
