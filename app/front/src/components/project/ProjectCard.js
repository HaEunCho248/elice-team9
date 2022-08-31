import React, { useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

// const intDate = (stringDate) => {
//   const excludeBar = stringDate.substr(0, 4)+stringDate.substr(5, 2)+stringDate.substr(stringDate.length-2, 2);
//   // console.log(excludeBar); //확인
//   const intDate = parseInt(excludeBar);
//   // console.log(intDate);    //확인
//   return intDate;
// }

// const todayDate = () => {
//   const today = new Date();
//   const year = today.getFullYear();
//   const month = 1+today.getMonth();
//   const date = today.getDate();
//   return `${year}${month}${date}`;
// }

function ProjectCard({ project, isEditable, setIsEditing, setProjects }) {
  const [checkEndDate, setCheckEndDate] = useState(true);
  // console.log(project.endDate, typeof(project.endDate));  //string
  // if (intDate(project.endDate) > parseInt(todayDate)) {
  //   setCheckEndDate(false);
  // }

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{project.title}</span>
          <br />
          <span className="text-muted">{project.description}</span>
          <br />
          <span className="text-muted"> {project.startDate}</span> ~ 
          {checkEndDate ? (
           <span className="text-muted"> {project.endDate}</span> 
           ) : (
           <span className="text-muted"> 현재 진행중 </span>)}
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
              await Api.delete('projects', object_id);
              const res = await Api.get("projects", user_id);
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
