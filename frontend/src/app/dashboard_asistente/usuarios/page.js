'use client'

// React
import { useState, useEffect } from "react";
// Select
import Select from 'react-select';
// Axios
import { handleAxios, handleAxiosMultipart, handleAxiosError, handleAxiosMsg } from '@/helpers/axiosConfig';
import axios from 'axios'; // Asegúrate de importar Axios
// Bootstrap
import { Col, Row, Form, Modal, Button, Ratio, InputGroup } from 'react-bootstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNinja, faPlaneArrival, faEdit } from "@fortawesome/free-solid-svg-icons";
// DataTable
import DataTable from 'react-data-table-component';

function ListaUsuarios() {

    // Estado para almacenar los conductores
    const [conductores, setConductores] = useState([]);

    // Función para obtener los conductores de la API
    const obtenerConductores = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/clientes');
            const data = response.data;

            // Formatear los datos de la API para que coincidan con las columnas de la tabla
            const conductoresFormateados = data.map(conductor => ({
                id: conductor.cli_id,
                usuario: conductor.nombre,
                Estado: "Activo", // Puedes modificar esto si la API tiene algún campo de estado
                correo: conductor.correo,
                fecha_nac: conductor.fecha_nacimiento,
                genero: conductor.genero,
                telefono: conductor.telefono
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
                <Button variant="primary">
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
                <Button variant="warning">
                    <FontAwesomeIcon icon={faEdit} /> Cambiar estado
                </Button>
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
                                        defaultValue={userr.fecha_nac}
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
                                        defaultValue={userr.genero}
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
