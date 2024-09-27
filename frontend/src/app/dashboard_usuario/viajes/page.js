'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Button, Container, Card, ListGroup, ListGroupItem, Table, Modal, Form } from 'react-bootstrap';
import { faUser, faCakeCandles,  faIdCard, faPhone, faKey}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleAxiosJWT, handleAxios, handleSwal } from '@/helpers/axiosConfig';
import { FindCliente } from '@/helpers/findCliente';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

const MySwal = handleSwal();

const Viajes = () => {
    const router = useRouter();
    let [Favoritos, setFavoritos] = useState(null);
    let [CurrentViaje, setCurrentViaje] = useState(null);
    let [Cliente, setCliente] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [problema, setProblema] = useState('');

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    useEffect(() => {
        async function fetchData() {
            let cookies = Cookies.get('auth');
            const { nombre } = await JSON.parse(cookies);
            const data = await FindCliente(nombre);
            setCliente(data);
            const viajes = await handleAxios().get(`/viaje/cliente/${data.cli_id}`);
            for (let i = 0; i < viajes.data.length; i++) {

                console.log(viajes.data[i],"viaje")
                if (viajes.data[i].estado === 'EN CURSO' || viajes.data[i].estado === 'PENDIENTE') {
                    setCurrentViaje(viajes.data[i])
                    break;
                }
            }
            const favoritos = await handleAxios().get(`/viaje/frecuentes/${data.cli_id}`);
            setFavoritos(favoritos.data)
        }
        fetchData()
    }, [])
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

    const handleSubmitModal = async (e) => {
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
                handleClose();
            });

        }catch(error){
            console.log(error)
            handleAxiosError(error);
        }
    };

    if (!Favoritos) return <div>Loading...</div>

    console.log(Favoritos)
    console.log("-")
    console.log(CurrentViaje)
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
            <ListGroupItem><strong>Conductor ID:</strong> {CurrentViaje.conductor_con_id}</ListGroupItem>
        ) : (
            <ListGroupItem><strong>Conductor:</strong> Aún no asignado</ListGroupItem>
        )}
        </ListGroup>
        <Button onClick={handleShow} >Reportar problema con viaje actual</Button>
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
            <tr>
                <th>#</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Total (Q)</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            {Favoritos.map((viaje, index) => (
                <tr key={viaje.via_id} className="align-middle">
                    <td>{index + 1}</td>
                    <td>{viaje.origen}</td>
                    <td>{viaje.destino}</td>
                    <td>{viaje.total}</td>
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

    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Reportar problema</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={handleSubmitModal}>
                <Form.Group className="mb-4">
                    <Form.Label>Describa el problema:</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="razon_cancelacion"
                        id="razon_cancelacion"
                        rows={3}
                        placeholder="Ingrese los detalles del problema"
                    />
                </Form.Group>
                <Button variant="secondary" onClick={handleClose}>
                    Cancelar
                </Button>
                <Button type='submit' variant="primary">
                    Enviar reporte
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
</main>
    );
}

export default Viajes;
