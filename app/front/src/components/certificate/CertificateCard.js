import { Card, Button, Row, Col } from "react-bootstrap";

function CertificateCard({ certificate, isEditable, setIsEditing }) {

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{certificate.description}</span>
          <span>{certificate.acquisitionDate}</span>
          <br />
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
            {/* <Button
              variant="outline-info"
              size="sm"
              onClick={()=>{async(e) => {
                e.preventDefault();
                e.stopPropagation();
            
                const user_id = education.user_id;
            
                await Api.delete('educations', user_id);}}};
            />
              삭제
            </Button> */}
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard
