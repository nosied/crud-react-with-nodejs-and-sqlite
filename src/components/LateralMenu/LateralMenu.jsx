import { Accordion, Col, Row } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
export const LateralMenu = () => {
  return (
    <Row className="lateralMenu">
      <Accordion defaultActiveKey="0" alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Funcionários</Accordion.Header>
          <Accordion.Body>
            <Col className="link">
              <Link to="/">
                <Icon.PeopleFill size={25} /> Listar
              </Link>
            </Col>
            <Col className="link">
              <Link to={`/employee/create`}>
                <Icon.PersonFillAdd size={25} /> Cadastrar
              </Link>
            </Col>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Cargos</Accordion.Header>
          <Accordion.Body>
            <Col className="link">
              <Icon.PeopleFill size={25} /> Listar
            </Col>
            <Col className="link">
              <Icon.PersonFillAdd size={25} /> Cadastrar
            </Col>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Departamentos</Accordion.Header>
          <Accordion.Body>
            <Col className="link">
              <Icon.PeopleFill size={25} /> Listar
            </Col>
            <Col className="link">
              <Icon.PersonFillAdd size={25} /> Cadastrar
            </Col>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Row>
  );
};
