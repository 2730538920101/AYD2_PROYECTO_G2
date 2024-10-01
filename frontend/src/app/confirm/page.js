'use client';

import { useRouter } from 'next/navigation';
import { crearSession } from '@/helpers/session';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxios } from '@/helpers/axiosConfig';
import Link from 'next/link';

const MySwal = handleSwal();

const Confirm = () => {

  const router = useRouter();
  const handleConfirmacionDeCuenta = async (e) => {

    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
        const res = await handleAxios().post('/auth/confirm-signup', formData);
        MySwal.fire({
            title: 'Hecho',
            text: "¡Cuenta confirmada!",
            icon: 'success'
        }).then(() => {
            if (res.status === 200) {
                router.push("/");
            }
        })
    }catch(error) {  
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
                  <h3 className="mb-0">Confirmar cuenta</h3>
                </div>
                <Form className="mt-4" onSubmit={handleConfirmacionDeCuenta}>
                  <Form.Group className="mb-4">
                    <Form.Label>Correo electrónico</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control id="email" name="email" autoFocus required type="email" placeholder="mail@mail.com" />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Código de confirmación</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control id="confirmation_code" name="confirmation_code" required type="text" placeholder="Código" />
                      </InputGroup>
                    </Form.Group>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    Confirmar cuenta
                  </Button>
                </Form>
                <p className="text-left">
                  <br />
                  <Link href="/">Regresar</Link>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  );
}

export default Confirm;
