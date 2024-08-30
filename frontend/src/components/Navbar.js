import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { Row, Col, Nav, Image, Navbar, Dropdown, Container, ListGroup } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { cerrarSesion, obtenerDatosUsuario } from "@/helpers/session";

export default function NavbarComponent() {

  const router = useRouter();
  const [usuario, setUsuario] = useState(null);
  const [notifications, setNotifications] = useState(null);

  const handleCerrarSesion = () => {
    cerrarSesion();
    window.location.reload();
  };

  const Notification = (props) => {
    const { image, nombre_libro, nombre_autor, cantidad, precio } = props;

    return (
      <ListGroup.Item action className="border-bottom border-light">
        <Row className="align-items-center">
          <Col className="col-auto">
            <Image src={image} className="user-avatar lg-avatar rounded-circle" />
          </Col>
          <Col className="ps-0 ms--2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h4 className="h6 mb-0 text-small">{nombre_libro}</h4>
                <b>{nombre_autor}</b>
              </div>
            </div>
            <p className="font-small mt-1 mb-0">
              <b>Cantidad:</b> {cantidad}<br />
              <b>Precio:</b> {precio}
            </p>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  useEffect(() => {
    // setUsuario(obtenerDatosUsuario());
  }, []);

  return (
    <Navbar variant="dark" expanded className="ps-0 pe-2 pb-0">
      <Container fluid className="px-0">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
          </div>
          <Nav className="align-items-center">

            {usuario && usuario.rol === 'Cliente' && (
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} className="text-dark icon-notifications me-lg-3">
                  <span className="icon icon-sm">
                    <FontAwesomeIcon icon={faCartShopping} className="bell-shake" />
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-center mt-4 py-0">
                  <ListGroup className="list-group-flush">
                    <Nav.Link href="#" className="text-center text-primary fw-bold border-bottom border-light py-3">
                      Carrito
                    </Nav.Link>
                    {notifications && notifications.slice(0, 2).map(n => <Notification key={`notification-${n.id_libro}`} {...n} />)}
                    <Dropdown.Item className="text-center text-primary fw-bold py-3" href="/dashboard_usuario/carrito">
                      Ver detalle {notifications && notifications.length > 2 && `- (${notifications.length - 2} productos más)`}
                    </Dropdown.Item>
                  </ListGroup>
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className="pt-1 px-0 me-lg-3">
                <div className="media d-flex align-items-center">
                  <Image src="/user_icon.png" className="user-avatar md-avatar rounded-circle" />
                  <div className="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                    <span className="mb-0 font-small fw-bold">{usuario ? usuario.nombre : ''}</span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className="user-dropdown dropdown-menu-right mt-3">
                {usuario && usuario.rol === 'Cliente' && (
                  <>
                    <Dropdown.Item className="fw-bold" onClick={() => router.push('/dashboard_usuario/perfil_usuario')} >
                      <FontAwesomeIcon icon={faUserCircle} className="me-2" /> Mi Perfil
                    </Dropdown.Item>
                    <Dropdown.Divider />
                  </>
                )}
                <Dropdown.Item className="fw-bold" onClick={() => handleCerrarSesion()}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="text-danger me-2" /> Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};
