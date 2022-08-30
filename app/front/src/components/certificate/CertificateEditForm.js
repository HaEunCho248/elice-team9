import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
<<<<<<< HEAD
import DatePicker from "react-datepicker";
import * as Api from "../../api";
=======
import * as Api from "../../api";
import DatePicker from "react-datepicker";
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4

function CertificateEditForm({ currentCertificate, setCertificates, setIsEditing }) {
  //useState로 title 상태를 생성함.
  const [title, setTitle] = useState(currentCertificate.title);
<<<<<<< HEAD
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(currentCertificate.description);
  //useState로 acquisitionDate 상태를 생성함.
  const [acquisitionDate, setAcquisitionDate] = useState(new Date());
=======
  const [description, setDescription] = useState(currentCertificate.description);
  const [acquisitionDate, setAcquisitionDate] = useState(new Date(currentCertificate.acquisition_date));
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

<<<<<<< HEAD
    // currentCertificate의 user_id를 user_id 변수에 할당함.
    const user_id = currentCertificate.user_id;

    // "Certificates/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`certificates/${currentCertificate.id}`, {
      user_id,
      title,
      description,
      acquisitionDate,
    });

    // "Certificatelist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", user_id);
    // Certificates를 response의 data로 세팅함.
=======
    // currentAward의 user_id를 user_id 변수에 할당함.
    const user_id = currentCertificate.user_id;
    const object_id = currentCertificate._id;
    const acquisition_date = acquisitionDate.toISOString().split("T")[0];
    // "awards/수상 id" 엔드포인트로 PUT 요청함.
    await Api.put(`certificates/${currentCertificate._id}`, {
      user_id,
      _id: object_id,
      title,
      description,
      acquisition_date,
    });

    // "awardlist/유저id" 엔드포인트로 GET 요청함.
    const res = await Api.get("certificatelist", user_id);
    // awards를 response의 data로 세팅함.
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
    setCertificates(res.data);
    // 편집 과정이 끝났으므로, isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicTitle">
        <Form.Control
          type="text"
          placeholder="자격증 제목"
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
<<<<<<< HEAD

      <Form.Group controlId="formBasicDescription" className="mt-3 col-2">
=======
      <Form.Group>
      
      <Form.Group controlId="formBasicAcquisitionDate" className="mt-3 col-2">
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
        <DatePicker 
            selected={acquisitionDate}
            onChange={(date) => setAcquisitionDate(date)}
        />
      </Form.Group>

<<<<<<< HEAD
=======
      </Form.Group>

>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
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

export default CertificateEditForm;
