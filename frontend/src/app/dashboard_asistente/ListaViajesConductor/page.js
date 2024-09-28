'use client'

// React
import { useState, useEffect } from 'react';
// Axios
import { handleAxios, handleAxiosError } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row } from 'react-bootstrap';
// DataTable
import DataTable from 'react-data-table-component';

function ListaViajesConductor() {
    const [viajes, setViajes] = useState([]);
    const id_conductor = localStorage.getItem("id");
    // Función para obtener los viajes del conductor
    const obtenerViajes = async () => {
        try {
            const response = await handleAxios().get(`/viaje/conductor/${id_conductor}`);
            setViajes(response.data);
        } catch (error) {
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        obtenerViajes(); // Obtener los viajes cuando se monte el componente
    }, [id_conductor]);

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
    ];

    return (
        <Row className="gx-3 gy-4">
            <Col xs={12} xl={12} className="order-1 order-xl-0">
                <DataTable
                    title={`Viajes del Conductor ID: ${id_conductor}`}
                    columns={columnas}
                    data={viajes}
                    pagination
                />
            </Col>
        </Row>
    );
}

export default ListaViajesConductor;
