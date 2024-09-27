'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faUser, faCakeCandles,  faIdCard, faPhone, faKey}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleAxiosJWT, handleAxios } from '@/helpers/axiosConfig';
import { FindCliente } from '@/helpers/findCliente';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';


const Viajes = () => {
    const router = useRouter();
    let [Conductores, setConductores] = useState(null);
    useEffect(() => {
        async function fetchData() {
            let cookies = Cookies.get('auth');
            const { nombre } = await JSON.parse(cookies);
            const data = await FindCliente(nombre);
            const conductores = await handleAxios().get(`conductores`);
            console.log(conductores.data)
        }
        fetchData()
    }, [])

    if (!Viajes) return <div>Loading...</div>

    console.log(Viajes)
    return (
<main>
        <Button href='/dashboard_usuario/viajes/pedir_viaje'>Pedir Viaje</Button>
        <h1>Viajes Favoritos</h1>
        <Button>Reportar problema con viaje actual</Button>
</main>
    );
}

export default Viajes;
