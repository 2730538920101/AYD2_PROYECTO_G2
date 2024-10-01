'use client'

// React
import { useState, useEffect } from "react";
// Axios
import { handleAxios, handleAxiosError,handleSwal } from '@/helpers/axiosConfig';
// Bootstrap
import { Col, Row, Form, Modal, Button, Image } from 'react-bootstrap';
// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNinja, faPlaneArrival, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
// DataTable
import DataTable from 'react-data-table-component';

import { useRouter } from 'next/navigation';

const MySwal = handleSwal();

function ListaConductores() {

    const router = useRouter();

    // Estado para almacenar los conductores obtenidos de la API
    const [conductores, setConductores] = useState([]);

    // Estado para el modal
    const [showUser, setShowUser] = useState(false);
    const [userr, setUser] = useState({});

    // Función para obtener los conductores desde la API
    const obtenerConductores = async () => {
        try {
            const response = await handleAxios().get('conductores');
            const data = response.data;
            
            // Mapear la respuesta para ajustarla al formato esperado en la tabla
            const conductoresFormateados = data.map(conductor => ({
                id: conductor.con_id,
                usuario: conductor.nombre,
                Estado: conductor.estado_informacion,
                telefono: conductor.telefono,
                correo: conductor.correo,
                dpi: conductor.numero_dpi,
                placa: conductor.placa,
                marca: conductor.marca_vehiculo,
                anio: conductor.anio,
                genero: conductor.genero,
                civi: conductor.estado_civil,
                direccion: conductor.direccion,
                fotografia: conductor.fotografia,
                papeleria: conductor.papeleria,
                fechaNacimiento: conductor.fecha_nacimiento,  // Fecha de nacimiento
                codigoEmpleado: conductor.codigo_empleado,    // Código de empleado
            }));

            setConductores(conductoresFormateados);
        } catch (error) {
            handleAxiosError(error);
        }
    }

    // Ejecutar la función de obtener conductores al montar el componente
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

    // Funciones para controlar el modal de detalle del conductor
    const handleCloseUser = () => {
        setUser({});
        setShowUser(false);
    }

    const handleShowUser = (rowUser) => {
        setUser(rowUser);
        setShowUser(true);
    }

    // Función para manejar la redirección al componente de viajes del conductor
    const handleViajesConductor = (id_conductor) => {
        localStorage.setItem("id", id_conductor);
        router.push(`/dashboard_asistente/ListaViajesConductor`); // Redirigir a la ruta de viajes con el id del conductor
    };

    // Definición de columnas para la tabla
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
            name: 'VIAJES CONDUCTOR',
            cell: row => (
                <Button variant="primary" onClick={() => handleViajesConductor(row.id)}>
                    <FontAwesomeIcon icon={faPlaneArrival} />
                </Button>
            )
        },
        {
            name: 'ESTADO CONDUCTOR',
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
                        title="Lista Conductores"
                        columns={columnas}
                        data={conductores}
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
                            <Col xs={12} className="text-center mb-3">
                                {/* Mostrar la fotografía del conductor */}
                                <Image src={userr.fotografia} rounded fluid />
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
                        </Row>

                        <Row>
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
                        </Row>

                        <Row>
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

                        <Row>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_FECHA_NACIMIENTO">Fecha de Nacimiento</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_FECHA_NACIMIENTO"
                                        name="CLIENTE_FECHA_NACIMIENTO"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.fechaNacimiento}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_CODIGO_EMPLEADO">Código Empleado</Form.Label>
                                    <Form.Control
                                        id="CLIENTE_CODIGO_EMPLEADO"
                                        name="CLIENTE_CODIGO_EMPLEADO"
                                        type="text"
                                        autoComplete="off"
                                        defaultValue={userr.codigoEmpleado}
                                        readOnly
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Link de papelería */}
                        <Row>
                            <Col xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="CLIENTE_PAPELERIA"></Form.Label>
                                    <a href={userr.papeleria} target="_blank" rel="noopener noreferrer">Descargar CV</a>
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

export default ListaConductores;