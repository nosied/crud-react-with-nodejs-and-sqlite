import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { Button, Col, Row } from "react-bootstrap";
import { BreadcrumbNavigation } from "../../components/BreadcrumbNavigation/BreadcrumbNavigation";
import * as Icon from "react-bootstrap-icons";
import { CustomPagination } from "../../components/CustomPagination/CustomPagination";
import { Loading } from "../../components/Loading/Loading";
import { CustomModal } from "../../components/CustomModal/CustomModal";
import { CustomHeader } from "../../components/CustomHeader/CustomHeader";
import { Footer } from "../../components/Footer/Footer";
import { constants } from "../../constants/constants";
import { CustomToast } from "../../components/CustomToast/CustomToast";

export const phoneMask = (phone) => {
  const maskedPhone = String(phone)
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
  return maskedPhone;
};

export default function ListEmployee() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [isLoading, setIsLoading] = useState(false);
  const [employees, setEmployees] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const [currentData, setCurrentData] = useState(undefined);
  const [deleteId, setDeleteId] = useState("");
  const [showToast, setShowToast] = useState(false);

  const getPagination = (items, page = 1, perPage = 10) => {
    const offset = perPage * (page - 1);
    const totalPages = Math.ceil(items.length / perPage);
    const paginatedItems = items.slice(offset, perPage * page);
    return {
      previousPage: page - 1 ? page - 1 : null,
      nextPage: totalPages > page ? page + 1 : null,
      total: items.length,
      totalPages: totalPages,
      items: paginatedItems,
    };
  };

  const formattedDate = (date) => {
    const formatDate = new Date(date).toLocaleDateString("en-GB");
    return formatDate;
  };

  const getEmployees = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(`${constants.defaultUrl}/cadastros`)
        .then(function (response) {
          setEmployees(response.data.reverse());
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const deleteEmployee = (id) => {
    handleShowModal();
    setDeleteId(id);
  };

  const editEmployee = (id) => {
    navigate(`/employee/${id}/edit`);
  };

  const includeEmployee = () => {
    navigate(`/employee/create`);
  };

  const sendDeleteEmployee = async () => {
    if (deleteId) {
      setIsLoading(true);
      try {
        await axios
          .delete(`${constants.defaultUrl}/cadastro`, {
            params: { id: deleteId },
          })
          .then(function (response) {
            getEmployees();
            handleCloseModal();
            setShowToast(true);
          });
      } catch (error) {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      if (employees) {
        const page = getPagination(employees, currentPage, 7);
        setCurrentData(page.items);
        setTotalPage(page.totalPages);
        setIsLoading(false);
      }
    }, 500);
  }, [employees, currentPage]);

  console.log(employees);
  useEffect(() => {
    setIsLoading(true);
    getEmployees();
  }, []);

  return (
    <>
      <CustomHeader></CustomHeader>
      <Container style={{ width: "100%" }}>
        <CustomToast
          show={showToast}
          setShow={setShowToast}
          title="Dados removidos"
          message="Dados do funcionário removidos com sucesso!"
        ></CustomToast>
        {isLoading && <Loading></Loading>}
        <Row>
          <Col>
            <LateralMenu></LateralMenu>
          </Col>
          <Col xs={10}>
            <Row className="navigation">
              <Col>
                <BreadcrumbNavigation BreadTitle="Funcionários Cadastrados"></BreadcrumbNavigation>
              </Col>
              <Col className="alignToRight">
                <Button onClick={includeEmployee}>
                  <Icon.PersonFillAdd size={25} /> Cadastrar Funcionário
                </Button>
              </Col>
            </Row>
            {currentData?.length > 0 && (
              <Row className="listTable">
                <Col>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th style={{ width: "100px" }}>Data de Nascimento</th>
                        <th>Sexo</th>
                        <th style={{ width: "200px" }}>Celular</th>
                        <th style={{ width: "220px" }}>Endereço</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th style={{ width: "100px" }}>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData.map((employee, key) => (
                        <tr key={key}>
                          <td>{employee.id}</td>
                          <td>{employee.nome}</td>
                          <td>{employee.email}</td>
                          <td>{formattedDate(employee.data_nascimento)}</td>
                          <td>{employee.sexo}</td>
                          <td>{phoneMask(employee.celular)}</td>
                          <td>{employee.endereco}</td>
                          <td>{employee.cidade}</td>
                          <td>{employee.naturalidade}</td>
                          <td className="actionTable">
                            <Button
                              size="sm"
                              variant="primary"
                              onClick={() => editEmployee(employee.id)}
                            >
                              <Icon.PencilFill size={15} />
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => deleteEmployee(employee.id)}
                            >
                              <Icon.Trash2Fill size={15} />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
                <Col>
                  <Row>
                    <Col className="toRight">
                      <CustomPagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalPage={totalPage}
                      ></CustomPagination>
                    </Col>
                  </Row>
                </Col>
              </Row>
            )}
            {employees?.length === 0 && !isLoading && (
              <div className="no-registers">
                Não há funcionários cadastrados!
              </div>
            )}
          </Col>
        </Row>
        <CustomModal
          show={showModal}
          handleCloseModal={() => handleCloseModal()}
          title="Remover Funcionário"
          closeButtonTitle="Fechar"
          actionButtonTitle="Remover"
          actionButton={() => sendDeleteEmployee()}
          message="Esta ação irá remover o registro deste funcionário, você tem certeza?"
        ></CustomModal>
      </Container>
      <Footer></Footer>
    </>
  );
}
