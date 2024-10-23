'use client';

import { useState, useEffect } from 'react';
import {handleAxios} from '@/helpers/axiosConfig';
import { Tabs, Tab, Container } from 'react-bootstrap';
import { ResponsiveSankey } from '@nivo/sankey';  // Importa el gráfico de torta de Nivo

function Reportes() {

    let [Viajes,SetViajes] = useState(null)
    let [Clientes,SetClientes] = useState(null)
    let [Asistentes,SetAsistentes] = useState(null)
    let [Conductores,SetConductores] = useState(null)

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
        }, 60000);  // 60 segundos
        return () => clearInterval(interval);
    }, []);

    // Datos para la gráfica Sankey de "Distribución de Origen/Destino"
    const sankeyData = Viajes ? {
        nodes: [
            ...new Set(Viajes.map(viaje => ({ id: viaje.origen }))),  // Nodos de origen
            ...new Set(Viajes.map(viaje => ({ id: viaje.destino })))  // Nodos de destino
        ],
        links: Viajes.map(viaje => ({
            source: viaje.origen,
            target: viaje.destino,
            value: 1  // Contar un viaje entre origen y destino
        }))
    } : { nodes: [], links: [] };


return (
        <Container>
            <h1>Reportes</h1>
            <Tabs defaultActiveKey="destinos" className="mb-3">
                <Tab eventKey="destinos" title="Distribución de Origen/Destino">
                    {Viajes && (
                        <div style={{ height: '400px' }}>
                            <ResponsiveSankey
                                data={sankeyData}
                                margin={{ top: 40, right: 50, bottom: 100, left: 50 }} // Reduce el margen derecho y aumenta el margen inferior
                                align="justify"
                                colors={{ scheme: 'category10' }}
                                nodeOpacity={1}
                                nodeThickness={18}
                                nodeInnerPadding={3}
                                nodeSpacing={24}
                                nodeBorderWidth={0}
                                linkOpacity={0.5}
                                linkHoverOthersOpacity={0.1}
                                enableLinkGradient={true}
                                label={(node) => node.id}  // Mostrar origen/destino en las etiquetas
                                labelPosition="outside"
                                labelOrientation="horizontal"
                                labelPadding={16}
                                labelTextColor={{ from: 'color', modifiers: [['darker', 1]] }}
                                legends={[
                                    {
                                        anchor: 'bottom',  // Posiciona la leyenda en la parte inferior
                                        direction: 'row',  // Leyenda horizontal
                                        translateY: 50,    // Ajusta la posición vertical de la leyenda
                                        itemWidth: 100,
                                        itemHeight: 14,
                                        itemTextColor: '#999',
                                        symbolSize: 14,
                                        symbolShape: 'circle',
                                    }
                                ]}
                            />
                        </div>
                    )}
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Reportes;
