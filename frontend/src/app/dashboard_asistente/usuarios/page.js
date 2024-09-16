'use client'

// React
import { useState, useEffect } from "react";
// Select
import Select from 'react-select';
// Axios
import { handleAxios, handleAxiosMultipart, handleAxiosError, handleAxiosMsg } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row, Form, Modal, Button, Ratio, InputGroup } from 'react-bootstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNinja, faPlaneArrival, faEdit } from "@fortawesome/free-solid-svg-icons";
// DataTable
import DataTable from 'react-data-table-component';

const dataTemproal = [
    { id: 1, usuario: "Juan", Estado: "Activo" },
    { id: 2, usuario: "Pedro", Estado: "Inactivo" }
];

const usuarioTemproal =
    { id: 1, nombre: "Juan", fecha_nac: "12/05/2024", genero: "M", correo: "prueba@gmail.com", telefono: "12345678" };


function ListaUsuarios() {

    // Obtencion de los viajes para el select
    const [viajes, setViajes] = useState([]);
    const obtenerViajes = async () => {
        try {
            /*const response = await handleAxios().get('/cliente/listar');
            const data = response.data;
      
            // Se formatea la data para que pueda almacenarse para utilizarse en un select
            const temporal = data.map(cliente => {
              return {
                label: `${cliente.CUI} - ${cliente.NOMBRE} ${cliente.APELLIDO}`,
                value: cliente.CUI
              }
            });*/
            setViajes(dataTemproal);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    useEffect(() => {
        obtenerViajes();
    }, []);

    const [showUser, setShowUser] = useState(false);
    const [userr, setUser] = useState({});

    const handleCloseUser = () => {
        setUser({});
        setShowUser(false);
    }

    const handleShowUser = (rowUser) => {
        setUser(usuarioTemproal);
        setShowUser(true); // Activa el modal
    }

    const columnas = [
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
            name: 'VIAJES USUARIO',
            cell: row => (
                <>
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faPlaneArrival} />
                    </Button>
                </>
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
                    <Button variant="warning" >
                        <FontAwesomeIcon icon={faEdit} /> Cambiar estado
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
                        data={viajes}
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
                                        defaultValue={userr.nombre}
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