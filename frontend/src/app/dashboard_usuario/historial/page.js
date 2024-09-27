'use client';

import { Row, Col, Button, Container,Table } from 'react-bootstrap';
import {  handleAxios } from '@/helpers/axiosConfig';
import { FindCliente } from '@/helpers/findCliente';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const Viajes = () => {
    let [Viajes, setViajes] = useState(null);

    useEffect(() => {
        async function fetchData() {
            let cookies = Cookies.get('auth');
            const { nombre } = await JSON.parse(cookies);
            const data = await FindCliente(nombre);
            const viajes = await handleAxios().get(`/viaje/cliente/${data.cli_id}`);
            setViajes(viajes.data)
        }
        fetchData()
    }, [])

    const formatearFecha = (fecha) => {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };

    if (!Viajes) return <div>Loading...</div>

    return (
<main>
    <Container>
    <Row className="justify-content-center form-bg-image">
    <Col className="d-flex align-items-center justify-content-center">
    <div className="bg-white shadow-soft border rounded border-light " style={{ width: '100rem' }}>
        <div className="text-center text-md-center mb-4 mt-md-0">
        <h3 className="mb-0">Historial de viajes</h3>
    </div>
    <Table striped bordered hover responsive>
        <thead>
            <tr>
                <th>#</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Estado</th>
                <th>Fecha de Inicio</th>
                <th>Fecha de Finalización</th>
                <th>Total (Q)</th>
                <th>Conductor</th>
            </tr>
        </thead>
        <tbody>
            {Viajes.map((viaje, index) => (
                <tr key={viaje.via_id} className="align-middle">
                    <td>{index + 1}</td>
                    <td>{viaje.origen}</td>
                    <td>{viaje.destino}</td>
                    <td>{viaje.estado}</td>
                    <td>{formatearFecha(viaje.fecha_inicio)}</td>
                    <td>{formatearFecha(viaje.fecha_fin)}</td>
                    <td>{viaje.total}</td>
                    <td>
                        {viaje.conductor_con_id ? (
                            <>
                                {viaje.conductor_con_id} 
                                <Button 
                                    size="sm" 
                                    variant="primary" 
                                    href={`/dashboard_usuario/piloto/${viaje.conductor_con_id}`}
                                    className="ms-2"
                                >
                                    Ver
                                </Button>
                            </>
                        ) : (
                            'No asignado'
                        )}
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
    </div>
    </Col>
    </Row>
    </Container>
</main>
    );
}

export default Viajes;
