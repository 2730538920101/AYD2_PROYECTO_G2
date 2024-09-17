'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faUser, faCakeCandles, faPersonHalfDress, faAt, faIdCard, faPhone, faKey, faQuestion, faReply, faFileContract } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxiosMultipart } from '@/helpers/axiosConfig';

const check = (event) => {
    var input = document.getElementById('contrasenia2');
    if (!input) return
    if (input.value != document.getElementById('contrasenia').value) {
        input.setCustomValidity('Las contraseñas no son iguales');
    } else {
        input.setCustomValidity('');
    }
}

const MySwal = handleSwal();

const RegisterUser = () => {

    const router = useRouter();
    const handleActualizacionUsuario = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        /*
        try {
            const res = await handleAxiosMultipart().post('', formData);
            console.log(res)
            MySwal.fire({
                title: "Actualización exitosa",
                text: "Bienvenido a la plataforma",
                icon: "success",
            }).then(() => {
                router.push("/");
            });
        } catch (error) {
            console.log(error)
            handleAxiosError(error);
        }
        */
    };

    return (
<main>
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
            <p className="text-center"></p>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(/signin.svg)` }}>
            <Col xs="{12}" className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                        <h3 className="mb-0">Actualizar datos</h3>
                    </div>
                    <Form className="mt-4" onSubmit={handleActualizacionUsuario}>
                        <Form.Group className="mb-4">
                            <Form.Label>Nombre Completo</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                                <Form.Control id="nombre" name="nombre" autoFocus  type="text" placeholder="Nombre Apellido" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCakeCandles} />
                                </InputGroup.Text>
                                <Form.Control id="fecha_nacimiento" name="fecha_nacimiento"  type="date" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Número Telefónico</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPhone} />
                                </InputGroup.Text>
                                <Form.Control id="telefono" name="telefono"  type="text" pattern="[1-9][0-9]{7,}" placeholder="88888888" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faKey} />
                                </InputGroup.Text>
                                <Form.Control id="contrasenia" name="contrasenia"  onInput={check} type="password" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Repetir Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faKey} />
                                </InputGroup.Text>
                                <Form.Control id="contrasenia2" name="contrasenia2"  onInput={check} type="password" />
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Actualizar
                        </Button>
                    </Form>
                    <a href="/">Regresar</a>
                </div>
        </Col>
        </Row>
        </Container>
    </section>
</main>
    );
}

export default RegisterUser;
