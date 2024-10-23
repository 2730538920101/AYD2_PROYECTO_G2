'use client'

// React
import { useState, useEffect } from "react";
// Axios
import { handleAxios, handleSwal, handleAxiosError, handleAxiosMultipart } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row, Form, Modal, Button, Image } from 'react-bootstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja } from "@fortawesome/free-solid-svg-icons";
// DataTable
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';
import { FindConductor } from '@/helpers/findConductor';

const MySwal = handleSwal();

function Historial() {
  const [viajesAceptados, setViajesAceptados] = useState([]); // Estado para los viajes aceptados
  const [showUser, setShowUser] = useState(false);
  const [userr, setUser] = useState({}); // Información del usuario, incluyendo imagen
  const [Conductor, setConductor] = useState(null);

  // Función para obtener los viajes aceptados por el conductor
  const obtenerViajesAceptados = async (conductorId) => {
    try {
      const response = await handleAxios().get(`viaje/conductor/${conductorId}`);
      const data = response.data;

      const viajesAceptados = data.map(viaje => ({
        id: viaje.via_id,
        cli_id: viaje.cli_id, // Mostrar cli_id
        origen: viaje.origen,
        destino: viaje.destino,
        tarifa: `Q${viaje.total}`,
        fecha_i: viaje.fecha_inicio,
        fecha_fin: viaje.fecha_fin, // Mostrar fecha_fin
        estado: viaje.estado,
        califiacion: viaje.calificacion_cliente // Mostrar el estado del viaje
      }));

      setViajesAceptados(viajesAceptados);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let cookies = Cookies.get('auth');
        if (!cookies) {
          throw new Error("Cookie de autenticación no encontrada");
        }

        const { nombre } = JSON.parse(cookies);
        const conductor = await FindConductor(nombre);

        if (conductor) {
          setConductor(conductor);

          // Obtener los viajes aceptados del conductor
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

  // Función para obtener los detalles del usuario por su id, incluyendo la foto
  const obtenerDetalleUsuario = async (cli_id) => {
    try {
      const response = await handleAxios().get(`clientes?cli_id=${cli_id}`);
      const data = response.data[0];;

      setUser({
        nombre: data.nombre,
        fecha_nacimiento: data.fecha_nacimiento,
        genero: data.genero,
        foto_dpi: data.foto_dpi, // Incluir la URL de la foto del DPI
        calificacion:data.calificacion
      });

      setShowUser(true);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Función para mostrar el modal de usuario con los detalles
  const handleShowUser = (row) => {
    obtenerDetalleUsuario(row.cli_id); // Llamar a la API con el id del cliente
  };

  // Función para cerrar el modal
  const handleCloseUser = () => {
    setUser({});
    setShowUser(false);
  };

  // Definición de columnas para la tabla de viajes aceptados
  const columnasViajesAceptados = [
    {
      name: 'DETALLE USUARIO',
      cell: row => (
        <>
          <Button variant="warning" onClick={() => handleShowUser(row)}>
            <FontAwesomeIcon icon={faUserNinja} />
          </Button>
        </>
      )
    },
    {
      name: 'ID CLIENTE',
      selector: row => row.cli_id, // Mostrar el id del cliente
      wrap: true,
    },
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
      sortable: true,
      wrap: true,
    },
    {
      name: 'FECHA INICIO',
      selector: row => row.fecha_i,
      wrap: true,
    },
    {
      name: 'FECHA FIN',
      selector: row => row.fecha_fin, // Mostrar fecha de finalización del viaje
      wrap: true,
    },
    {
      name: 'ESTADO',
      selector: row => row.estado,
      wrap: true,
    },
    {
      name: 'CALIFICACIÓN',
      selector: row => row.califiacion,
      wrap: true,
    }
  ];

  return (
    <>
      <Row className="gx-3 gy-4">
        <DataTable
          title="Historial de Viajes"
          columns={columnasViajesAceptados}
          data={viajesAceptados}
          pagination
        />
      </Row>

      {/* Modal que se encarga de mostrar al usuario */}
      <Modal show={showUser} size="lg" onHide={handleCloseUser}>
        <Form>
          <Modal.Header closeButton>
            <Modal.Title>Usuario de Viaje</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="CLIENTE_NOMBRE">Nombre</Form.Label>
                  <Form.Control
                    id="CLIENTE_NOMBRE"
                    name="CLIENTE_NOMBRE"
                    type="text"
                    placeholder="Nombre"
                    autoComplete='off'
                    defaultValue={userr.nombre} // Mostrar el nombre del usuario
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="CLIENTE_FECHA">Fecha Nacimiento</Form.Label>
                  <Form.Control
                    id="CLIENTE_FECHA"
                    name="CLIENTE_FECHA"
                    type="text"
                    autoComplete="off"
                    defaultValue={userr.fecha_nacimiento} // Mostrar la fecha de nacimiento del usuario
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="CLIENTE_GENERO">Género</Form.Label>
                  <Form.Control
                    id="CLIENTE_GENERO"
                    name="CLIENTE_GENERO"
                    type="text"
                    autoComplete='off'
                    defaultValue={userr.genero} // Mostrar el género del usuario
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="CLIENTE_CALIFICACION">CALIFIACION</Form.Label>
                  <Form.Control
                    id="CLIENTE_CALIFICACION"
                    name="CLIENTE_CALIFICACION"
                    type="text"
                    autoComplete="off"
                    defaultValue={userr.calificacion} // Mostrar la fecha de nacimiento del usuario
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="CLIENTE_FOTO"></Form.Label>
                  <Image 
                    src={userr.foto_dpi} // Mostrar la imagen del DPI
                    alt="Foto DPI del cliente"
                    fluid 
                    rounded 
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseUser}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default Historial;
