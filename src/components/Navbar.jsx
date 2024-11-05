import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/Home">Pokemon Game</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to="/Home">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/PokemonCatcher">Capture</Nav.Link>
            <Nav.Link as={Link} to="/MyPokemon">Meus Pokémons</Nav.Link>
            <Nav.Link as={Link} to="/Battle">Batalhe</Nav.Link>
            <Nav.Link as={Link} to="/Profile">Treinador</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;