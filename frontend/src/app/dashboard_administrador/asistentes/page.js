'use client';

import {  Button, Container, Table, Modal } from 'react-bootstrap';
import { handleAxiosError, handleSwal, handleAxios, handleAxiosJWT } from '@/helpers/axiosConfig';
import { useState, useEffect } from 'react';


const MySwal = handleSwal();

const InhabilitateAssistant = () => {
    const [Asistentes, setAsistentes] = useState(null);
    const [selectedAsistente, setSelectedAsistente] = useState(null); // Para el asistente seleccionado en el modal
    const [showModal, setShowModal] = useState(false); // Para manejar el modal

    useEffect(() => {
        async function fetchData() {
            try {
                const asistentes = await handleAxios().get(`asistentes`);
                setAsistentes(asistentes.data);
            } catch (error) {
                console.error('Error fetching asistentes:', error);
            }
        }
        fetchData();
    }, []);

    const handleShowModal = (asistente) => {
        setSelectedAsistente(asistente);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAsistente(null);
    };

    const handleInhabilitate = async (email) => {
        try {
            const res = await handleAxiosJWT().post(`administrador/block-account`, {email});
            MySwal.fire('Inhabilitado', 'El asistente ha sido inhabilitado.', 'success');
            //setAsistentes(Asistentes.filter(asistente => asistente.correo !== email));
        } catch (error) {
            MySwal.fire('Error', 'No se pudo inhabilitar al asistente.', 'error');
        }
    };

    if (!Asistentes) return <div>Loading...</div>;

    return (
        <main>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Número de Cuenta</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Asistentes.map((asistente) => (
                            <tr key={asistente.asistente_id}>
                                <td>{asistente.asistente_id}</td>
                                <td>{asistente.nombre}</td>
                                <td>{asistente.numero_cuenta}</td>
                                <td>
                                    <Button variant="info" onClick={() => handleShowModal(asistente)}>Ver más</Button>{' '}
                                    <Button variant="danger" onClick={() => handleInhabilitate(asistente.correo)}>Inhabilitar</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Modal para mostrar más información */}
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles del Asistente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedAsistente && (
                            <div>
                                <p><strong>ID:</strong> {selectedAsistente.asistente_id}</p>
                                <p><strong>Nombre:</strong> {selectedAsistente.nombre}</p>
                                <p><strong>Número de Cuenta:</strong> {selectedAsistente.numero_cuenta}</p>
                                <p><strong>Correo:</strong> {selectedAsistente.correo}</p>
                                <p><strong>Dirección:</strong> {selectedAsistente.direccion}</p>
                                <p><strong>Estado Civil:</strong> {selectedAsistente.estado_civil}</p>
                                <p><strong>Fecha de Nacimiento:</strong> {selectedAsistente.fecha_nacimiento}</p>
                                <p><strong>Género:</strong> {selectedAsistente.genero}</p>
                                <p><strong>Número de DPI:</strong> {selectedAsistente.numero_dpi}</p>
                                <p><strong>Teléfono:</strong> {selectedAsistente.telefono}</p>
                                <p><strong>Papelería:</strong> <a href={selectedAsistente.papeleria} target="_blank" rel="noopener noreferrer">Ver documento</a></p>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>Cerrar</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </main>
    );
};

export default InhabilitateAssistant;
