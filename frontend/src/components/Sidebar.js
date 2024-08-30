import React, { useState } from "react";
import SimpleBar from 'simplebar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Nav, Badge, Image, Button, Navbar } from 'react-bootstrap';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = ({ routes }) => {

    const [show, setShow] = useState(false);
    const showClass = show ? "show" : "";
    const pathname = usePathname();
    const router = useRouter();

    const NavItem = (props) => {
        const { title, link, target, icon, image, badgeText, badgeBg = "secondary", badgeColor = "primary" } = props;
        const classNames = badgeText ? "d-flex justify-content-start align-items-center justify-content-between" : "";
        const navItemClassName = link === pathname ? "active" : "";

        return (
            <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
                <Nav.Link target={target} className={classNames} onClick={() => router.push(link)}>
                    <span>
                        {icon ? <span className="sidebar-icon"><FontAwesomeIcon icon={icon} /> </span> : null}
                        {image ? <Image src={image} width={20} height={20} className="sidebar-icon svg-icon" /> : null}

                        <span className="sidebar-text">{title}</span>
                    </span>
                    {badgeText ? (
                        <Badge pill bg={badgeBg} text={badgeColor} className="badge-md notification-count ms-2">{badgeText}</Badge>
                    ) : null}
                </Nav.Link>
            </Nav.Item>
        );
    };

    return (
        <>
            <Navbar expand={false} collapseOnSelect variant="dark" className="navbar-theme-primary px-4 d-md-none">
                <Navbar.Brand className="me-lg-5" >
                </Navbar.Brand>
                <Navbar.Toggle as={Button} aria-controls="main-navbar">
                    <span className="navbar-toggler-icon" />
                </Navbar.Toggle>
            </Navbar>

            <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
                <div className="sidebar-inner px-4 pt-3">
                    <Nav className="flex-column pt-3 pt-md-0">
                        <NavItem title="Qnave" link={"/"} image="/logo.png" />
                        {routes.map((item, index) => (
                            <NavItem key={index} title={item.title} link={item.link} icon={item.icon} />
                        ))}
                    </Nav>
                </div>
            </SimpleBar>

        </>
    );
};

export default Sidebar;