import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { BreadcrumbNavigation } from "../../components/BreadcrumbNavigation/BreadcrumbNavigation";
import * as Icon from "react-bootstrap-icons";
import { CustomToast } from "../../components/CustomToast/CustomToast";
import { Loading } from "../../components/Loading/Loading";
import { CustomHeader } from "../../components/CustomHeader/CustomHeader";
import { Footer } from "../../components/Footer/Footer";
import { constants } from "../../constants/constants";

export default function ListEmployee() {
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState([]);
  const [isValidForm, setIsValidForm] = useState(false);
  const [selectedUF, setSelectedUF] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [uf, setUf] = useState(undefined);
  const [cities, setCities] = useState(undefined);
  const { id } = useParams();

  useEffect(() => {
    getStates();
    getEmployee();
  }, []);

  useEffect(() => {}, [inputs]);
  const getEmployee = async () => {
    try {
      setIsLoading(true);
      await axios
        .get(`${constants.defaultUrl}/cadastro/`, { params: { id: id } })
        .then(function (response) {
          setInputs(response.data);
          setSelectedUF(response.data.naturalidade);
          setSelectedCity(response.data.cidade);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      await axios
        .put(`${constants.defaultUrl}/cadastro`, inputs)
        .then(function (response) {
          setTimeout(() => {
            setIsLoading(false);
            setShowToast(true);
          }, 1000);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (
      inputs?.celular &&
      inputs?.cidade &&
      inputs?.data_nascimento &&
      inputs?.email &&
      inputs?.endereco &&
      inputs?.naturalidade &&
      inputs?.nome &&
      inputs?.sexo
    )
      setIsValidForm(true);
    else setIsValidForm(false);
  }, [inputs]);

  const getStates = async () => {
    setIsLoading(true);
    try {
      await axios
        .get(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        )
        .then(function (response) {
          setUf(response.data);
          setIsLoading(false);
        });
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getCities = async () => {
    if (selectedUF) {
      setIsLoading(true);
      try {
        await axios
          .get(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUF}/municipios`
          )
          .then(function (response) {
            setCities(response.data);
            setIsLoading(false);
          });
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }
  };

  const handleChangeSelectState = (event) => {
    setSelectedUF(event.target.value);
    setInputs((values) => ({ ...values, naturalidade: event.target.value }));
  };

  const handleChangeSelectCity = (event) => {
    setSelectedCity(event.target.value);
    setInputs((values) => ({ ...values, cidade: event.target.value }));
  };

  useEffect(() => {
    if (selectedUF) {
      setCities(undefined);
      getCities();
    }
  }, [selectedUF]);

  return (
    <>
      <CustomHeader></CustomHeader>
      <Container>
        <CustomToast
          show={showToast}
          setShow={setShowToast}
          title="Dados Atualizados"
          message="Dados do funcionário atualizados com sucesso!"
        ></CustomToast>
        {(!cities || isLoading) && <Loading></Loading>}
        <Row>
          <Col>
            <LateralMenu></LateralMenu>
          </Col>
          <Col xs={10}>
            <Row className="navigation">
              <Col>
                <BreadcrumbNavigation BreadTitle="Editar Funcionário"></BreadcrumbNavigation>
              </Col>
            </Row>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                      name="nome"
                      value={inputs ? inputs?.nome : ""}
                      onChange={handleChange}
                      type="text"
                      placeholder="Nome Completo"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name="email"
                      value={inputs ? inputs?.email : ""}
                      onChange={handleChange}
                      type="email"
                      placeholder="Email"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Data de Nacimento</Form.Label>
                    <Form.Control
                      name="data_nascimento"
                      value={inputs ? inputs?.data_nascimento : ""}
                      onChange={handleChange}
                      type="date"
                      placeholder="Data de Nascimento"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Celular</Form.Label>
                    <Form.Control
                      name="celular"
                      value={inputs ? inputs?.celular : ""}
                      onChange={handleChange}
                      type="text"
                      placeholder="Celular"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Endereço</Form.Label>
                    <Form.Control
                      name="endereco"
                      value={inputs ? inputs?.endereco : ""}
                      onChange={handleChange}
                      type="text"
                      placeholder="Endereço"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Sexo</Form.Label>
                    <br />
                    <Form.Check
                      inline
                      label="Masculino"
                      id="Masculino"
                      name="sexo"
                      type="radio"
                      checked={inputs && inputs?.sexo === "Masculino"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      label="Feminino"
                      id="Feminino"
                      name="sexo"
                      type="radio"
                      checked={inputs && inputs?.sexo === "Feminino"}
                      onChange={handleChange}
                    />
                    <Form.Check
                      inline
                      name="sexo"
                      label="Outro"
                      id="Outro"
                      type="radio"
                      id={`inline-$"radio"-3`}
                      checked={inputs && inputs?.sexo === "Outro"}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select
                      size="md"
                      onChange={handleChangeSelectState}
                      value={selectedUF}
                    >
                      <option value="">Estado</option>
                      {uf?.map((estado, index) => {
                        return (
                          <option key={index} value={estado.sigla}>
                            {estado.nome}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Cidade</Form.Label>
                    <Form.Select
                      size="md"
                      onChange={handleChangeSelectCity}
                      disabled={!selectedUF}
                      value={selectedCity}
                    >
                      <option value="">Cidade</option>
                      {inputs &&
                        cities?.map((city, index) => {
                          return (
                            <option key={index} value={city.nome}>
                              {city.nome}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="toCenter">
                <Col>
                  <Button onClick={handleSubmit} disabled={!isValidForm}>
                    <Icon.PersonFillCheck size={25} /> Atualizar Funcionário
                  </Button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <Footer></Footer>
    </>
  );
}
