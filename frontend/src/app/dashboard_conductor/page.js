'use client'

// React
import { useState, useEffect } from "react";
// Axios
import { handleAxios, handleSwal, handleAxiosError, handleAxiosMultipart } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row, Form, Modal, Button } from 'react-bootstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserNinja, faFlagCheckered, faExchangeAlt, faBan, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
// DataTable
import DataTable from 'react-data-table-component';
import Cookies from 'js-cookie';
import { FindConductor } from '@/helpers/findConductor';

const MySwal = handleSwal();

function DashboardConductor() {
  const [viajes, setViajes] = useState([]);
  const [viajesAceptados, setViajesAceptados] = useState([]); // Estado para los viajes aceptados
  const [showUser, setShowUser] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [userr, setUser] = useState({});
  const [calificacionCliente, setCalificacionCliente] = useState(null);
  const [Conductor, setConductor] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedViajeForRating, setSelectedViajeForRating] = useState(null); // Para almacenar el viaje seleccionado
  const [rating, setRating] = useState(0); // Estado para la calificación

  // Función para obtener los viajes pendientes desde la API
  const obtenerViajes = async () => {
    try {
      const response = await handleAxios().get('viaje/pendientes');
      const data = response.data;

      const viajesFormateados = data.map(viaje => ({
        id: viaje.via_id,
        usuario: viaje.cliente.nombre,
        origen: viaje.origen,
        destino: viaje.destino,
        tarifa: `Q${viaje.total}`,
        fecha_i: viaje.fecha_inicio,
        cliente: viaje.cliente
      }));

      setViajes(viajesFormateados);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Función para obtener los viajes aceptados por el conductor
  const obtenerViajesAceptados = async (conductorId) => {
    try {
      const response = await handleAxios().get(`viaje/conductor/${conductorId}`);
      const data = response.data;

      const viajesAceptados = data
        .filter(viaje => viaje.estado === 'ACEPTADO' || viaje.estado === 'EN CURSO')
        .map(viaje => ({
          id: viaje.via_id,
          origen: viaje.origen,
          destino: viaje.destino,
          tarifa: `Q${viaje.total}`,
          fecha_i: viaje.fecha_inicio,
          estado: viaje.estado // Guardar el estado del viaje
        }));

      setViajesAceptados(viajesAceptados);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Función para obtener la calificación del cliente
  const obtenerCalificacionCliente = async (cliId) => {
    try {
      const response = await handleAxios().get(`clientes?cli_id=${cliId}`);
      const clienteData = response.data[0]; // Suponiendo que la respuesta es un array con un solo elemento
      setCalificacionCliente(clienteData.calificacion); // Guardar la calificación en el estado
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Función para cambiar el estado del viaje
  const cambiarEstadoViaje = async (viajeId, estadoActual) => {
    const nuevoEstado = estadoActual === 'ACEPTADO' ? 'EN CURSO' : 'FINALIZADO';
    if (nuevoEstado === 'EN CURSO') {
      try {
        const response = await handleAxios().put(`viaje/en_curso`, {
          viaje_id: viajeId,
          nuevo_estado: nuevoEstado
        });
        MySwal.fire({
          title: "Viaje",
          text: `Estado cambiado a ${nuevoEstado}`,
          icon: "success",
        });

        obtenerViajesAceptados(Conductor.con_id);
      } catch (error) {
        handleAxiosError(error);
      }
    } else if (nuevoEstado === 'FINALIZADO') {
      try {
        const response = await handleAxios().put(`viaje/finalizar`, {
          viaje_id: viajeId,
          nuevo_estado: nuevoEstado
        });
        MySwal.fire({
          title: "Viaje",
          text: `Estado cambiado a ${nuevoEstado}`,
          icon: "success",
        });

        // Mostrar modal de calificación
        setSelectedViajeForRating(viajeId);
        setShowRatingModal(true);
      } catch (error) {
        handleAxiosError(error);
      }
    }
  };

  // Estado para capturar la razón de cancelación
  const [razonCancelacion, setRazonCancelacion] = useState("");
  const [selectedViajeId, setSelectedViajeId] = useState(null);
  // Función para cancelar un viaje (incluyendo la razón)
  const cancelarViaje = async (viajeId) => {
    try {
      const response = await handleAxios().put('viaje/cancelar', {
        viaje_id: viajeId,
        razon_cancelacion: razonCancelacion // Agregar la razón de cancelación
      });
      MySwal.fire({
        title: "Viaje Cancelado",
        text: `El viaje ha sido cancelado`,
        icon: "warning",
      });

      // Refrescar los datos
      obtenerViajesAceptados(Conductor.con_id);
      setShowCancel(false); // Cerrar el modal de cancelación
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Función para mostrar el modal de cancelación con el ID del viaje
  const handleShowCancel = (row) => {
    if (row.estado === 'EN CURSO') {
      MySwal.fire({
        title: "Viaje En Curso",
        text: `No es posible cancelar`,
        icon: "warning",
      });
      return
    }
    console.log(row)
    setSelectedViajeId(row.id); // Guardar el ID del viaje
    setShowCancel(true);
  };



  const [showModalReport, setShowModalReport] = useState(false);

  // Funciones para manejar la apertura y cierre del modal
  const handleShowReport = () => setShowModalReport(true);
  const handleCloseReport = () => setShowModalReport(false);

  // Función para manejar el envío del formulario
  const handleSubmitModalReport = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('viajeid', e.via_id);
    formData.append('type', "Conductor");
    try {
      console.log("formData", formData)
      let ax = handleAxiosMultipart()
      ax.defaults.baseURL = process.env.NEXT_PUBLIC_NOTIFICATION_PRODUCER_SERVICE;
      console.log(ax.defaults.baseURL)
      const resp = await ax.post('/producer/notify/send', formData)
      console.log(resp)
      MySwal.fire({
        title: "Reporte enviado",
        text: "Tu reporte ha sido enviado",
        icon: "success",
      }).then(() => {
        handleCloseReport();
      });

    } catch (error) {
      console.log(error)
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
    obtenerViajes();
  }, []);

  useEffect(() => {
    if (Conductor) {
      const intervalId = setInterval(() => {
        obtenerViajes();
      }, 3000); // 3 segundos

      // Limpiar el intervalo cuando el componente se desmonte
      return () => clearInterval(intervalId);
    }
  }, [Conductor]); // Solo configurar el intervalo cuando `Cliente` cambia

  // Función para aceptar el viaje
  const aceptarViaje = async (viajeId) => {
    try {
      const conductorId = Conductor.con_id; // Utilizar el ID del conductor real
      const response = await handleAxios().put('viaje/aceptar', {
        viaje_id: viajeId,
        conductor_id: conductorId
      });
      MySwal.fire({
        title: "Viaje",
        text: "Aceptado",
        icon: "success",
      });

      // Refrescar los datos después de aceptar el viaje
      obtenerViajes();
      obtenerViajesAceptados(conductorId);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  // Funciones para mostrar y ocultar el modal de usuario
  const handleCloseUser = () => {
    setUser({});
    setShowUser(false);
  };

  const handleCloseCancel = () => {
    setShowCancel(false);
  };

  const handleShowUser = async (rowUser) => {
    setUser(rowUser.cliente);
    await obtenerCalificacionCliente(rowUser.cliente.cli_id);
    setShowUser(true);
  };

  // Definición de columnas para la tabla de viajes pendientes
  const columnasViajesPendientes = [
    {
      name: 'NOMBRE USUARIO',
      selector: row => row.usuario,
      wrap: true,
    },
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
      name: 'Aceptar Viaje',
      cell: row => (
        <>
          <Button variant="success" onClick={() => aceptarViaje(row.id)}>
            <FontAwesomeIcon icon={faFlagCheckered} /> Aceptar
          </Button>
          &nbsp;
        </>
      )
    },
  ];

  // Definición de columnas para la tabla de viajes aceptados
  const columnasViajesAceptados = [
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
      name: 'ESTADO',
      selector: row => row.estado,
      wrap: true,
    },
    {
      name: 'Cambiar Estado',
      cell: row => (
        <>
          <Button variant="primary" onClick={() => cambiarEstadoViaje(row.id, row.estado)}>
            <FontAwesomeIcon icon={faExchangeAlt} /> Estado
          </Button>
        </>
      )
    },
    {
      name: 'Cancelar',
      cell: row => (
        <>
          <Button variant="warning" onClick={() => handleShowCancel(row)}>
            <FontAwesomeIcon icon={faBan} /> Cancelar
          </Button>
        </>
      )
    },
    {
      name: 'Reportar',
      cell: row => (
        <>
          <Button variant="danger" onClick={handleShowReport}>
            <FontAwesomeIcon icon={faExclamationTriangle} /> Reportar
          </Button>
        </>
      )
    }
  ];

  return (
    <>
      <Row className="gx-3 gy-4">
        <DataTable
          title="Viajes Disponibles"
          columns={columnasViajesPendientes}
          data={viajes}
          pagination
        />
      </Row>

      <Row className="gx-3 gy-4">
        <DataTable
          title="Viajes Activos"
          columns={columnasViajesAceptados}
          data={viajesAceptados}
          pagination
        />
      </Row>

      <Modal show={showRatingModal} onHide={() => setShowRatingModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Calificar al Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label>Selecciona una calificación (0 a 10 estrellas):</Form.Label>
              <Form.Control
                as="select"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))} // Actualiza la calificación seleccionada
              >
                {Array.from({ length: 11 }, (_, i) => (
                  <option key={i} value={i}>{i} ★</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={async () => {
            try {
              // Enviar la calificación al servidor
              await handleAxios().put('viaje/calificar-cliente', {
                viaje_id: selectedViajeForRating,
                calificacion: rating
              });
              MySwal.fire({
                title: "Calificación enviada",
                text: `Has calificado al cliente con ${rating} estrellas`,
                icon: "success",
              });
              setShowRatingModal(false); // Cierra el modal
              obtenerViajesAceptados(Conductor.con_id);
            } catch (error) {
              handleAxiosError(error);
            }
          }}>
            Enviar Calificación
          </Button>
          <Button variant="secondary" onClick={() => setShowRatingModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

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
                    defaultValue={userr.nombre}
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
                    defaultValue={userr.fecha_nacimiento}
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
                    defaultValue={userr.genero}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="CLIENTE_CALIFICACION">Calificación</Form.Label>
                  <Form.Control
                    id="CLIENTE_CALIFICACION"
                    name="CLIENTE_CALIFICACION"
                    type="text"
                    autoComplete='off'
                    defaultValue={calificacionCliente !== null ? calificacionCliente : "Sin calificación"}
                    readOnly
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

      <Modal show={showCancel} size="lg" onHide={handleCloseCancel}>
        <Form onSubmit={(e) => {
          e.preventDefault(); // Evitar el comportamiento predeterminado del formulario
          cancelarViaje(selectedViajeId); // Llamar a la función cancelarViaje con el ID del viaje seleccionado
        }}>
          <Modal.Header closeButton>
            <Modal.Title>Cancelación de Viaje</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="RAZON">Razón de Cancelación</Form.Label>
                  <Form.Control
                    id="razon"
                    name="razon"
                    type="text"
                    placeholder="Razón"
                    autoComplete="off"
                    value={razonCancelacion} // Valor ligado al estado
                    onChange={(e) => setRazonCancelacion(e.target.value)} // Actualizar el estado al escribir
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Cancelar Viaje
            </Button>
            <Button variant="secondary" onClick={handleCloseCancel}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showModalReport} onHide={handleCloseReport}>
        <Modal.Header closeButton>
          <Modal.Title>Reportar un problema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmitModalReport}>
            <Form.Group className="mb-4">
              <Form.Label>Descripción del problema:</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                id="message"
                rows={3}
                placeholder="Ingrese los detalles del problema"
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Imagen Adjunta</Form.Label>
              <Form.Control name="adjunto" id="adjunto" type='file' accept='image/*' required />
            </Form.Group>
            <Button type='submit' variant="primary">
              Reportar Problema
            </Button>
            <Button variant="secondary" onClick={handleCloseReport}>
              Salir
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </>
  );
}

export default DashboardConductor;
