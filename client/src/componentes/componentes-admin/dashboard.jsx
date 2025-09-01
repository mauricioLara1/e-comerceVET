import React, { useEffect, useState, useContext } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import './dashboard.css'
import logo from './Logo la merced.png'
import usuarioLogo from './login.svg'
import { Link, Outlet } from 'react-router-dom'
import { LoginContext } from '../context-login/context-login'
import { Navigate } from 'react-router-dom'


export default function Dashboard() {


    const { authorizeAdmin } = useContext(LoginContext)

    const authAdminState = JSON.parse(localStorage.getItem('authorizationAdmin'))

    const [adminAuthenticated, setAdminAuthenticated] = useState(true)

    const [estiloLogo, setEstiloLogo] = useState("logo-contenido")
    const handleEstiloLogo = () => setEstiloLogo("logo-contenido-escondido")
    const cambioEstilo = estiloLogo

    useEffect(() => {
        document.title = "Admin"

        const loggedAdmin = authorizeAdmin
        if (authorizeAdmin) {
            setAdminAuthenticated(true)
        }
    }, [])

    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    
    const handleLogout = () => {
        sessionStorage.removeItem('usuario');
        setUsuarioAutenticado(null);
        handleClose(); // Cierra el modal

        // Redirige al usuario a la página de inicio
        window.location.href = '/';
    };

    if (!adminAuthenticated) {
        return <Navigate to="/Login" />
    } else {
        return (
            <>
                <Container fluid>
                    <Row>
                        <Col className='columna-navegacion col-3 d-flex flex-column align-items-center bg-custom text-white'>
                            <div className='d-flex flex-column align-items-center sticky-top'>
                                <div className='my-5 text-center usuario'>
                                    <img src={logo} alt='imagen usuario' className='user-img mb-2' />
                                    <div className='user-name'>Bienvenido</div>
                                </div>
                                <Link className='my-4 botonAdmin' to='/Admin/Citas' onClick={handleEstiloLogo}>
                                    <Button className='menu-button'>Citas</Button>
                                </Link>
                                <Link className='my-4 botonAdmin' to='/Admin/Ventas' onClick={handleEstiloLogo}>
                                    <Button className='menu-button'>Ventas</Button>
                                </Link>
                                <Link className='my-4 botonAdmin' to='/Admin/Inventario' onClick={handleEstiloLogo}>
                                    <Button className='menu-button'>Productos Tienda</Button>
                                </Link>
                                <Link className='my-4 botonAdmin' to='/Admin/mostrarProductosPrueba' onClick={handleEstiloLogo}>
                                    <Button className='menu-button'>Inventario intrahospitalario</Button>
                                </Link>
                                <Button variant="danger" onClick={handleLogout} className='mx-2 botonAdmin cerrarsesion'>
                                    Cerrar Sesión
                                </Button>
                            </div>
                        </Col>

                        <Col className='columna-contenido col-9'>
                            {/* <img className={cambioEstilo} src={logo} alt='logo veterinaria la merced' /> */}
                            <Outlet />

                        </Col>
                    </Row>
                </Container>
            </>
        )
    }


}
