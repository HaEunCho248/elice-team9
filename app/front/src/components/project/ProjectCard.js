import { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing }) {
  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted">{project.startDate}</span>
           ~ <span className="text-muted">{project.endDate}</span>
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
            >
              편집
            </Button>
          
          <Button
            variant="outline-info"
            size="sm"
//            onClick = {() => {
//             Api.delete("projectlist",).then((res) => setProjects(res.data));
//            } }
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

export default ProjectCard;
