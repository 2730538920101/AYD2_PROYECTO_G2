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
import { faUserNinja, faFileWord, faEdit, faFilePdf, faFileImage } from "@fortawesome/free-solid-svg-icons";
// DataTable
import DataTable from 'react-data-table-component';

const dataTemproal = [
    { id: 1, usuario: "Juan", origen: "Zona 6", destino: "Zona 7", tarifa: "Q50.00", fecha_i: "8:00", fecha_f: "9:00" }
];

const usuarioTemproal =
    { id: 1, nombre: "Juan", telefono: "12345678", edad: "45", dpi: "123456789", correo: "prueba@gmail.com", placa: "12345678A", marca: "Mazda", anio: "2024", genero: "M", civi: "Soltero", direccion: "Zona 6" };


function DashboardConductor() {

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
            name: 'NOMBRE CONDUCTOR',
            selector: row => row.usuario,
            wrap: true,
        },
        {
            name: 'DETALLE CONDUCTOR',
            cell: row => (
                <>
                    <Button variant="warning" onClick={() => handleShowUser(row)}>
                        <FontAwesomeIcon icon={faUserNinja} />
                    </Button>
                </>
            )
        },
        {
            name: 'CV CONDUCTOR',
            cell: row => (
                <>
                    <Button variant="danger">
                        <FontAwesomeIcon icon={faFilePdf} />
                    </Button>
                </>
            )
        },     
        {
            name: 'FOTOGRAFIA CONDUCTOR',
            cell: row => (
                <>
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faFileImage} />
                    </Button>
                </>
            )
        },        
        {
            name: 'FOTOGRAFIA AUTO',
            cell: row => (
                <>
                    <Button variant="primary">
                        <FontAwesomeIcon icon={faFileImage} />
                    </Button>
                </>
            )
        },
        {
            name: 'Acciones',
            cell: row => (
                <>
                    <Button variant="warning">
                        <FontAwesomeIcon icon={faEdit} /> Cambiar estado
                    </Button>
                </>
            )
        },
    ];

    return (
        <>
            <Row className="gx-3 gy-4">
                <Col xs={12} xl={12} className="order-1 order-xl-0">
                    <DataTable
                        title="Solicitudes de Empleo"
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
                        <Modal.Title>Información del Conductor</Modal.Title>
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

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_EDAD">Edad</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_EDAD"
                                        name="CLIENTE_EDAD"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.edad}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_DPI">DPI</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_DPI"
                                        name="CLIENTE_DPI"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.dpi}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
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
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_PLACA">Placa</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_PLACA"
                                        name="CLIENTE_PLACA"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.placa}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_MARCA">Marca del Vehículo</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_MARCA"
                                        name="CLIENTE_MARCA"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.marca}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_ANIO">Año del Vehículo</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_ANIO"
                                        name="CLIENTE_ANIO"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.anio}
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
                                    <Form.Label htmlFor="CLIENTE_CIVIL">Estado Civil</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_CIVIL"
                                        name="CLIENTE_CIVIL"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.civi}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_DIRECCION">Dirección</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_DIRECCION"
                                        name="CLIENTE_DIRECCION"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.direccion}
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

export default DashboardConductor;