'use client'

// React
import { useState, useEffect } from "react";
// Select
import Select from 'react-select';
// Axios
import { handleAxios, handleAxiosMultipart, handleAxiosError, handleAxiosMsg, handleSwal } from '@/helpers/axiosConfig';
import axios from 'axios'; // Asegúrate de importar Axios
// Bootstrap
import { Col, Row, Form, Modal, Button, Ratio, InputGroup, Image } from 'react-bootstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNinja, faPlaneArrival, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
// DataTable
import DataTable from 'react-data-table-component';

import { useRouter } from 'next/navigation';

const MySwal = handleSwal();

function ListaUsuarios() {

    const router = useRouter();
    // Estado para almacenar los conductores
    const [conductores, setConductores] = useState([]);

    // Función para obtener los conductores de la API
    const obtenerConductores = async () => {
        try {
            const response = await handleAxios().get('clientes');
            const data = response.data;

            // Formatear los datos de la API para que coincidan con las columnas de la tabla
            const conductoresFormateados = data.map(conductor => ({
                id: conductor.cli_id,
                usuario: conductor.nombre,
                Estado: "Activo", // Puedes modificar esto si la API tiene algún campo de estado
                correo: conductor.correo,
                fecha_nac: conductor.fecha_nacimiento,
                genero: conductor.genero,
                telefono: conductor.telefono,
                foto_dpi: conductor.foto_dpi // Añadir foto DPI
            }));

            setConductores(conductoresFormateados);
        } catch (error) {
            console.error("Error al obtener los conductores:", error);
            handleAxiosError(error);
        }
    };

    useEffect(() => {
        obtenerConductores();
    }, []);

    // Función para dar de baja un conductor
    const handleDarDeBaja = async (correo) => {
        try {
            const response = await handleAxios().post('asistentes/block-account', { email: correo });
            MySwal.fire({
                title: "Bloqueo",
                text: "Usuario Bloqueado",
                icon: "success",
            });
            obtenerConductores();
        } catch (error) {
            handleAxiosError(error);
        }
    }

    const [showUser, setShowUser] = useState(false);
    const [userr, setUser] = useState({});

    const handleCloseUser = () => {
        setUser({});
        setShowUser(false);
    };

    const handleShowUser = (rowUser) => {
        setUser(rowUser); // Aquí se pasa el conductor seleccionado al modal
        setShowUser(true); // Activa el modal
    };

    // Función para manejar la redirección al componente de viajes del conductor
    const handleViajesUsuario = (id_usuario) => {
        localStorage.setItem("id", id_usuario);
        router.push(`/dashboard_asistente/ListaViajesCliente`); // Redirigir a la ruta de viajes con el id del conductor
    };

    const columnas = [
        {
            name: 'NOMBRE USUARIO',
            selector: row => row.usuario,
            wrap: true,
        },
        {
            name: 'DETALLE USUARIO',
            cell: row => (
                <Button variant="warning" onClick={() => handleShowUser(row)}>
                    <FontAwesomeIcon icon={faUserNinja} />
                </Button>
            )
        },
        {
            name: 'VIAJES USUARIO',
            cell: row => (
                <Button variant="primary" onClick={() => handleViajesUsuario(row.id)}>
                    <FontAwesomeIcon icon={faPlaneArrival} />
                </Button>
            )
        },
        {
            name: 'ESTADO USUARIO',
            selector: row => row.Estado,
            wrap: true,
        },
        {
            name: 'Acciones',
            cell: row => (
                <>
                    <Button variant="danger" onClick={() => handleDarDeBaja(row.correo)}>
                        <FontAwesomeIcon icon={faDeleteLeft} /> Dar de Baja
                    </Button>
                    &nbsp;
                </>
            )
        },
    ];

    return (
        <>
            <Row className="gx-3 gy-4">
                <Col xs={12} xl={12} className="order-1 order-xl-0">
                    <DataTable
                        title="Lista Usuarios"
                        columns={columnas}
                        data={conductores} // Se usa el estado 'conductores'
                        pagination
                    />
                </Col>
            </Row>

            {/* Modal que se encarga de mostrar al usuario */}
            <Modal show={showUser} size="lg" onHide={handleCloseUser}>
                <Form>
                    <Modal.Header closeButton>
                        <Modal.Title>Información Básica del Usuario</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col xs={12} className="text-center mb-4">
                                <Image
                                    src={userr.foto_dpi}
                                    alt="Foto DPI"
                                    rounded
                                    style={{ width: '150px', height: '150px' }}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_NOMBRE">Nombre</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_NOMBRE"
                                        name="CLIENTE_NOMBRE"
                                        type="text"
                                        placeholder="Nombre"
                                        autoComplete="off"
                                        defaultValue={userr.usuario}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_FECHA">Fecha de Nacimiento</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_FECHA"
                                        name="CLIENTE_FECHA"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={new Date(userr.fecha_nac).toLocaleDateString()}
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
                                        autoComplete="off"
                                        defaultValue={userr.genero === 'M' ? 'Masculino' : 'Femenino'}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_CORREO">Correo</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_CORREO"
                                        name="CLIENTE_CORREO"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.correo}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_TELEFONO">Teléfono</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_TELEFONO"
                                        name="CLIENTE_TELEFONO"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.telefono}
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
        </>
    );
}

export default ListaUsuarios;
