import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import * as Api from "../../api";
import Project from "./Project";
import ProjectAddForm from "./ProjectAddForm";

function Projects({ portfolioOwnerId, isEditable }) {
    //useState로 projects 상태를 생성함.
  const [projects, setProjects] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);

  // console.log(portfolioOwnerId);  // 디버깅
  useEffect(() => {
    // "projectlist/유저id"로 GET 요청하고, response의 data로 projects를 세팅함.
    Api.get("projects", portfolioOwnerId).then((res) => setProjects(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>프로젝트 이력</Card.Title>
        {projects.map((project) => (
          <Project
            key={project.id}
            project={project}
            setProjects={setProjects}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}> + </Button>
            </Col>
          </Form.Group>
        )}
        {isAdding && (
          <ProjectAddForm
            portfolioOwnerId={portfolioOwnerId}
            setProjects={setProjects}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Projects;
