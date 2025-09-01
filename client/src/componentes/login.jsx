import React, { useEffect, useState } from 'react';
import './login.css';
import logo from './Logo la merced.png';
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import UserDetails from './UserDetails'; // Importa el componente UserDetails
import { Modal } from 'react-bootstrap';

const schema = z.object({
    email: z.string().email({ message: "Correo invalido" }),
    password: z.string().min(1, { message: "Contraseña invalida" })
});

export default function Login() {
    const [showModal, setShowModal] = useState(false);
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Ingresar";
    }, []);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const body = { correo, clave };

            const url = `http://localhost:5000/autenticar`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const userData = await response.json();
                setUsuarioAutenticado(userData);
                sessionStorage.setItem('usuario', JSON.stringify(userData));

                if (userData.idroll === 2) {
                    navigate('/Admin');
                } else if (userData.idroll === 1) {
                    navigate('/');
                } else {
                    // Manejar otros casos si hay otros roles
                    navigate('/');
                }
            } else {
                setShowModal(true);
                const errorData = await response.json();
                console.error(errorData.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    if (usuarioAutenticado) {
        return <UserDetails user={usuarioAutenticado} />;
    }

    return (
        <div className='formulario-div'>
            <Container className='formulario-div-container'>
                <Row>
                    <Col>
                        <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                            <div className='text-center'>
                                <img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" />
                                <h4>Somos clínica veterinaria La Merced</h4>
                                <p>Bienvenido</p>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <FormGroup className='mb-4' controlId='formGridEmail'>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <Form.Control
                                            {...register("email")}
                                            required
                                            type="email"
                                            placeholder="Example@hotmail.com"
                                            value={correo}
                                            onChange={(e) => setCorreo(e.target.value)}
                                        />
                                        {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                    </FormGroup>

                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormControl
                                            {...register("password")}
                                            required
                                            type='password'
                                            value={clave}
                                            onChange={(e) => setClave(e.target.value)}
                                        />
                                        {errors.password && (<div style={{ color: "red" }}>{errors.password.message}</div>)}
                                    </FormGroup>

                                    <FormGroup className='mb-4' id='formGridCheckox'>
                                        <FormCheck type='checkbox' label='Recuérdame' />
                                    </FormGroup>

                                    <div className='text-center pt-1 mb-5 pb-1 '>
                                        <Button
                                            className='mb-4 w-100 gradient-custom-2'
                                            variant='secondary'
                                            type='submit'
                                            disabled={isSubmitting}>
                                            {isSubmitting ? "Espere..." : "Iniciar Sesión"}
                                        </Button>
                                        {errors.root && (<div>{errors.root.message}</div>)}

                                        <Link className='text-muted text-center forgotten-password' to='/correoContraseña'>¿Olvidaste tu contraseña?</Link>
                                    </div>

                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                        <p className='mb-0'>¿No tienes una cuenta?</p>
                                        <Link to='/Register'><Button className='mx-2' variant='outline-primary' >Regístrate</Button></Link>
                                    </div>
                                </Row>
                            </Form>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex flex-column justify-content-center gradient-custom-2 h-100 mb-4'>
                            <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                                <h4 className='mb-4'>Nos alegra tenerte aquí</h4>
                                <p className='small mb-0'>la clinica veterinaria la merced es una empresa para el cuidado de mascotas y darles la mejor compañia</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Correo electrónico o contraseña incorrectos.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
