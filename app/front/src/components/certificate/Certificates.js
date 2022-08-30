import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import Certificate from "./Certificate";
import CertificateAddForm from "./CertificateAddForm";

<<<<<<< HEAD

function Certificates({ portfolioOwnerId, isEditable }) {
  //useState로 Certificates 상태를 생성함.
  const [certificates, setCertificates] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  

  useEffect(() => {
    // "Certificatelist/유저id"로 GET 요청하고, response의 data로 Certificates를 세팅함.
=======
function Certificates({ portfolioOwnerId, isEditable }) {
  //useState로 awards 상태를 생성함.
  const [certificates, setCertificates] = useState([]);
  //useState로 isAdding 상태를 생성함.
  const [isAdding, setIsAdding] = useState(false);
  console.log(portfolioOwnerId)
  useEffect(() => {
    // "awardlist/유저id"로 GET 요청하고, response의 data로 awards를 세팅함.
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
    Api.get("certificatelist", portfolioOwnerId).then((res) => setCertificates(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card>
      <Card.Body>
        <Card.Title>자격증</Card.Title>
        {certificates.map((certificate) => (
          <Certificate
<<<<<<< HEAD
            key={certificate.id}
=======
            key={certificate.user_id}
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
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
<<<<<<< HEAD
            portfolioOwnerId={portfolioOwnerId}
=======
            portfoiloOwnerId={portfolioOwnerId}
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
            setCertificates={setCertificates}
            setIsAdding={setIsAdding}
          />
        )}
<<<<<<< HEAD
=======
    
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
      </Card.Body>
    </Card>
  );
}

<<<<<<< HEAD
export default Certificates;
=======
export default Certificates;
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
