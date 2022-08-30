import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function EducationCard({ education, isEditable, setIsEditing, setEducations }) {

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{education.school}</span>
          <br />
          <span className="text-muted">{education.major}</span>
          <br />
          <span className="text-muted">{education.position}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >편집
            </Button>

            <Button
              variant="outline-info"
              size="sm"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                const user_id = education.user_id;
                const object_id = education._id;
                console.log(object_id) // 디버깅 //OK
                await Api.delete('education/delete', object_id)
                const res = await Api.get("educationlist", user_id);
                setEducations(res.data);
                setIsEditing(false);
              }}
              className = "mr-3"  
            >삭제
            </Button>
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default EducationCard
