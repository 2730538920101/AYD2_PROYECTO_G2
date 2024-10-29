'use client'

// React
import { useState, useEffect } from 'react';
// Axios
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row } from 'react-bootstrap';
// DataTable
import DataTable from 'react-data-table-component';

function ListaViajesCliente() {
    const [viajes, setViajes] = useState([]);
    const [id_cliente, setIdCliente] = useState(null);

    // Función para obtener los viajes del cliente
    const obtenerViajes = async () => {
        try {
            if (id_cliente) {
                const response = await handleAxios().get(`/viaje/cliente/${id_cliente}`);
                setViajes(response.data);
            }
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        setIdCliente(localStorage.getItem("id"));  // Obtener el ID del cliente
        obtenerViajes(); // Obtener los viajes cuando se monte el componente
    }, [id_cliente]);

    const columnas = [
        {
            name: 'Origen',
            selector: row => row.origen,
            wrap: true,
        },
        {
            name: 'Destino',
            selector: row => row.destino,
            wrap: true,
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            wrap: true,
        },
        {
            name: 'Fecha Inicio',
            selector: row => new Date(row.fecha_inicio).toLocaleDateString(),
            wrap: true,
        },
        {
            name: 'Fecha Fin',
            selector: row => row.fecha_fin ? new Date(row.fecha_fin).toLocaleDateString() : 'N/A',
            wrap: true,
        },
        {
            name: 'Total',
            selector: row => `$${row.total}`,
            wrap: true,
        },
        {
            name: 'Calificación Cliente',
            selector: row => row.calificacion_cliente,
            wrap: true,
        },
        {
            name: 'Calificación Conductor',
            selector: row => row.calificacion_conductor,
            wrap: true,
        },
    ];

    return (
        <Row className="gx-3 gy-4">
            <Col xs={12} xl={12} className="order-1 order-xl-0">
                <DataTable
                    title={`Viajes del Cliente ID: ${id_cliente}`}
                    columns={columnas}
                    data={viajes}
                    pagination
                />
            </Col>
        </Row>
    );
}

export default ListaViajesCliente;
