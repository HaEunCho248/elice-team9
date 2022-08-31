import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";

import {intDate, todayDate} from "./projectFunc"
console.log(todayDate);

function ProjectAddForm({ portfolioOwnerId, setProjects, setIsAdding }) {
  
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState("");
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkEndDate, setCheckEndDate] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // portfolioOwnerId를 user_id 변수에 할당함.
    const user_id = portfolioOwnerId;

    // "project/create" 엔드포인트로 post요청함.
    await Api.post("project", {
      user_id: portfolioOwnerId,
      title,
      description,
      startDate,
      endDate,
    });

    // "projectlist/유저id" 엔드포인트로 get요청함.
    const res = await Api.get("projects", user_id);
    // projects를 response의 data로 세팅함.
    setProjects(res.data);
    // project를 추가하는 과정이 끝났으므로, isAdding을 false로 세팅함.
    setIsAdding(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="프로젝트 내역"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicDescription" className="mt-3">
        <Form.Control
          type="text"
          placeholder="프로젝트 상세내역"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>


      <Form.Group as={Row} className="mt-3">
        
        <Col>
          시작일 <DatePicker 
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col>
          종료일 (오늘 날짜 이후 입력 시, '현재 진행중'으로 표기) <DatePicker 
          selected={endDate}
          onChange={(date) => {
            setEndDate(date)
            console.log("test1")
            if (intDate(endDate) >= parseInt(todayDate)) {
              console.log("test성공")
            setCheckEndDate(false);
          }  console.log("test2")}}
          />
        </Col> 
        
        
      </Form.Group>


      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <Button variant="primary" type="submit" className="me-3">
            확인
          </Button>
          <Button variant="secondary" onClick={() => setIsAdding(false)}>
            취소
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ProjectAddForm;
