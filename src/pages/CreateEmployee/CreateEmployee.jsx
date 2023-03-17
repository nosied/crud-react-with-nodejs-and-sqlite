import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { LateralMenu } from "../../components/LateralMenu/LateralMenu";
import { BreadcrumbNavigation } from "../../components/BreadcrumbNavigation/BreadcrumbNavigation";
import { phoneMask } from "../ListEmployee/ListEmployee";
import * as Icon from "react-bootstrap-icons";
import { Loading } from "../../components/Loading/Loading";
import { CustomToast } from "../../components/CustomToast/CustomToast";
import { CustomHeader } from "../../components/CustomHeader/CustomHeader";
import { Footer } from "../../components/Footer/Footer";
import { constants } from "../../constants/constants";

export default function Employee() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUF, setSelectedUF] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [uf, setUf] = useState(undefined);
  const [cities, setCities] = useState(undefined);
  const [inputs, setInputs] = useState([]);
  const [isValidForm, setIsValidForm] = useState(false);

  const handleChangeInput = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "celular") value = phoneMask(event.target.value);
    if (name === "sexo") value = event.target.id;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    try {
      event.preventDefault();
      if (isValidForm) {
        setIsLoading(true);
        axios
          .post(`${constants.defaultUrl}/cadastro`, inputs)
          .then(function (response) {
            setTimeout(() => {
              setIsLoading(false);
              setShowToast(true);
            }, 500);
          });
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
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

  useEffect(() => {
    getStates();
  }, []);

  useEffect(() => {
    if (selectedUF) {
      setCities(undefined);
      setInputs((values) => ({ ...values, cidade: null }));
      getCities();
    }
  }, [selectedUF]);
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

  const handleChangeSelectState = (event) => {
    setSelectedUF(event.target.value);
    setInputs((values) => ({ ...values, naturalidade: event.target.value }));
  };

  const handleChangeSelectCity = (event) => {
    setInputs((values) => ({ ...values, cidade: event.target.value }));
  };
  return (
    <>
      <CustomHeader></CustomHeader>
      <Container>
        <CustomToast
          show={showToast}
          setShow={setShowToast}
          title="Dados Cadastrados"
          message="Dados do funcionário cadastrado com sucesso!"
        ></CustomToast>
        {isLoading && <Loading></Loading>}
        <Row>
          <Col>
            <LateralMenu></LateralMenu>
          </Col>
          <Col xs={10}>
            <Row className="navigation">
              <Col>
                <BreadcrumbNavigation BreadTitle="Cadastrar Funcionário"></BreadcrumbNavigation>
              </Col>
            </Row>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nome Completo</Form.Label>
                    <Form.Control
                      name="nome"
                      value={inputs && inputs?.nome}
                      onChange={handleChangeInput}
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
                      value={inputs && inputs?.email}
                      onChange={handleChangeInput}
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
                      value={inputs && inputs?.data_nascimento}
                      onChange={handleChangeInput}
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
                      value={inputs && inputs?.celular}
                      onChange={handleChangeInput}
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
                      value={inputs && inputs?.endereco}
                      onChange={handleChangeInput}
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
                      i
                      checked={inputs && inputs?.sexo === "Masculino"}
                      onChange={handleChangeInput}
                    />
                    <Form.Check
                      inline
                      label="Feminino"
                      id="Feminino"
                      name="sexo"
                      type="radio"
                      checked={inputs && inputs?.sexo === "Feminino"}
                      onChange={handleChangeInput}
                    />
                    <Form.Check
                      inline
                      name="sexo"
                      label="Outro"
                      id="Outro"
                      type="radio"
                      checked={inputs && inputs?.sexo === "Outro"}
                      onChange={handleChangeInput}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Estado</Form.Label>
                    <Form.Select size="md" onChange={handleChangeSelectState}>
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
                    >
                      <option>Cidade</option>
                      {cities?.map((city, index) => {
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
                    <Icon.PersonFillAdd size={25} /> Cadastrar Funcionário
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
