'use client';

import { useRouter } from 'next/navigation';
import { crearSession } from '@/helpers/session';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faEnvelope, faUnlockAlt, faPhone, faIdCard, faFilePdf, faCamera, faCar, faAddressCard, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxiosMultipart } from '@/helpers/axiosConfig';

const MySwal = handleSwal();

const Registro = () => {

  const router = useRouter();

  const handleRegistro = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Obtener los valores de las contraseñas y fecha de nacimiento
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const fechaNacimiento = formData.get('fechaNacimiento');

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      MySwal.fire({
        title: 'Error',
        text: 'Las contraseñas no coinciden',
        icon: 'error',
      });
      return;
    }

    try {
      const res = await handleAxiosMultipart().post('conductores', formData);
            console.log(res)
            MySwal.fire({
                title: "Registro Exitoso",
                text: "Bienvenido a la plataforma",
                icon: "success",
            }).then(() => {
                router.push("/login");
            });
    } catch (error) {
      console.log(error)
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
                      <Form.Control id="nombre" name="nombre" required type="text" placeholder="Nombre Completo" />
                    </InputGroup>
                  </Form.Group>

                  {/* Fecha de Nacimiento */}
                  <Form.Group className="mb-4">
                    <Form.Label>Fecha de Nacimiento</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCalendar} />
                      </InputGroup.Text>
                      <Form.Control id="fecha_nacimiento" name="fecha_nacimiento" required type="date" />
                    </InputGroup>
                  </Form.Group>

                  {/* Celular */}
                  <Form.Group className="mb-4">
                    <Form.Label>Celular</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhone} />
                      </InputGroup.Text>
                      <Form.Control id="telefono" name="telefono" required type="text" placeholder="Número de Celular" />
                    </InputGroup>
                  </Form.Group>

                  {/* DPI */}
                  <Form.Group className="mb-4">
                    <Form.Label>DPI</Form.Label>
                    <Form.Control id="numero_dpi" name="numero_dpi" required type="text" placeholder="Número de DPI" />
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

                  {/* Contraseña */}
                  <Form.Group className="mb-4">
                    <Form.Label>Contraseña</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control id="contrasenia" name="contrasenia" required type="password" placeholder="Contraseña" />
                    </InputGroup>
                  </Form.Group>

                  {/* Confirmar Contraseña */}
                  <Form.Group className="mb-4">
                    <Form.Label>Confirmar Contraseña</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control id="contrasenia2" name="contrasenia2" required type="password" placeholder="Confirmar Contraseña" />
                    </InputGroup>
                  </Form.Group>

                  {/* CV (Archivo PDF) */}
                  <Form.Group className="mb-4">
                    <Form.Label>CV (Archivo PDF)</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faFilePdf} />
                      </InputGroup.Text>
                      <Form.Control id="papeleria" name="papeleria" required type="file" accept="application/pdf" />
                    </InputGroup>
                  </Form.Group>

                  {/* Fotografía 
                  <Form.Group className="mb-4">
                    <Form.Label>Fotografía</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCamera} />
                      </InputGroup.Text>
                      <Form.Control id="fotografia" name="fotografia" required type="file" accept="image/*" />
                    </InputGroup>
                  </Form.Group>
                  */}
                  {/* Fotografía del Vehículo */}
                  <Form.Group className="mb-4">
                    <Form.Label>Fotografía del Vehículo</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faCar} />
                      </InputGroup.Text>
                      <Form.Control id="fotografia" name="fotografia" required type="file" accept="image/*" />
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
                    <Form.Control id="marca_vehiculo" name="marca_vehiculo" required type="text" placeholder="Marca del Vehículo" />
                  </Form.Group>

                  {/* Año del Vehículo */}
                  <Form.Group className="mb-4">
                    <Form.Label>Año del Vehículo</Form.Label>
                    <Form.Control id="anio" name="anio" required type="number" placeholder="Año del Vehículo" />
                  </Form.Group>

                  {/* Género */}
                  <Form.Group className="mb-4">
                    <Form.Label>Género</Form.Label>
                    <Form.Select id="genero" name="genero" required>
                      <option value="">Seleccionar Género</option>
                      <option value="M">Masculino</option>
                      <option value="F">Femenino</option>
                    </Form.Select>
                  </Form.Group>

                  {/* Estado Civil */}
                  <Form.Group className="mb-4">
                    <Form.Label>Estado Civil</Form.Label>
                    <Form.Select id="estado_civil" name="estado_civil" required>
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

                  {/* Estado Información (campo oculto) */}
                  <Form.Control id="estado_informacion" name="estado_informacion" type="hidden" value="PENDIENTE" />

                  {/* Dirección de Domicilio */}
                  <Form.Group className="mb-4">
                    <Form.Label>Número de Cuenta</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faAddressCard} />
                      </InputGroup.Text>
                      <Form.Control id="numero_cuenta" name="numero_cuenta" required type="text" placeholder="000000" />
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
