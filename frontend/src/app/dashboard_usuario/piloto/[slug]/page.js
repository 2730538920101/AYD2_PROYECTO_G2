'use client';
import { useParams } from 'next/navigation'
import { Row, Col, Container, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHashtag, faCar, faCarRear, faPhone, faIdCard, faBirthdayCake, faPersonHalfDress, faEnvelope, faRing, faFile, faClipboardQuestion } from '@fortawesome/free-solid-svg-icons';
import { handleAxios } from '@/helpers/axiosConfig';
import { useState, useEffect } from 'react';
 
export default function Piloto() {
    const params = useParams();
    let [Piloto, setPiloto] = useState(null);

    useEffect(() => {
        async function fetchData() {
            console.log(params.slug)
            try{
                const conductor = await handleAxios().get(`/conductores/${params.slug}`);
                setPiloto(conductor.data)
            }catch(e){
                console.log(e)
            }
        }
        fetchData()
    }, [])

    if (!Piloto) return <div>Loading...</div>
    console.log(Piloto)

    return(
<main>
<section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
    <Container>
    <Row className="justify-content-center form-bg-image">
    <Col xs="{12}" className="d-flex align-items-center justify-content-center">
         <Card style={{ width: '40rem', margin: 'auto' }}>
            <Card.Header><strong>Información del Conductor</strong></Card.Header>
            <Card.Body>
                <div className="text-center">
                    <Card.Img variant="top" src={Piloto.fotografia} style={{ width: '200px', borderRadius: '50%' }} />
                </div>
                <Card.Title className="text-center mt-3"><FontAwesomeIcon icon={faUser} /> {Piloto.nombre}</Card.Title>
                <ListGroup className="list-group-flush">
                    <ListGroupItem><FontAwesomeIcon icon={faHashtag} /> <strong>Código Empleado:</strong> {Piloto.codigo_empleado}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faIdCard} /> <strong>DPI:</strong> {Piloto.numero_dpi}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faPhone} /> <strong>Teléfono:</strong> {Piloto.telefono}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faEnvelope} /> <strong>Correo Electrónico:</strong> {Piloto.correo}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faRing} /> <strong>Estado Civil:</strong> {Piloto.estado_civil}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faPersonHalfDress} /> <strong>Género:</strong> {Piloto.genero === 'M' ? 'Masculino' : 'Femenino'}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faBirthdayCake} /> <strong>Fecha de Nacimiento:</strong> {Piloto.fecha_nacimiento}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faCar} /> <strong>Marca del Vehículo:</strong> {Piloto.marca_vehiculo}</ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faCarRear} /> <strong>Placa del Vehículo:</strong> {Piloto.placa}</ListGroupItem>
                    <ListGroupItem>
                        <FontAwesomeIcon icon={faFile} /> <strong>Documentación:</strong> <a href={Piloto.papeleria} target="_blank" rel="noopener noreferrer">Ver Documento</a>
                    </ListGroupItem>
                    <ListGroupItem><FontAwesomeIcon icon={faClipboardQuestion} /> <strong>Estado de Información:</strong> {Piloto.estado_informacion}</ListGroupItem>
                </ListGroup>
            </Card.Body>
        </Card>
    </Col>
    </Row>
    </Container>
</section>
</main>
    );
}
