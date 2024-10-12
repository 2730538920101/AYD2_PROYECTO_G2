'use client';

import { faFileCsv }  from '@fortawesome/free-solid-svg-icons';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxiosMultipartJWT } from '@/helpers/axiosConfig';

const MySwal = handleSwal();

function UploadTarifas() {

    const handleUploadTariff = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const res = await handleAxiosMultipartJWT().post('/tarifas/actualizar', formData);
            MySwal.fire({
                title: 'Hecho',
                text: "Tarifas Actualizadas",
                icon: 'success'
            });
        } catch (error) {
            handleAxiosError(error);
        }
    }
    return (
<main>
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
            <p className="text-center"></p>
            <Row className="justify-content-center form-bg-image" >
            <Col xs="{12}" className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                        <h3 className="mb-0">Actualizar Tarifas</h3>
                    </div>
                <Form className="mt-4" onSubmit={handleUploadTariff}>
                        <Form.Group className="mb-4">
                            <Form.Label>Archivo</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faFileCsv} />
                                </InputGroup.Text>
                            <Form.Control type="file" accept=".csv" id="file" name="file" required></Form.Control>
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Actualizar Tarifas
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

export default UploadTarifas;
