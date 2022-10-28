import React, { useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import DatePicker from "react-datepicker";
import moment from "moment";  //moment 모듈 설치, date fns //format(new Date(), “yyyy-MM-dd”)

function changeFormat(date, format) { //moment 변환을 함수로 미리 빼 두어서 사용.
  if (moment(date).isValid()) {
      return moment(date).format(format);
  } else {
      return null;
  }
}


function AwardAddForm({ portfolioOwnerId, setAwards, setIsAdding }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [awardedDate, setAwardedDate] = useState(new Date());
  const [awardImg, setAwardImg] = useState(null);
  const [awardDate, setAwardDate] = useState(new Date());


  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();


    const awardDate = changeFormat(awardedDate, "yyyy-MM-DD");  // 미리 만든 moment 함수를 적용
    const user_id = portfolioOwnerId;

    let formData = new FormData(); //formdata에 다른 정보도 넣어서 보내는 방향으로
    formData.append("image", awardImg);
    formData.append("user_id", portfolioOwnerId);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("awardDate", awardDate);

    let entries = formData.entries();
    for (const pair of entries) {
        console.log(`awardAddForm formdata 확인:`, pair[0]+ ', ' + pair[1])}; //multer 확인
    console.log(`확인용:`, formData);

    await Api.post("award", {
      formData,
    });

    // await Api.post("award", {
    //   user_id: portfolioOwnerId,
    //   title,
    //   description,
    //   awardDate,
    // });

    const res = await Api.get("awards", user_id);
    setAwards(res.data);
    setIsAdding(false);
    setAwardDate(res.awardDate);
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
          selected={awardedDate}
          onChange={(date) => setAwardedDate(date)}
          dateFormat = "yyyy.MM.dd"
          selected={awardDate}
          onChange={(date) => setAwardDate(date)}
          />
        </Col>
      </Form.Group>

      <Form.Group controlId="formFileSm" className="mt-3">
        <Form.Label>사진</Form.Label>
        <Form.Control 
          type="file"
          size="sm"
          encType="multipart/form-data" 
          name="formData"
          onChange={(e) => {
            setAwardImg(e.target.files[0])
            console.log(`event 확인:`, e.target.files[0])
            }}/>
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

export default AwardAddForm;
