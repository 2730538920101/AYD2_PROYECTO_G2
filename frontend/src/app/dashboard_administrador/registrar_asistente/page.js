'use client';

import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faUser, faCakeCandles, faPersonHalfDress, faAt, faFile, faPhone, faKey, faMapLocation, faIdCard, faFileContract } from '@fortawesome/free-solid-svg-icons';
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

    const handleRegistroAsistente = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const res = await handleAxiosMultipart().post('asistentes', formData);
            console.log(res)
            MySwal.fire({
                title: "Registro Exitoso",
                text: "Asistente registrado",
                icon: "success",
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
            <p className="text-center"></p>
            <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(/signin.svg)` }}>
            <Col xs="{12}" className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                        <h3 className="mb-0">Registro de Asistentes</h3>
                    </div>
                    <Form className="mt-4" onSubmit={handleRegistroAsistente}>
                        <Form.Group className="mb-4">
                            <Form.Label>Nombre Completo</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                                <Form.Control id="nombre" name="nombre" autoFocus required type="text" placeholder="Nombre Apellido" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Género</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPersonHalfDress} />
                                </InputGroup.Text>
                                <Form.Select id="genero" name="genero" defaultValue={'DEFAULT'} required>
                                    <option hidden disabled value="DEFAULT"></option>
                                    <option value="M">Masculino</option>
                                    <option value="F">Femenino</option>
                                </Form.Select>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Correo Electrónico</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faAt} />
                                </InputGroup.Text>
                                <Form.Control id="correo" name="correo" required type="email" placeholder="direccion@correo.com" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Papelería</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faFile} />
                                </InputGroup.Text>
                                <Form.Control id="papeleria" name="papeleria" required type="file" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Número Telefónico</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPhone} />
                                </InputGroup.Text>
                                <Form.Control id="telefono" name="telefono" required type="text" pattern="[1-9][0-9]{7,}" placeholder="88888888" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faKey} />
                                </InputGroup.Text>
                                <Form.Control id="contrasenia" name="contrasenia" required onInput={check} type="password" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Repetir Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faKey} />
                                </InputGroup.Text>
                                <Form.Control id="contrasenia2" name="contrasenia2" required onInput={check} type="password" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Estado Civil</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faFileContract} />
                                </InputGroup.Text>
                                <Form.Control id="estado_civil" name="estado_civil" required type="text" placeholder="Estado" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCakeCandles} />
                                </InputGroup.Text>
                                <Form.Control id="fecha_nacimiento" name="fecha_nacimiento" required type="date" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Dirección</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faMapLocation} />
                                </InputGroup.Text>
                                <Form.Control id="direccion" name="direccion" required type="text" placeholder="direccion" />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>DPI</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faIdCard} />
                                </InputGroup.Text>
                                <Form.Control id="numero_dpi" name="numero_dpi" required type="text" placeholder="123 av. 8 ca." />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Número de cuenta</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faFileContract} />
                                </InputGroup.Text>
                                <Form.Control id="numero_cuenta" name="numero_cuenta" required type="text" placeholder="7489461741" />
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Registrar
                        </Button>
                    </Form>
                </div>
        </Col>
        </Row>
        </Container>
    </section>
</main>
    );
}

export default RegisterUser;
