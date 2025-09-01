import { React, useState } from "react";
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import './correoContraseña.css'
import UserModal from './notificacionCodigo';
import logo from './Logo la merced.png'

export default function CorreoContraseña() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='formulario-div'>
                <Container className='formulario-div-container '>
                    <Row>
                        <Col>
                            <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                                <div className='text-center'>
                                    {/* incluir logo veterinaria */}
                                    <img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" />
                                    <h2>Recupera tu contraseña </h2>
                                    <p>Introduce tu correo y te enviaremos un enlace para que recuperes tu contraseña.</p>


                                </div>

                                <Form>
                                    <Row>

                                        <FormGroup className="correoRow" me='mb-4' controlId='formGridEmail'>
                                            <FormLabel>Correo Electrónico</FormLabel>
                                            <Form.Control type="email" placeholder="Example@hotmail.com" />
                                        </FormGroup>
                                        <UserModal modificarModal="Enlace enviado verifica tu correo!" modificarbtnModal="Verificar" modificarRuta="/codigoContraseña" />

                                    </Row>

                                </Form>

                            </div>
                        </Col>

                        <Col>
                            <div className='d-flex flex-column   justify-content-center gradient-custom-2 h-100 mb-4'>

                                <div className='text-white px-3 py-4 p-md-5 mx-md-4' id="textoMision">
                                    <h4 className='mb-4'>Nos alegra tenerte aquí</h4>
                                    <p className='small mb-0'> I journeyed long in walkin beyond the place of stopping
                                        where there was no more returning to the people i had known i saw the world forgotten
                                        where the grass gives up on growing and i knew that i would never make another journey home
                                        upon that fleshy plain below the final rock outcropping stretch the vast and empty desert
                                        of the hungry, bleeding thing encompasing the earth to the horizon, all-consuming, crying in
                                        a thousand voices to its desolate god-king. And the music of its crying, never deade, ever dying,
                                        sent me running in a madness i can scarce compare to fear</p>
                                    <br></br>
                                    <br></br>


                                </div>
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>











        </>
    )
}