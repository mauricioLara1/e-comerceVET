import React, { useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Navbar from "react-bootstrap/Navbar";
import Tabs from 'react-bootstrap/Tabs';
import Image from 'react-bootstrap/Image';
import fotoUsario from "./imagenes/fotoPerfil.jpg"
import fotoPerro from "./imagenes/perroPerfil.jpg"
import Stack from 'react-bootstrap/Stack';
import UserModal from './modal';
import { Link } from 'react-router-dom';
import inicio from "./iconos/inicio.svg"
import calendario from './iconos/calendario.svg'
import facebook from './iconos/facebook.svg'
import instagram from './iconos/instagram.svg'
import whatsapp from './iconos/whatsapp.svg'
import pqrs from './iconos/pqrs2.svg'
import logo from './Logo la merced.png'
import success from './iconos/success.svg'
import carrito from './iconos/carrito2.svg';
import Cabecera from "./header";
import dogIcon from "./iconos/dogIcon.jpg"
import profileImg from "./iconos/profileImg.jpg"
import './EditarPerfil.css'

import { LoginContext } from './context-login/context-login';
import { Navigate } from "react-router-dom";




export default function EditarPerfil() {
    const [show, setShow] = useState(false);


    const { authorize, user, handleAuth } = useContext(LoginContext)

    const authState = JSON.parse(localStorage.getItem('authorization'))
    const loggedUser = JSON.parse(localStorage.getItem('User'))

    const [authenticated, setAuthenticated] = useState(authState)

    useEffect(() => {

        document.title = "Mi Perfil"

        const logged = authorize
        if (authorize) {
            setAuthenticated(true)
        }
    }, [])

    if (!authenticated) {
        return <Navigate to="/Login" />
    } else {
        return (

            <>
                <Cabecera />

                <div className="div-accesos ">
                    <Tabs
                        defaultActiveKey="profile"
                        id="justify-tab-example"
                        className="mb-3"
                        justify
                    >

                        <Tab eventKey="profile" title="Perfil">
                            <div className="div-usuario">
                                <div className="div-imagenUsuario">
                                    <Image src={profileImg} roundedCircle width={300} />
                                </div>

                                <h3 style={{ textAlign: "center" }}>{loggedUser.name} {loggedUser.surname}</h3>



                                <div className="div-editarUsuario d-flex justify-content-center align-items-center text-center">

                                    <Form>
                                        <Row className="mb-5">
                                            <h3>Datos Personales</h3>
                                            <Form.Group as={Col}>
                                                <Form.Control value={loggedUser.name} disabled/>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control value={loggedUser.surname} disabled/>
                                            </Form.Group>

                                        </Row>
                                        <Row className="mb-5">
                                            <Form.Group as={Col} >
                                                <Form.Control value={loggedUser.phone} disabled/>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control value={loggedUser.Nuip} disabled/>
                                            </Form.Group>

                                        </Row>

                                        <div className="div-correo">

                                            <Form.Group className="correoUsuario" >
                                                <Form.Control type="email" value={loggedUser.useremail} disabled/>
                                            </Form.Group>
                                        </div>

                                        <Row className="div-ubicacion">

                                            <Form.Group as={Col} controlId="formGridState">
                                                <Form.Select defaultValue="Barrio">
                                                    <option>Barrio</option>
                                                    <option>Prado</option>
                                                    <option>Emilia</option>
                                                    <option>Las Mercedes</option>
                                                </Form.Select>
                                            </Form.Group>

                                            <Form.Group as={Col}>
                                                <Form.Control placeholder="Direccion" />
                                            </Form.Group>
                                        </Row>

                                        <Alert show={show} variant="success" className="">

                                            <h3 style={{ textAlign: "center" }} >
                                                Se guardaron los cambios correctamente

                                                <div className="div-imagenUsuario">

                                                    <Image src={success} alt="imagen chulo" />


                                                </div>
                                            </h3>
                                            <hr />
                                            <div style={{ textAlign: "center", marginBottom: "30" }} >
                                                <Button className="mx-2 boton" variant="outline-danger " onClick={() => setShow(false)} >
                                                    Cerrar
                                                </Button>
                                            </div>
                                        </Alert>

                                        {!show && <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4 ">
                                            <Button className="mx-2 boton" variant="outline-primary" onClick={() => setShow(true)} >
                                                Guardar Cambios
                                            </Button>

                                            <Button className="mx-2 boton" variant="outline-danger" >
                                                Cancelar
                                            </Button>
                                        </div>}
                                    </Form>
                                </div>
                            </div>


                        </Tab>
                        <Tab eventKey="home" title="Profile">
                            <div className="div-imagenMascota">

                                <Image src={dogIcon} roundedCircle width={300} />


                            </div>
                            <h3 style={{ textAlign: "center" }}>Bengy</h3>

                            <div className="div-editarMascota ">
                                <Form>
                                    <Row className="mb-5">
                                        <h3 style={{ textAlign: "center", marginBottom: "30px" }}>Datos de la Mascota</h3>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Control placeholder="Nombre" />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Control placeholder="Raza" />
                                        </Form.Group>

                                    </Row>
                                    <Row className="mb-5">
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Control placeholder="Color" />
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
                                            <Form.Control placeholder="id" />
                                        </Form.Group>

                                    </Row>
                                    <Alert show={show} variant="success">

                                        <h3 style={{ textAlign: "center" }} >
                                            Se guardaron los cambios correctamente

                                            <div className="div-imagenUsuario">

                                                <Image src={success} alt="imagen chulo" />


                                            </div>
                                        </h3>
                                        <hr />
                                        <div style={{ textAlign: "center", marginBottom: "30" }} >
                                            <Button className="mx-2 boton" variant="outline-danger " onClick={() => setShow(false)} >
                                                Cerrar
                                            </Button>
                                        </div>
                                    </Alert>

                                    {!show && <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4 ">
                                        <Button className="mx-2 boton" variant="outline-primary" onClick={() => setShow(true)} >
                                            Guardar Cambios
                                        </Button>

                                        <Button className="mx-2 boton" variant="outline-danger" >
                                            Cancelar
                                        </Button>

                                    </div>}
                                </Form>

                            </div>
                        </Tab>

                    </Tabs >

                </div >



            </>
        )
    }

}

