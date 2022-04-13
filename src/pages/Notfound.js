import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiOutlineUndo } from "react-icons/ai";

const Notfound = () => {
  return (
    <>
      <div className="container">
        <Row className="mt-5 text-center">
          <Col md={12} className="mt-5 align-self-center">
            <h2 className="fw-bold fs-3">404 Not Found</h2>
            <p className="text-muted">
              Your requested content not found, please check the page or data
              already exists or not.
            </p>

            <div className="text-center">
              <Link to="/">
                <Button varient="primary">
                  <AiOutlineUndo /> Back
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Notfound;
