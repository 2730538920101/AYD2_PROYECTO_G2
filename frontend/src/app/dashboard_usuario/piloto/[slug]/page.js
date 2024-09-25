'use client';
import { useParams } from 'next/navigation'
import { Row, Col, Form, InputGroup, Container } from 'react-bootstrap';
import { faUser, faHashtag, faRankingStar, faCar, faPhone, faCamera, faBirthdayCake, faPersonHalfDress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxiosMultipart } from '@/helpers/axiosConfig';
 
export default function Piloto() {
    const params = useParams();
    return(
        <main>

        <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
            <Container>
                <p className="text-center"></p>
                <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(/signin.svg)` }}>
                <Col xs="{12}" className="d-flex align-items-center justify-content-center">
                    <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                        <div className="text-center text-md-center mb-4 mt-md-0">
                            <h3 className="mb-0">Piloto {params.slug}</h3>
                        </div>
                        <Form className="mt-4">
                            <Form.Group className="mb-4">
                                <Form.Label>Nombre Completo</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faUser} />
                                    </InputGroup.Text>
                                    <Form.Control id="nombre" name="nombre" disabled type="text" placeholder="Nombre Apellido" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Teléfono</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faPhone} />
                                    </InputGroup.Text>
                                    <Form.Control id="telefono" name="telefono" disabled type="text" placeholder="(123) 456-7890" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Fotografía</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faCamera} />
                                    </InputGroup.Text>
                                    <Form.Control id="fotografia" name="fotografia" disabled type="text" placeholder="URL de la fotografía" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Edad</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faBirthdayCake} />
                                    </InputGroup.Text>
                                    <Form.Control id="edad" name="edad" disabled type="text" placeholder="30" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Género</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faPersonHalfDress} />
                                    </InputGroup.Text>
                                    <Form.Control id="genero" name="genero" disabled type="text" placeholder="Masculino" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Placa</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faHashtag} />
                                    </InputGroup.Text>
                                    <Form.Control id="placa" name="placa" disabled type="text" placeholder="ABC123DE" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Marca del Vehículo</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faCar} />
                                    </InputGroup.Text>
                                    <Form.Control id="marcaVehiculo" name="marcaVehiculo" disabled type="text" placeholder="Toyota" />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Label>Calificación</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faRankingStar} />
                                    </InputGroup.Text>
                                    <Form.Control id="calificacion" name="calificacion" disabled type="text" placeholder="3.14" />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </div>
            </Col>
            </Row>
            </Container>
        </section>
        </main>
    );
}
