import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  
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
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              
              const user_id = project.user_id;
              // console.log(user_id);  //디버깅
              const object_id = project.object_id;  // _id >> object_id 
              // console.log(object_id) // 디버깅 
              await Api.delete('project/delete', object_id);
              const res = await Api.get("projectlist", user_id);
              setProjects(res.data);
              setIsEditing(false);
            }}
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
