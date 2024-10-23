'use client';

import { useState, useEffect } from 'react';
import { handleAxios } from '@/helpers/axiosConfig';
import { Tabs, Tab, Container, Table } from 'react-bootstrap';
import { ResponsiveSankey } from '@nivo/sankey';
import { ResponsivePie } from '@nivo/pie';

function Reportes() {

    const [Viajes, SetViajes] = useState(null);
    const [Clientes, SetClientes] = useState(null);
    const [Asistentes, SetAsistentes] = useState(null);
    const [Conductores, SetConductores] = useState(null);

    const fetchData = async () => {
        try {
            const viajesResponse = await handleAxios().get(`/viaje/`);
            const clientesResponse = await handleAxios().get(`/clientes/`);
            const asistentesResponse = await handleAxios().get(`/asistentes/`);
            const conductoresResponse = await handleAxios().get(`/conductores/`);

            SetViajes(viajesResponse.data);
            SetClientes(clientesResponse.data);
            SetAsistentes(asistentesResponse.data);
            SetConductores(conductoresResponse.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 60000);  // Actualiza cada 60 segundos
        return () => clearInterval(interval);
    }, []);

    const sankeyData = Viajes ? {
        nodes: [
            ...new Set(Viajes.map(viaje => ({ id: viaje.origen }))),
            ...new Set(Viajes.map(viaje => ({ id: viaje.destino })))
        ],
        links: Viajes.map(viaje => ({
            source: viaje.origen,
            target: viaje.destino,
            value: 1
        }))
    } : { nodes: [], links: [] };

    const obtenerNombreCliente = (cli_id) => {
        const cliente = Clientes?.find(cliente => cliente.cli_id === cli_id);
        return cliente ? cliente.nombre : 'Desconocido';
    };

    const obtenerNombreConductor = (con_id) => {
        const conductor = Conductores?.find(conductor => conductor.con_id === con_id);
        return conductor ? conductor.nombre : 'Desconocido';
    };

    const calcularPromedios = (entidades, calificacionKey) => {
        return Viajes?.reduce((acc, viaje) => {
            const { [entidades]: id, [calificacionKey]: calificacion } = viaje;
            if (calificacion != null) {
                if (!acc[id]) acc[id] = { total: 0, count: 0 };
                acc[id].total += calificacion;
                acc[id].count += 1;
            }
            return acc;
        }, {}) || {};
    };

    const promediosClientes = Object.entries(calcularPromedios("cli_id", "calificacion_cliente")).map(([id, { total, count }]) => ({
        nombre: obtenerNombreCliente(parseInt(id)),
        promedio: (total / count).toFixed(2)
    }));

    const promediosConductores = Object.entries(calcularPromedios("conductor_con_id", "calificacion_conductor")).map(([id, { total, count }]) => ({
        nombre: obtenerNombreConductor(parseInt(id)),
        promedio: (total / count).toFixed(2)
    }));

    const calcularDistribucionEstados = () => {
        return Viajes?.reduce((acc, { estado }) => {
            if (!acc[estado]) acc[estado] = 0;
            acc[estado] += 1;
            return acc;
        }, {}) || {};
    };

    const dataPieChart = Object.entries(calcularDistribucionEstados()).map(([estado, count]) => ({
        id: estado,
        label: estado,
        value: count
    }));

    const calcularDistribucionUsuarios = () => {
        const cantidadClientes = Clientes?.length || 0;
        const cantidadConductores = Conductores?.length || 0;
        const cantidadAsistentes = Asistentes?.length || 0;

        return [
            { id: 'Clientes', label: 'Clientes', value: cantidadClientes },
            { id: 'Conductores', label: 'Conductores', value: cantidadConductores },
            { id: 'Asistentes', label: 'Asistentes', value: cantidadAsistentes }
        ];
    };

    const dataPieChart2 = calcularDistribucionUsuarios();

    return (
        <Container>
            <h1>Reportes</h1>
            <Tabs defaultActiveKey="destinos" className="mb-3">
                <Tab eventKey="destinos" title="Distribución de Origen/Destino">
                    {Viajes && (
                        <div style={{ height: '400px' }}>
                            <ResponsiveSankey
                                data={sankeyData}
                                margin={{ top: 40, right: 50, bottom: 100, left: 50 }}
                                align="justify"
                                colors={{ scheme: 'category10' }}
                                nodeOpacity={1}
                                nodeThickness={18}
                                nodeInnerPadding={3}
                                nodeSpacing={24}
                                linkOpacity={0.5}
                                linkHoverOthersOpacity={0.1}
                                enableLinkGradient={true}
                                label={(node) => node.id}
                                legends={[
                                    {
                                        anchor: 'bottom',
                                        direction: 'row',
                                        translateY: 50,
                                        itemWidth: 100,
                                        itemHeight: 14,
                                        symbolSize: 14,
                                        symbolShape: 'circle',
                                    }
                                ]}
                            />
                        </div>
                    )}
                </Tab>
                <Tab eventKey="calificaciones" title="Calificaciones de Clientes y Conductores">
                    <h2>Promedios de Calificaciones por Clientes</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Calificación Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promediosClientes.map(({ nombre, promedio }, index) => (
                                <tr key={index}>
                                    <td>{nombre}</td>
                                    <td>{promedio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <h2>Promedios de Calificaciones por Conductores</h2>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Conductor</th>
                                <th>Calificación Promedio</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promediosConductores.map(({ nombre, promedio }, index) => (
                                <tr key={index}>
                                    <td>{nombre}</td>
                                    <td>{promedio}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
                <Tab eventKey="stat_uso" title="Estadísticas de uso">
                    <div style={{ height: '500px' }}>
                        <ResponsivePie
                            data={dataPieChart}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            colors={{ scheme: 'nivo' }}
                            arcLinkLabelsTextColor="#333333"
                            arcLabelsTextColor={{
                                from: 'color',
                                modifiers: [['darker', 2]]
                            }}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    translateY: 56,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    symbolSize: 18,
                                }
                            ]}
                        />
                    </div>
                </Tab>
                <Tab eventKey="stat_registro" title="Estadísticas de Registro">
                    <div style={{ height: '500px' }}>
                        <ResponsivePie
                            data={dataPieChart2}
                            margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                            innerRadius={0.5}
                            padAngle={0.7}
                            cornerRadius={3}
                            activeOuterRadiusOffset={8}
                            colors={{ scheme: 'nivo' }}
                            arcLinkLabelsTextColor="#333333"
                            arcLabelsTextColor={{
                                from: 'color',
                                modifiers: [['darker', 2]]
                            }}
                            legends={[
                                {
                                    anchor: 'bottom',
                                    direction: 'row',
                                    translateY: 56,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    symbolSize: 18,
                                }
                            ]}
                        />
                    </div>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Reportes;
