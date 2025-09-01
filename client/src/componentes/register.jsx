import React, { useEffect, useState } from 'react'
import './login.css'
import logo from './Logo la merced.png'
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal } from 'react-bootstrap';

const Formulario = () => {
    const [showModal, setShowModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [serverError, setServerError] = useState('');

    const [nuipusuario, setnuipusuario] = useState('');
    const [clave_hash, setclave_hash] = useState('');
    const [correo, setcorreo] = useState('');
    const [telefono, settelefono] = useState('');
    const [nombre, setnombres] = useState('');

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm();

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const body = { nuipusuario, clave_hash, correo, telefono, nombre };
            console.log(body);
            const url = `http://localhost:5000/usuarios/cliente`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errorData = await response.json();
                if (errorData.error) {
                    setServerError(errorData.error);
                    setShowModal(true);
                } else {
                    setServerError('Error al registrar el usuario.');
                    setShowModal(true);
                }
                return;
            }

            const data = await response.json();
            console.log("Usuario autenticado:", data);

            setShowSuccessModal(true);
            navigate('/')
        } catch (error) {
            console.log(error.message);
            setServerError('Error al comunicarse con el servidor.');
            setShowModal(true);
        }
    };

    return (
        <div className='formulario-div'>
            <Container className='formulario-div-container'>
                <Row>
                    <Col>
                        <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                            <div className='text-center'>
                                {/* Incluir logo veterinaria */}
                                <img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" />
                                <h4>Somos clínica veterinaria La Merced</h4>
                                <p>Bienvenido</p>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-3">
                                    <FormGroup as={Col} controlId='formGridName'>
                                        <FormLabel>Nombre completo</FormLabel>
                                        <Form.Control {...register("nombre", { required: "El nombre es obligatorio" })} value={nombre} onChange={(e) => setnombres(e.target.value)} />
                                        {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}
                                    </FormGroup>
                                </Row>

                                <Row>
                                    <FormGroup as={Col} controlId='formGridId'>
                                        <FormLabel>Número de identificación</FormLabel>
                                        <Form.Control
                                            {...register("nuip", {
                                                required: "El número de identificación es obligatorio",
                                                valueAsNumber: true // Esta opción es para que React Hook Form maneje el valor como número
                                            })}
                                            value={nuipusuario}
                                            onChange={(e) => setnuipusuario(parseInt(e.target.value, 10))}
                                        />
                                        {errors.nuip && (<div style={{ color: "red" }}>{errors.nuip.message}</div>)}
                                    </FormGroup>

                                    <FormGroup as={Col} controlId='formGridPhoneNumber'>
                                        <FormLabel>Teléfono</FormLabel>
                                        <Form.Control
                                            {...register("telefono", {
                                                required: "El teléfono es obligatorio",
                                                valueAsNumber: true // Esta opción es para que React Hook Form maneje el valor como número
                                            })}
                                            value={telefono}
                                            onChange={(e) => settelefono(parseInt(e.target.value, 10))} />
                                        {errors.telefono && (<div style={{ color: "red" }}>{errors.telefono.message}</div>)}
                                    </FormGroup>
                                </Row>

                                <FormGroup className='mb-4' controlId='formGridEmail'>
                                    <FormLabel>Correo electrónico</FormLabel>
                                    <Form.Control {...register("email", { required: "El correo electrónico es obligatorio", pattern: { value: /^\S+@\S+$/i, message: "El correo electrónico no es válido" } })} type="email" placeholder="Example@hotmail.com" value={correo} onChange={(e) => setcorreo(e.target.value)} />
                                    {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                </FormGroup>

                                <FormGroup className='mb-4' controlId='formGridPassword'>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl {...register("password", { required: "La contraseña es obligatoria" })} type='password' value={clave_hash} onChange={(e) => setclave_hash(e.target.value)} />
                                    {errors.password && (<p role='alert' style={{ color: "red" }}>{errors.password.message}</p>)}
                                </FormGroup>

                                <FormGroup className='mb-4' controlId='formGridConfirmPassword'>
                                    <FormLabel>Confirma tu contraseña</FormLabel>
                                    <FormControl {...register("confirmPassword", { required: "La confirmación de contraseña es obligatoria", validate: value => value === clave_hash || "Las contraseñas no coinciden" })} type='password' />
                                    {errors.confirmPassword && (<p role='alert' style={{ color: "red" }}>{errors.confirmPassword.message}</p>)}
                                </FormGroup>

                                <div className='text-center pt-1 mb-5 pb-1'>
                                    <Button className='mb-4 w-100 gradient-custom-2'
                                        variant='secondary'
                                        type='submit'
                                        disabled={isSubmitting}>
                                        {isSubmitting ? "Espere..." : "Crear Cuenta"}
                                    </Button>
                                </div>

                                <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                    <p className='mb-0'>¿Ya tienes una cuenta?</p>
                                    <Link to='/Login'>
                                        <Button className='mx-2' variant='outline-primary'>Iniciar sesión</Button>
                                    </Link>
                                </div>
                            </Form>
                        </div>
                    </Col>

                    {/* Modal para confirmar la cuenta registrada */}
                    <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Perfil Registrado</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Bienvenido, ahora tu cuenta está registrada.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Modal para mostrar errores del servidor */}
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{serverError}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>
                                Cerrar
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <Col>
                        <div className='d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4'>
                            <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                                <h4 className='mb-4'>Nos alegra tenerte aquí</h4>
                                <p className='small mb-0'>
                                    Bienvenido a nuestra clínica veterinaria. Estamos comprometidos a brindar la mejor atención para tus mascotas.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Formulario;