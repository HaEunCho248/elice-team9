import { Card, Button, Row, Col } from "react-bootstrap";
<<<<<<< HEAD

function CertificateCard({ certificate, isEditable, setIsEditing }) {
=======
import * as Api from "../../api";

function CertificateCard({ certificate, isEditable, setIsEditing, setCertificates }) {


>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4

  return (
    <Card.Text>
      <Row className="align-items-center">
        <Col>
          <span>{certificate.title}</span>
          <br />
          <span className="text-muted">{certificate.description}</span>
<<<<<<< HEAD
          <span>{certificate.acquisitionDate}</span>
          <br />
=======
          <br />
          <span className="text-muted">{certificate.acquisition_date}</span>
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
        </Col>
        {isEditable && (
          <Col xs lg="1">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
              className="mr-3"
<<<<<<< HEAD
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
=======
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
>>>>>>> a88340f01b38224b7ab79170fec9ca27d1a7f2c4
          </Col>
        )}
      </Row>
    </Card.Text>
  );
}

export default CertificateCard
