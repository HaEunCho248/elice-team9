import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";


function Certificates({ portfolioOwnerId, isEditable }) {
  const test0825 = [{
                        title : "자격증1 (자격증 MVP 백엔드 없는 상태입니다.)",
                        description: "아무 자격증",
                        acquisitionDate: "2022.08.26 (React DatePicker 사용, 테스트는 string)",
                  }]
  //useState로 Certificates 상태를 생성함.
  const [certificates, setCertificates] = useState(test0825);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  

  useEffect(() => {
    // "Certificatelist/유저id"로 GET 요청하고, response의 data로 Certificates를 세팅함.
    Api.get("certificatelist", portfolioOwnerId).then((res) => setCertificates(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
            key={certificate.id}
            certificate={certificate}
            setCertificates={setCertificates}
            isEditable={isEditable}
          />
        ))}
        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <Button onClick={() => setIsAdding(true)}>+</Button>
            </Col>
          </Row>
        )}
        {isAdding && (
          <CertificateAddForm
            portfolioOwnerId={portfolioOwnerId}
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
          />
        )}
      </Card.Body>
    </Card>
  );
}

export default Certificates;
