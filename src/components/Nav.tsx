// add the link to react-bootstrap
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';



const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
    <Card.Body>
      <Card.Title>Candidate Search</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the
        bulk of the card's content.
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>Location</ListGroup.Item>
      <ListGroup.Item>Email</ListGroup.Item>
      <ListGroup.Item>Bio</ListGroup.Item>
    </ListGroup>
    <Card.Body>
    <Button variant="success">Success</Button>
    <Button variant="danger">Danger</Button>
    </Card.Body>
  </Card>
  )
};

export default Nav;





 


