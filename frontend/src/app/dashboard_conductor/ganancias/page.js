'use client'

// React
import { useState, useEffect } from "react";
// Axios
import { handleAxios, handleSwal, handleAxiosError } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
// DataTable
import DataTable from 'react-data-table-component';
// Chart.js
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Cookies from 'js-cookie';
import { FindConductor } from '@/helpers/findConductor';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ReporteGanancias() {
  const [viajesAceptados, setViajesAceptados] = useState([]);
  const [ganancias, setGanancias] = useState(0);
  const [chartData, setChartData] = useState(null);

  // Función para obtener los viajes aceptados y calcular las ganancias
  const obtenerViajesAceptados = async (conductorId) => {
    try {
      const response = await handleAxios().get(`viaje/conductor/${conductorId}`);
      const data = response.data;

      const viajesAceptados = data.filter(viaje => viaje.estado === 'FINALIZADO').map(viaje => ({
        id: viaje.via_id,
        origen: viaje.origen,
        destino: viaje.destino,
        tarifa: `Q${viaje.total}`,
        ganancia: (viaje.total * 0.9).toFixed(2), // Calcular ganancia (TARIFA * 0.9)
        fecha_i: viaje.fecha_inicio
      }));

      // Calcular el total de ganancias
      const totalGanancias = viajesAceptados.reduce((acc, viaje) => acc + parseFloat(viaje.ganancia), 0);
      console.log(totalGanancias);
      setGanancias(totalGanancias.toFixed(2));
      setViajesAceptados(viajesAceptados);

      // Preparar datos para el gráfico
      const labels = viajesAceptados.map(viaje => viaje.fecha_i);
      const gananciasData = viajesAceptados.map(viaje => parseFloat(viaje.ganancia));

      setChartData({
        labels,
        datasets: [
          {
            label: 'Ganancia por Viaje (Q)',
            data: gananciasData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      });

    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const cookies = Cookies.get('auth');
        if (!cookies) {
          throw new Error("Cookie de autenticación no encontrada");
        }

        const { nombre } = JSON.parse(cookies);
        const conductor = await FindConductor(nombre);

        if (conductor) {
          obtenerViajesAceptados(conductor.con_id);
        } else {
          throw new Error("Conductor no encontrado");
        }
      } catch (error) {
        console.error("Error al obtener el conductor:", error);
      }
    }

    fetchData();
  }, []);

  // Definición de columnas para la tabla de ganancias
  const columnasGanancias = [
    {
      name: 'ORIGEN',
      selector: row => row.origen,
      wrap: true,
    },
    {
      name: 'DESTINO',
      selector: row => row.destino,
      wrap: true,
    },
    {
      name: 'TARIFA',
      selector: row => row.tarifa,
      wrap: true,
    },
    {
      name: 'GANANCIA',
      selector: row => `Q${row.ganancia}`,
      wrap: true,
    },
    {
      name: 'FECHA INICIO',
      selector: row => row.fecha_i,
      wrap: true,
    }
  ];

  return (
    <>
      <Row className="gx-3 gy-4">
        <Col xs={12}>
          <h2>Reporte de Ganancias</h2>
          <h4>Total de Ganancias: Q{ganancias}</h4>
        </Col>
        <Col xs={12}>
          <DataTable
            title="Detalle de Ganancias por Viaje"
            columns={columnasGanancias}
            data={viajesAceptados}
            pagination
          />
        </Col>
        <Col xs={12}>
          <h3>Gráfica de Ganancias</h3>
          {chartData ? (
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: 'top' },
                  title: { display: true, text: 'Ganancias por Fecha de Inicio' }
                }
              }}
            />
          ) : (
            <p>Cargando datos para la gráfica...</p>
          )}
        </Col>
      </Row>
    </>
  );
}

export default ReporteGanancias;
