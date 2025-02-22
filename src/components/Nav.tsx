// add the link to react-bootstrap
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
 

const Navigation = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  return (
    <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">Home</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="/CandidateSearch">Potential Candidates</Nav.Link>
      </Nav.Item>
    </Nav>
  );
}


export default Navigation;








