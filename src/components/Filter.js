import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Filter({ languages }) {
  const options = languages.map((language) => {
    return <NavDropdown.Item eventKey={language}>{language}</NavDropdown.Item>;
  });

  return (
    <Nav>
      <NavDropdown title="Filter" id="nav-dropdown">
        {options}
      </NavDropdown>
    </Nav>
  );
}

export default Filter;
