import { Link } from 'react-router-dom';


const Nav = () => {
  return (

    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li>
          <Link className="nav-link" to="/savedCandidates">Potential Candidates</Link>
        </li>
      </ul>
    </nav>

  );
};

export default Nav;







