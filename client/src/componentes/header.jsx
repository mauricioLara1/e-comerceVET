import { React, useContext, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas'
import UserModal from './modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';

import login from './iconos/login.svg'
import carrito from './iconos/carrito2.svg';
import inicio from './iconos/inicio.svg'
import calendario from './iconos/calendario.svg'
import facebook from './iconos/facebook.svg'
import instagram from './iconos/instagram.svg'
import whatsapp from './iconos/WhatsApp (2).svg'
import logo from './Logo la merced.png'
import pqrs from './iconos/pqrs2.svg'
import './header.css'
import Stack from 'react-bootstrap/Stack';
import { Link } from 'react-router-dom';
import { ShopContext } from './context-shop/context-shop';

export default function Cabecera() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { getCantidadProductos } = useContext(ShopContext)
    const cantidadProductos = getCantidadProductos()

    return (
        <>
            {['false'].map((expand) => (
                <Navbar key={expand} expand={expand} className="bg-body-tertiary header-bg" sticky='true'>
                    <Container >
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="start"
                            scroll='true'
                            className='offcanvas'>
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    <Navbar.Brand className='header-brand txtWhite' href="#">
                                        <img
                                            alt=""
                                            src={logo}
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top" />{' '}
                                        Menú
                                    </Navbar.Brand>
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className='gap-3'>
                                    <Nav.Item >
                                        <Link className='offcanvas-link' to="/"><img src={inicio} alt='inicio' /> Inicio </Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Link className='offcanvas-link' to="/Agendarcita"><img src={calendario} alt='agendar cita' /> Agenda tu cita</Link>
                                    </Nav.Item>

                                </Nav>

                                <div className='zeldas text-center'>
                                    <hr className='separator' />
                                    <div className='d-flex gap-4'>
                                        <img className='icon-resize' src={facebook} alt='facebook' />
                                        <img src={instagram} alt='instagras' />
                                        <img src={whatsapp} alt='whatsapp' />
                                    </div>
                                    <div className='pt-4 text-white'>Proyecto G V1.0</div>
                                    <div className='text-white'>Derechos reservados 2024</div>
                                </div>


                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                        <Navbar.Brand className='header-brand'>
                            <Link to='/'>
                                <img
                                    alt=""
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top logo" />{' '}
                            </Link>
                        </Navbar.Brand>
                        <Row className='justify-content-center'>
                            <Col>
                                <UserModal />
                            </Col>
                            <Col className='column-cart'>
                                <Link to='/Carrito' >
                                    <div className='div-img position-relative'>
                                        <img src={carrito} alt="carro de compras" /><Badge className='badge' bg="danger">{cantidadProductos}</Badge>
                                    </div>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </Navbar>
            ))}

        </>

    )
}