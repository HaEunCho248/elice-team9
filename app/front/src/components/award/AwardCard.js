import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

// 삭제기능 만들어야 함. 이건 실패작 어떻게 해야할지 고민고민
// 결국 title or id는 탓깃이 된 하나만 보내줘야 하기 때문에
// 프론트에서 설정하여 back 보내줘야 할 것 같다는 생각이 듭니다.
function AwardCard({ award, isEditable, setIsEditing }) {
  const [title, setTitle] = useState();
  
  const handleDelete = (e, _id) => {
    e.preventDefault();
    e.stopPropagation();
    
    Api.delete(`awards/${award.id}`, {
      title
    });
  };
  
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{award.title}</span>
          <br />
          <span className="text-muted">{award.description}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              Edit
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              value={award._id}
              onClick={(e)=> handleDelete(e, setTitle(award.id))}
              className="mr-3"
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default AwardCard;
