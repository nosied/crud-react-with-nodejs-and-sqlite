import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export const CustomHeader = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">Sistema de Funcionários</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto customMenu">
            <div className="leftItems">
              <Nav.Link href="#">Home</Nav.Link>
              <Nav.Link href="#">Funcionários</Nav.Link>
            </div>
            <NavDropdown title="Configurações" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">Meu Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#">Minha Conta</NavDropdown.Item>
              <NavDropdown.Item href="#">Gerenciar Usuários</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">Sair</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
