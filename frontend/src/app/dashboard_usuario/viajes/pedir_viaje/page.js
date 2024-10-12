'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faHouse, faLocationDot, faCalendarDays, faMoneyBillWave}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleAxiosJWT, handleAxios, handleSwal } from '@/helpers/axiosConfig';
import { FindCliente } from '@/helpers/findCliente';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Link from 'next/link';


const MySwal = handleSwal();

const Viajes = () => {
    const router = useRouter();
    const [Tarifas, setTarifas] = useState(null);
    const [Cliente, setCliente] = useState(null);
    const [tarifa, setTarifa] = useState(null);
    const [origenSeleccionado, setOrigenSeleccionado] = useState('');
    const [destinoSeleccionado, setDestinoSeleccionado] = useState('');
    useEffect(() => {
        async function fetchData() {
            let cookies = Cookies.get('auth');
            const { nombre } = await JSON.parse(cookies);
            const cliente = await FindCliente(nombre);
            setCliente(cliente);
            const tarifas = await handleAxios().get(`tarifas`);
            const mapa = {};
            tarifas.data.forEach(tarifa => {
                const { origen, destino, monto } = tarifa;
                if (!mapa[origen]) {
                    mapa[origen] = {};
                }
                mapa[origen][destino] = monto;
            });
            setTarifas(mapa);
        }
        fetchData()
    }, [])


    if ((!Cliente) || (!Tarifas)) return <div>Loading...</div>
    console.log(Tarifas)
    const zonasOrigen = Object.keys(Tarifas);
    const zonasDestino = origenSeleccionado ? Object.keys(Tarifas[origenSeleccionado]) : [];
    const handleOrigenChange = (e) => {
        setOrigenSeleccionado(e.target.value);
        setDestinoSeleccionado('');
        setTarifa(null);
    };

    const handleDestinoChange = (e) => {
        setDestinoSeleccionado(e.target.value);
        const tarifaSeleccionada = Tarifas[origenSeleccionado][e.target.value];
        setTarifa(tarifaSeleccionada);
    };

    const handlePedirViaje = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('cli_id', Cliente.cli_id);
        formData.append('estado', 'PENDIENTE');
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
    }

    return (
<main>
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
            <p className="text-center"></p>
            <Row className="justify-content-center form-bg-image" >
            <Col xs="{12}" className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                        <h3 className="mb-0">Petición de viaje</h3>
                    </div>
                    <Form className="mt-4" onSubmit={handlePedirViaje} >
                        <Form.Group className="mb-4">
                            <Form.Label>Origen</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faHouse} />
                                </InputGroup.Text>
                                <Form.Select id="origen" name="origen" value={origenSeleccionado} onChange={handleOrigenChange} required>
                                  <option hidden disabled value="">-- Selecciona el origen --</option>
                                  {zonasOrigen.map(origen => (
                                    <option key={origen} value={origen}>
                                      {origen}
                                    </option>
                                  ))}
                                </Form.Select>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Destino</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </InputGroup.Text>
                                <Form.Select id="destino" name="destino" value={destinoSeleccionado} onChange={handleDestinoChange} disabled={!origenSeleccionado} required>
                                  <option hidden disabled value="">-- Selecciona el destino --</option>
                                  {zonasDestino.map(destino => (
                                    <option key={destino} value={destino}>
                                      {destino}
                                    </option>
                                  ))}
                                </Form.Select>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Fecha</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCalendarDays} />
                                </InputGroup.Text>
                                <Form.Control id="fecha_inicio" name="fecha_inicio"  type="date" defaultValue={new Date().toISOString().split('T')[0]} required/>
                            </InputGroup>
                        </Form.Group>
                        {tarifa && (
                            <Form.Group className="mb-4">
                                <Form.Label>Tarifa</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon icon={faMoneyBillWave} />
                                    </InputGroup.Text>
                                    <Form.Control id="total" name="total"  type="text" value={tarifa} readOnly/>
                                </InputGroup>
                            </Form.Group>
                        )}
                        <Button variant="primary" type="submit" className="w-100">
                            Pedir Viaje
                        </Button>
                    </Form>
                    <Link href="/dashboard_usuario/viajes">Regresar</Link>
                </div>
        </Col>
        </Row>
        </Container>
    </section>
</main>
    );
}

export default Viajes;
