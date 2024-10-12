'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Button, Container, Card, ListGroup, ListGroupItem, Table, Modal, Form } from 'react-bootstrap';
import { handleAxiosError, handleAxiosJWT, handleAxios, handleSwal, handleAxiosMultipart } from '@/helpers/axiosConfig';
import { FindCliente } from '@/helpers/findCliente';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const MySwal = handleSwal();

const Viajes = () => {
    const router = useRouter();
    let [Favoritos, setFavoritos] = useState(null);
    let [CurrentViaje, setCurrentViaje] = useState(null);
    let [Cliente, setCliente] = useState(null);
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalReport, setShowModalReport] = useState(false);

    const handleShowCancel = () => setShowModalCancel(true);
    const handleCloseCancel = () => setShowModalCancel(false);

    const handleShowReport = () => setShowModalReport(true);
    const handleCloseReport = () => setShowModalReport(false);

    const fetchCurrentViaje = async (cli_id) => {
        try {
            const viajes = await handleAxios().get(`/viaje/cliente/${cli_id}`);
            let foundViaje = null;
            for (let i = 0; i < viajes.data.length; i++) {
                if (viajes.data[i].estado === 'EN CURSO' || viajes.data[i].estado === 'PENDIENTE' || viajes.data[i].estado === 'ACEPTADO') {
                    foundViaje = viajes.data[i];
                    break;
                }
            }
            setCurrentViaje(foundViaje);
        } catch (error) {
            console.error("Error fetching current viaje:", error);
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                let cookies = Cookies.get('auth');
                const { nombre } = await JSON.parse(cookies);
                const data = await FindCliente(nombre);
                setCliente(data);

                await fetchCurrentViaje(data.cli_id);

                const favoritos = await handleAxios().get(`/viaje/frecuentes/${data.cli_id}`);
                setFavoritos(favoritos.data);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (Cliente) {
            const intervalId = setInterval(() => {
                fetchCurrentViaje(Cliente.cli_id);
            }, 3000); // 3 segundos

            // Limpiar el intervalo cuando el componente se desmonte
            return () => clearInterval(intervalId);
        }
    }, [Cliente]); // Solo configurar el intervalo cuando `Cliente` cambia

    const formatearFecha = (fecha) => {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(fecha).toLocaleDateString('es-ES', opciones);
    };
    const pedirViaje = async (viaje) => {
        const formData = new FormData();
        const fechaActual = new Date().toISOString().split('T')[0]; // Obtener fecha actual en formato ISO

        formData.append('origen', viaje.origen);
        formData.append('destino', viaje.destino);
        formData.append('total', viaje.total);
        formData.append('fecha_inicio', fechaActual);
        formData.append('estado', 'PENDIENTE');
        formData.append('cli_id', Cliente.cli_id);

        try {
            const res = await handleAxiosJWT().post('viaje/crear', formData);
            console.log(res)
            MySwal.fire({
                title: "Viaje solicitado",
                text: "Tu viaje ha sido solicitado",
                icon: "success",
            }).then(() => {
                router.push("/dashboard_usuario/viajes");
            });
        } catch (error) {
            console.log(error)
            handleAxiosError(error);
        }

    };

    const handleSubmitModalCancel = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('viaje_id', CurrentViaje.via_id);
        try{
            console.log("formData", formData)
            const resp = await handleAxiosJWT().put('/viaje/cancelar', formData)
            console.log(resp)
            MySwal.fire({
                title: "Viaje cancelado",
                text: "Tu viaje ha sido cancelado",
                icon: "success",
            }).then(() => {
                handleCloseCancel();
            });

        }catch(error){
            console.log(error)
            handleAxiosError(error);
        }
    };

    const handleSubmitModalReport = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('viajeid', CurrentViaje.via_id);
        formData.append('type', "Cliente");
        try{
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

        }catch(error){
            console.log(error)
            handleAxiosError(error);
        }
    };

    if (!Favoritos) return <div>Loading...</div>

    return (
<main>
    <Container>
    <Row className="justify-content-center form-bg-image">
    <Col xs="{12}" className="d-flex align-items-center justify-content-center">
    { CurrentViaje ? (
        <div>
        <Card style={{ width: '40rem' }}>
        <Card.Header>Detalles de tu viaje actual</Card.Header>
        <ListGroup className="list-group-flush">
        <ListGroupItem><strong>Estado del viaje:</strong> {CurrentViaje.estado}</ListGroupItem>
        <ListGroupItem><strong>Origen:</strong> {CurrentViaje.origen}</ListGroupItem>
        <ListGroupItem><strong>Destino:</strong> {CurrentViaje.destino}</ListGroupItem>
        <ListGroupItem>
        <strong>Fecha de inicio:</strong> {formatearFecha(CurrentViaje.fecha_inicio)}
        </ListGroupItem>
        <ListGroupItem><strong>Total del viaje:</strong> Q{CurrentViaje.total}</ListGroupItem>
        {CurrentViaje.conductor_con_id ? (
            <ListGroupItem>
            <strong>Conductor ID: </strong> 
                {CurrentViaje.conductor_con_id}<span> </span>
            <Button size="xs" href={`/dashboard_usuario/piloto/${CurrentViaje.conductor_con_id}`}>Ver</Button>
            </ListGroupItem>
        ) : (
            <ListGroupItem><strong>Conductor:</strong> Aún no asignado</ListGroupItem>
        )}
        </ListGroup>
        <Button onClick={handleShowCancel} >Cancelar viaje actual</Button>
        <Button onClick={handleShowReport} >Reportar un problema</Button>
        </Card>
        </div>
    ) : (
        <Button href='/dashboard_usuario/viajes/pedir_viaje'>Pedir Viaje</Button>
    ) }
    </Col>
    </Row>
    </Container>
    <br></br>

    <Container>
    <Row className="justify-content-center form-bg-image">
    <Col className="d-flex align-items-center justify-content-center">
    <div className="bg-white shadow-soft border rounded border-light " style={{ width: '40rem' }}>
        <div className="text-center text-md-center mb-4 mt-md-0">
        <h3 className="mb-0">Viajes Favoritos</h3>
    </div>
    <Table striped bordered hover responsive>
        <thead>
            <tr class="text-center">
                <th>#</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Total (Q)</th>
                <th>Núm. Viajes</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {Favoritos.map((viaje, index) => (
                <tr className="align-middle text-center">
                    <td>{index + 1}</td>
                    <td>{viaje.origen}</td>
                    <td>{viaje.destino}</td>
                    <td>{viaje.total}</td>
                    <td>{viaje.num_viajes}</td>
                    <td>
                        <Button  size="sm" onClick={() => pedirViaje(viaje)} disabled={CurrentViaje !== null} >
                            Pedir Viaje
                        </Button>
                    </td>
                </tr>
            ))}
        </tbody>
    </Table>
    </div>
    </Col>
    </Row>
    </Container>

    <Modal show={showModalCancel} onHide={handleCloseCancel}>
        <Modal.Header closeButton>
            <Modal.Title>Cancelación de viaje</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmitModalCancel}>
                <Form.Group className="mb-4">
                    <Form.Label>Describa la razón de la cancelación:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="razon_cancelacion"
                        id="razon_cancelacion"
                        rows={3}
                        placeholder="Ingrese los detalles del problema"
                    />
                </Form.Group>
                <Button variant="secondary" onClick={handleCloseCancel}>
                    Salir
                </Button>
                <Button type='submit' variant="primary">
                    Cancelar Viaje
                </Button>
            </Form>
        </Modal.Body>
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
                    <Form.Control name="adjunto" id="adjunto" type='file' accept='image/*' required/>
                </Form.Group>
                <Button variant="secondary" onClick={handleCloseReport}>
                    Salir
                </Button>
                <Button type='submit' variant="primary">
                    Reportar Problema
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
</main>
    );
}

export default Viajes;
