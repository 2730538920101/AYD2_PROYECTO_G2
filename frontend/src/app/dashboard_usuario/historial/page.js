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

    const calificarConductor = async (viaje_id, calificacion_conductor) => {
        try {
            await handleAxios().put(`/viaje/calificar-conductor`, {
                viaje_id: viaje_id,
                calificacion: calificacion_conductor
            });
            setViajes(prevViajes => prevViajes.map(viaje => 
                viaje.via_id === viaje_id ? { ...viaje, calificacion_conductor } : viaje
            ));
        } catch (error) {
            console.error('Error al calificar el conductor:', error);
        }
    };

    const RatingStars = ({ viaje }) => {
        const [hoverRating, setHoverRating] = useState(0);
        const [currentRating, setCurrentRating] = useState(viaje.calificacion_conductor ? viaje.calificacion_conductor  : 0); // Escala de 1-5

        const handleMouseEnter = (rating) => {
            setHoverRating(rating);
        };

        const handleMouseLeave = () => {
            setHoverRating(0);
        };

        const handleClick = (rating) => {
            setCurrentRating(rating);
            calificarConductor(viaje.via_id, rating); // Multiplica por 2 para ajustar la escala 1-10
        };
        // Estilos en línea para las estrellas
        const starStyle = {
            fontSize: '24px',
            color: 'lightgray',
            cursor: 'pointer',
            transition: 'color 0.2s'
        };

        const filledStarStyle = {
            ...starStyle,
            color: 'gold'
        };

        return (
            <div style={{ display: 'inline-flex' }}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9 , 10].map((star) => (
                    <span
                        key={star}
                        style={hoverRating >= star || currentRating >= star ? filledStarStyle : starStyle}
                        onMouseEnter={() => handleMouseEnter(star)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(star)}
                    >
                        ★
                    </span>
                ))}
            </div>
        );
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
                <th>Calificación</th>
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
                    <td>
                        {viaje.estado === 'FINALIZADO' ? (
                            <>
                            <RatingStars viaje={viaje} /> {/* Componente de estrellas */}
                            </>
                        ) : (
                            <>
                            </>
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
