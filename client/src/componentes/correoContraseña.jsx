import React, { useState } from 'react';
import { Button, Col, Container, Form, FormGroup, FormLabel, Row, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import check from "./imagenes/check confirmed or.png";
import logo from './Logo la merced.png';
import './correoContraseña.css';
import './notificacionCodigo.css';

export default function CorreoContraseña() {
    const [correo, setCorreo] = useState('');
    const [codigo, setCodigo] = useState('');
    const [nuevaClave, setNuevaClave] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [step, setStep] = useState(1);

    const handleCorreoSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/usuarios/solicitar-codigo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo })
        });
        if (response.ok) {
            setStep(2);
        } else {
            alert('Error al enviar el código. Inténtelo de nuevo.');
        }
    };

    const handleCodigoSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/usuarios/cambiar-clave', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, codigo, nuevaClave })
        });
        if (response.ok) {
            setShowModal(true);
        } else {
            alert('Error al cambiar la contraseña. Verifique su código.');
        }
    };

    return (
        <>
            <div className='formulario-div'>
                <Container className='formulario-div-container'>
                    <Row>
                        <Col>
                            <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                                <div className='text-center'>
                                    <img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" />
                                    <h2>Recupera tu contraseña</h2>
                                    <p>Introduce tu correo y te enviaremos un enlace para que recuperes tu contraseña.</p>
                                </div>

                                {step === 1 && (
                                    <Form onSubmit={handleCorreoSubmit}>
                                        <FormGroup className="correoRow" controlId='formGridEmail'>
                                            <FormLabel>Correo Electrónico</FormLabel>
                                            <Form.Control
                                                type="email"
                                                placeholder="Example@hotmail.com"
                                                value={correo}
                                                onChange={(e) => setCorreo(e.target.value)}
                                                required
                                            />
                                        </FormGroup>
                                        <Button type="submit" className='mb-4 w-100 gradient-custom-2'>
                                            Enviar Código
                                        </Button>
                                    </Form>
                                )}

                                {step === 2 && (
                                    <Form onSubmit={handleCodigoSubmit}>
                                        <FormGroup className="codigoRow" controlId='formGridCodigo'>
                                            <FormLabel>Código de Verificación</FormLabel>
                                            <Form.Control
                                                type="text"
                                                placeholder="Introduce el código recibido"
                                                value={codigo}
                                                onChange={(e) => setCodigo(e.target.value)}
                                                required
                                            />
                                        </FormGroup>
                                        <FormGroup className="claveRow" controlId='formGridNuevaClave'>
                                            <FormLabel>Nueva Contraseña</FormLabel>
                                            <Form.Control
                                                type="password"
                                                placeholder="Introduce tu nueva contraseña"
                                                value={nuevaClave}
                                                onChange={(e) => setNuevaClave(e.target.value)}
                                                required
                                            />
                                        </FormGroup>
                                        <Button type="submit" className='mb-4 w-100 gradient-custom-2'>
                                            Cambiar Contraseña
                                        </Button>
                                    </Form>
                                )}
                            </div>
                        </Col>

                        <Col>
                            <div className='d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4'>
                                <div className='text-white px-3 py-4 p-md-5 mx-md-4' id="textoMision">
                                    <h4 className='mb-4'>Nos alegra tenerte aquí</h4>
                                    <p className='small mb-0'>
                                        I journeyed long in walkin beyond the place of stopping
                                        where there was no more returning to the people I had known
                                        I saw the world forgotten where the grass gives up on growing
                                        and I knew that I would never make another journey home
                                        upon that fleshy plain below the final rock outcropping stretch
                                        the vast and empty desert of the hungry, bleeding thing encompassing
                                        the earth to the horizon, all-consuming, crying in a thousand voices
                                        to its desolate god-king. And the music of its crying, never dead,
                                        ever dying, sent me running in a madness I can scarce compare to fear
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body className="text-center">
                    <img
                        src={check}
                        alt="check verde"
                        style={{ width: '100px', height: '100px', marginBottom: '50px' }}
                        className="mx-auto"
                    />
                    <h2>Enlace enviado, verifica tu correo!</h2>
                </Modal.Body>
                <Modal.Footer>
                    <Link to="/Login">
                        <Button variant="primary" onClick={() => setShowModal(false)}>
                            Continuar
                        </Button>
                    </Link>
                </Modal.Footer>
            </Modal>
        </>
    );
}
