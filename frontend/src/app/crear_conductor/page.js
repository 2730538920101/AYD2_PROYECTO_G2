'use client';

import { useRouter } from 'next/navigation';
import { crearSession } from '@/helpers/session';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faEnvelope, faUnlockAlt, faPhone, faIdCard, faFilePdf, faCamera, faCar, faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxios } from '@/helpers/axiosConfig';

const MySwal = handleSwal();

const Registro = () => {

  const router = useRouter();
  
  const handleRegistro = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      // Aquí harías la llamada a tu API para registrar al usuario
      // const res = await handleAxios().post('/registro', formData);
      // MySwal.fire({
      //   title: 'Registro Completo',
      //   text: "¡Registro exitoso!",
      //   icon: 'success'
      // }).then(() => {
      //   if (res.status === 200) {
      //     crearSession(res.data);
      //     router.push("/dashboard");
      //   }
      // });
      router.push("/");
    } catch (error) {
      handleAxiosError(error);
    }
  };

  return (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
          <p className="text-center">
            <br /><br />
          </p>
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(/register.svg)` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <br />
                  <h3 className="mb-0">Solicitud Conductor</h3>
                </div>
                <Form className="mt-4" onSubmit={handleRegistro}>
                  {/* Nombre Completo */}
                  <Form.Group className="mb-4">
                    <Form.Label>Nombre Completo</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faIdCard} />
                      </InputGroup.Text>
                      <Form.Control id="nombreCompleto" name="nombreCompleto" required type="text" placeholder="Nombre Completo" />
                    </InputGroup>
                  </Form.Group>

                  {/* Celular */}
                  <Form.Group className="mb-4">
                    <Form.Label>Celular</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhone} />
                      </InputGroup.Text>
                      <Form.Control id="celular" name="celular" required type="text" placeholder="Número de Celular" />
                    </InputGroup>
                  </Form.Group>

                  {/* Edad */}
                  <Form.Group className="mb-4">
                    <Form.Label>Edad</Form.Label>
                    <Form.Control id="edad" name="edad" required type="number" placeholder="Edad" />
                  </Form.Group>

                  {/* DPI */}
                  <Form.Group className="mb-4">
                    <Form.Label>DPI</Form.Label>
                    <Form.Control id="dpi" name="dpi" required type="text" placeholder="Número de DPI" />
                  </Form.Group>

                  {/* Correo */}
                  <Form.Group className="mb-4">
                    <Form.Label>Correo Electrónico</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control id="correo" name="correo" required type="email" placeholder="Correo Electrónico" />
                    </InputGroup>
                  </Form.Group>

                  {/* CV (Archivo PDF) */}
                  <Form.Group className="mb-4">
                    <Form.Label>CV (Archivo PDF)</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFilePdf} />
                      </InputGroup.Text>
                      <Form.Control id="cv" name="cv" required type="file" accept="application/pdf" />
                    </InputGroup>
                  </Form.Group>

                  {/* Fotografía */}
                  <Form.Group className="mb-4">
                    <Form.Label>Fotografía</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCamera} />
                      </InputGroup.Text>
                      <Form.Control id="fotografia" name="fotografia" required type="file" accept="image/*" />
                    </InputGroup>
                  </Form.Group>

                  {/* Fotografía del Vehículo */}
                  <Form.Group className="mb-4">
                    <Form.Label>Fotografía del Vehículo</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCar} />
                      </InputGroup.Text>
                      <Form.Control id="fotoVehiculo" name="fotoVehiculo" required type="file" accept="image/*" />
                    </InputGroup>
                  </Form.Group>

                  {/* Número de Placa */}
                  <Form.Group className="mb-4">
                    <Form.Label>Número de Placa</Form.Label>
                    <Form.Control id="placa" name="placa" required type="text" placeholder="Número de Placa" />
                  </Form.Group>

                  {/* Marca de Vehículo */}
                  <Form.Group className="mb-4">
                    <Form.Label>Marca del Vehículo</Form.Label>
                    <Form.Control id="marcaVehiculo" name="marcaVehiculo" required type="text" placeholder="Marca del Vehículo" />
                  </Form.Group>

                  {/* Año del Vehículo */}
                  <Form.Group className="mb-4">
                    <Form.Label>Año del Vehículo</Form.Label>
                    <Form.Control id="anioVehiculo" name="anioVehiculo" required type="number" placeholder="Año del Vehículo" />
                  </Form.Group>

                  {/* Género */}
                  <Form.Group className="mb-4">
                    <Form.Label>Género</Form.Label>
                    <Form.Select id="genero" name="genero" required>
                      <option value="">Seleccionar Género</option>
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                      <option value="otro">Otro</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Estado Civil */}
                  <Form.Group className="mb-4">
                    <Form.Label>Estado Civil</Form.Label>
                    <Form.Select id="estadoCivil" name="estadoCivil" required>
                      <option value="">Seleccionar Estado Civil</option>
                      <option value="soltero">Soltero</option>
                      <option value="casado">Casado</option>
                      <option value="divorciado">Divorciado</option>
                      <option value="viudo">Viudo</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Dirección de Domicilio */}
                  <Form.Group className="mb-4">
                    <Form.Label>Dirección de Domicilio</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faAddressCard} />
                      </InputGroup.Text>
                      <Form.Control id="direccion" name="direccion" required type="text" placeholder="Dirección de Domicilio" />
                    </InputGroup>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100">
                    Solicitar
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default Registro;
