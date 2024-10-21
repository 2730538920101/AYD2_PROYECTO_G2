'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faFileShield, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxiosMultipartJWT } from '@/helpers/axiosConfig';
import { crearSession } from '@/helpers/session';
import { getCookie } from '@/helpers/getCookies';


const MySwal = handleSwal();

const LoginAdmin = () => {

    const router = useRouter();
    const {nombre} = getCookie('auth');
    const handleUploadAdmin = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log(formData.get('file').name);
        if (formData.get('file').name != 'clave.ayd') {
            MySwal.fire({
                title: 'Error',
                text: "El nombre de archivo no es correcto",
                icon: 'error'
            });
            crearSession({ nombre: nombre, rol: 'ADMINISTRADOR', auth: false });
            return;
        }
        try {
            const res = await handleAxiosMultipartJWT().post('/administrador/validate-file', formData);
            MySwal.fire({
                title: 'Hecho',
                text: "¡Bienvenido!",
                icon: 'success'
            }).then(() => {
                if (res.status === 200) {
                    crearSession({ nombre: nombre, rol: 'ADMINISTRADOR', auth: true });
                    router.push("/dashboard_administrador");
                }
            });
            router.push("/dashboard_administrador");
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
          <Row className="justify-content-center form-bg-image" >
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <div className="text-center text-md-center mb-4 mt-md-0">

                  <br />
                  <h3 className="mb-0">Inicio de Sesión de Administrador</h3>
                </div>
                <Form className="mt-4" onSubmit={handleUploadAdmin}>
                  <Form.Group className="mb-4">
                      <Form.Label>Usuario</Form.Label>
                          <InputGroup>
                              <InputGroup.Text>
                                  <FontAwesomeIcon icon={faUser} />
                              </InputGroup.Text>
                              <Form.Control type="text" id="usuario" name="usuario" value={nombre} readOnly></Form.Control>
                          </InputGroup>
                  </Form.Group>
                  <Form.Group className="mb-4">
                      <Form.Label>Archivo de autorización</Form.Label>
                          <InputGroup>
                            <InputGroup.Text>
                                <FontAwesomeIcon icon={faFileShield} />
                            </InputGroup.Text>
                            <Form.Control type="file" accept=".ayd" id="file" name="file" required></Form.Control>
                          </InputGroup>
                  </Form.Group>
                    <Button variant="primary" type="submit" className="w-100">
                      Enviar Archivo
                    </Button>
                  </Form>
                <p className="text-left">
                  <br />
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
};

export default LoginAdmin;
