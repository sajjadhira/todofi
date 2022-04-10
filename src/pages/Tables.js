import {
  Card,
  Table,
  // Button,
} from "react-bootstrap";

const Tables = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12 fw-bold fs-3">Tables</div>
      </div>

      <Card className="mt-3">
        <Card.Header as="h5">Bootstrap Responsive Table</Card.Header>
        <Card.Body>
          <Card.Title>
            table <code>responsive</code>
          </Card.Title>
          <Card.Text>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <th key={index}>Table heading</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
                <tr>
                  <td>2</td>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
                <tr>
                  <td>3</td>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <td key={index}>Table cell {index}</td>
                  ))}
                </tr>
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>

      <Card className="mt-3">
        <Card.Header as="h5">Bootstrap Dark Table</Card.Header>
        <Card.Body>
          <Card.Title className="pb-3 mt-3">
            table <code>variant="dark"</code>
          </Card.Title>
          <Card.Text>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td colSpan={2}>Larry the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </Table>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Tables;
