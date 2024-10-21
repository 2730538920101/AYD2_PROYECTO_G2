'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faUser, faCakeCandles,  faIdCard, faPhone, faKey}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxiosMultipart, handleAxiosJWT } from '@/helpers/axiosConfig';
import { FindCliente } from '@/helpers/findCliente';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const check = (event) => {
    var input = document.getElementById('contrasenia2');
    if (!input) return
    if (input.defaultValue != document.getElementById('contrasenia').value) {
        input.setCustomValidity('Las contraseñas no son iguales');
    } else {
        input.setCustomValidity('');
    }
}

const MySwal = handleSwal();

const RegisterUser = () => {
    const router = useRouter();
    let [cliente, setCliente] = useState(null);
    useEffect(() => {
        async function fetchData() {
            let cookies = Cookies.get('auth');
            const { nombre } = JSON.parse(cookies);
            const data = await FindCliente(nombre);
            setCliente(data);
        }
        fetchData()
    }, [])

    const handleActualizacionUsuario = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            const res = await handleAxiosJWT().put('clientes', formData);
            console.log(res)
            MySwal.fire({
                title: "Actualización exitosa",
                text: "Bienvenido a la plataforma",
                icon: "success",
            }).then(() => {
                router.push("/");
            });
        } catch (error) {
            console.log(error)
            handleAxiosError(error);
        }
    };

    console.log(cliente)
    if (!cliente) return <div>Loading...</div>
    const date = new Date(Date.parse(cliente.fecha_nacimiento));
    const dateVal = date.toLocaleDateString('en-CA');
    return (
<main>
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
            <p className="text-center"></p>
            <Row className="justify-content-center form-bg-image" >
            <Col xs="{12}" className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                        <h3 className="mb-0">Actualizar datos</h3>
                    </div>
                    <Form className="mt-4" onSubmit={handleActualizacionUsuario}>

                        <Form.Group className="mb-4">
                            <Form.Label>ID</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faIdCard} />
                                </InputGroup.Text>
                                <Form.Control id="cli_id" name="cli_id"  type="text" value={cliente.cli_id} readOnly/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Nombre Completo</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faUser} />
                                </InputGroup.Text>
                                <Form.Control id="nombre" name="nombre" autoFocus  type="text" placeholder="Nombre Apellido" defaultValue={cliente.nombre}/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Fecha de Nacimiento</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faCakeCandles} />
                                </InputGroup.Text>
                                <Form.Control id="fecha_nacimiento" name="fecha_nacimiento"  type="date" defaultValue={dateVal}/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Número Telefónico</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faPhone} />
                                </InputGroup.Text>
                                <Form.Control id="telefono" name="telefono"  type="text" pattern="[1-9][0-9]{7,}" placeholder="88888888" defaultValue={cliente.telefono}/>
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Actualizar
                        </Button>
                    </Form>
                    <Link href="/dashboard_usuario/modificar/change_pass">Cambiar Contraseña</Link>
                </div>
        </Col>
        </Row>
        </Container>
    </section>
</main>
    );
}

export default RegisterUser;
