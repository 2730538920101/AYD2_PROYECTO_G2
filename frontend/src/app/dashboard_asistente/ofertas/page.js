'use client'

// React
import { useState } from "react";
// Axios
import { handleAxios, handleSwal, handleAxiosError } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row, Form, Button } from 'react-bootstrap';

const MySwal = handleSwal();

function GenerarOferta() {
    // Estados para los campos del formulario
    const [clienteId, setClienteId] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [credito, setCredito] = useState('');

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación básica
        if (!clienteId || !fechaVencimiento || !credito) {
            MySwal.fire({
                title: "Error",
                text: "Todos los campos son obligatorios",
                icon: "error",
            });
            return;
        }

        // Convertir la fecha al formato correcto YYYY/MM/DD
        const formattedFechaVencimiento = fechaVencimiento.replace(/-/g, '/');

        // Configurar el cuerpo de la solicitud
        const data = {
            cli_id: clienteId,
            fecha_vencimiento: formattedFechaVencimiento,
            credito: parseFloat(credito),
        };

        try {
            // Enviar la solicitud POST a la API
            const response = await handleAxios().post('ofertas', data);
            MySwal.fire({
                title: "Éxito",
                text: "Oferta creada exitosamente",
                icon: "success",
            });

            // Limpiar el formulario después de enviar
            setClienteId('');
            setFechaVencimiento('');
            setCredito('');
        } catch (error) {
            handleAxiosError(error);
        }
    };

    return (
        <>
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h2>Generar Nueva Oferta</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="clienteId">
                            <Form.Label>ID Cliente</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese el ID del cliente"
                                value={clienteId}
                                onChange={(e) => setClienteId(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="fechaVencimiento">
                            <Form.Label>Fecha de Vencimiento</Form.Label>
                            <Form.Control
                                type="date"
                                placeholder="Seleccione la fecha de vencimiento"
                                value={fechaVencimiento}
                                onChange={(e) => setFechaVencimiento(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="credito">
                            <Form.Label>Crédito</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Ingrese el crédito"
                                value={credito}
                                onChange={(e) => setCredito(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Crear Oferta
                        </Button>
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default GenerarOferta;
