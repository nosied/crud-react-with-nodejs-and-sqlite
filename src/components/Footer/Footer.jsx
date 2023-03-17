import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Footer = () => {
  const links = [
    {
      url: "#",
      title: "Cadastrar Clientes",
    },
    {
      url: "#",
      title: "Gestão de Pessoal",
    },
    {
      url: "#",
      title: "Jornadas",
    },
    {
      url: "#",
      title: "Cargos",
    },
    {
      url: "#",
      title: "Vagas de Emprego",
    },
    {
      url: "#",
      title: "Departamentos",
    },
    {
      url: "#",
      title: "Salários",
    },
    {
      url: "#",
      title: "Gestão de Férias",
    },
    {
      url: "#",
      title: "Gerência",
    },
  ];
  return (
    <div className="footer">
      <Container>
        {links.map((link, index) => {
          return (
            <Link key={index} to={link.url}>
              {link.title}
            </Link>
          );
        })}
      </Container>
    </div>
  );
};
