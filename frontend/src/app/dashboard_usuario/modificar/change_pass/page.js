'use client';

import { useRouter } from 'next/navigation';
import { Row, Col, Button, Form, InputGroup, Container } from 'react-bootstrap';
import { faKey}  from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleAxiosError, handleSwal, handleAxiosJWT } from '@/helpers/axiosConfig';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { getCookie } from '@/helpers/getCookies';

const MySwal = handleSwal();

const ChangePass = () => {
    const router = useRouter();
    const { nombre } = getCookie('auth');

    const handleActualizacionUsuario = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('email', nombre);
        formData.append('user_type', 'Cliente')
        console.log(formData)
        try {
            const res = await handleAxiosJWT().post('auth/change-password', formData);
            console.log(res)
            MySwal.fire({
                title: "Actualización exitosa",
                text: "Contraseña actualizada",
                icon: "success",
            }).then(() => {
                Cookies.remove('auth');
                router.push("/");
            });
        } catch (error) {
            console.log(error)
            handleAxiosError(error);
        }
    };

    return (
<main>
    <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
            <p className="text-center"></p>
            <Row className="justify-content-center form-bg-image" >
            <Col xs="{12}" className="d-flex align-items-center justify-content-center">
                <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                    <div className="text-center text-md-center mb-4 mt-md-0">
                        <h3 className="mb-0">Actualizar Contraseña</h3>
                    </div>
                    <Form className="mt-4" onSubmit={handleActualizacionUsuario}>
                        <Form.Group className="mb-4">
                            <Form.Label>Antigua Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faKey} />
                                </InputGroup.Text>
                                <Form.Control id="old_password" name="old_password" type="password" required />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Nueva Contraseña</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faKey} />
                                </InputGroup.Text>
                                <Form.Control id="new_password" name="new_password" type="password" required />
                            </InputGroup>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Actualizar
                        </Button>
                    </Form>
                    <Link href="/dashboard_usuario/modificar">Regresar</Link>
                </div>
        </Col>
        </Row>
        </Container>
    </section>
</main>
    );
}

export default ChangePass;
