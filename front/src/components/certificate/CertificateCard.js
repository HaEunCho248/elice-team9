import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";

function CertificateCard({ certificate, isEditable, setIsEditing, setCertificates }) {



  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{certificate.description}</span>
          <br />
          <span className="text-muted">{certificate.acquisition_date}</span>
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
                
                const user_id = certificate.user_id
                const object_id = certificate._id;
                console.log(object_id)
                await Api.delete('certificate/delete', object_id)
                const res = await Api.get("certificatelist", user_id);
                setCertificates(res.data);
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

export default CertificateCard
