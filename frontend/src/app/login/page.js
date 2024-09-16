'use client';

import { useRouter } from 'next/navigation';
import { crearSession } from '@/helpers/session';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxios } from '@/helpers/axiosConfig';

const MySwal = handleSwal();

const Login = () => {

  const router = useRouter();
  const handleIniciarSesion = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      // const res = await handleAxios().post('/login/auth', formData);
      // MySwal.fire({
      //   title: 'Hecho',
      //   text: "¡Bienvenido!",
      //   icon: 'success'
      // }).then(() => {
      //   if (res.status === 200) {
      //     crearSession(res.data);
      //     router.push("/");
      //   }
      // });
      crearSession({ nombre: 'ASISTENTE', rol: 'ASISTENTE' });
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
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(/signin.svg)` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">

                  <br />
                  <h3 className="mb-0">Inicio de Sesión</h3>
                </div>
                <Form className="mt-4" onSubmit={handleIniciarSesion}>
                  <Form.Group className="mb-4">
                    <Form.Label>Usuario</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control id="nombre" name="nombre" autoFocus required type="text" placeholder="Usuario" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Contraseña</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control id="password" name="password" required type="password" placeholder="Contraseña" />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Iniciar Sesión
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

export default Login;
