import React from 'react'
import './codigoContraseña.css'
import Carousel from 'react-bootstrap/Carousel';
import img1 from './imagenes/promo-la-merced.jpg'
import img2 from './imagenes/dia-del-gato-la-merced.jpg'
import img3 from './imagenes/servicios-la-merced.jpg'
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

import { useState } from 'react';
import logo from './Logo la merced.png'
import UserModal from './notificacionCodigo';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'

let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;


const schema = z.object({

    password: z.string().min(8, { message: "Contraseña invalida" }).regex(regex, { message: "La contraseña debe contener al menos una letra en mayuscula, una en minuscula y un caracter especial" }),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no conciden",
    path: ["confirmPassword"],
});


export default function EnlaceContraseña() {
    const [showPwd, setShowPwd] = useState(true)
    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            throw new Error()
            console.log(data);
        } catch (error) {
            setError("root", {
                message: "Correo o contraseña incorrectos"
            })
        }

    }

    return (
        <div className='formulario-div'>
            <Container className='formulario-div-container'>
                <Row>
                    <Col>
                        <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                            <div className='text-center'>
                                {/* incluir logo veterinaria */}
                                <img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" />
                                <h4>Somos clinica veterinaria La Merced </h4>
                                <br></br>
                                <p>A continuacion digita tu nueva contraseña: </p>
                                <br></br>

                            </div>
                            <Form>


                                <Row>


                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormLabel>Nueva Contraseña</FormLabel>
                                        <FormControl  {...register("password")} type={showPwd ? "text" : 'password'} required />
                                        {errors.password && (<p role='alert' style={{ color: "red" }}>{errors.password.message}</p >)}
                                    </FormGroup>
                                    <div className="icon-container" onClick={() => setShowPwd(!showPwd)}>
                                        {showPwd ? <FaEyeSlash className="iconEyeSlash" /> : <FaEye className="iconEye" />}

                                    </div>



                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormLabel>Confirma tu contraseña</FormLabel>
                                        <FormControl  {...register("confirmPassword")} type={showPwd ? "text" : 'password'} required />
                                        {errors.confirmPassword && (<p role='alert' style={{ color: "red" }}>{errors.confirmPassword.message}</p>)}

                                        <div className="icon-container2" onClick={() => setShowPwd(!showPwd)}>
                                            {showPwd ? <FaEyeSlash className="iconEyeSlash" /> : <FaEye className="iconEye" />}

                                        </div>
                                        <div className="btn-verificar" id="btnVer">
                                            <UserModal modificarModal="Se actualizo tu contraseña con exito!" modificarbtnModal="Continuar" modificarRuta="/Login" disabled={isSubmitting}>
                                                {isSubmitting ? "Espere..." : "Crear Cuenta"}
                                            </UserModal>
                                        </div>
                                    </FormGroup>




                                    {/* <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                        <p className='mb-0'>Ya tienes una cuenta?</p>
                                       <Link to='/Login'> <Button  className='mx-2' variant='outline-primary' >Iniciar sesión</Button></Link>
                                    </div> */}
                                </Row>
                            </Form>
                        </div>
                    </Col>

                    <Col>
                        <div className='d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4'>
                            {/* <Carousel className='carrusel' slide={false}>
                                <Carousel.Item>
                                    <img
                                        width={300}
                                        height={500}
                                        className='d-block w-100'
                                        src={img1}
                                        alt='primer imagen' />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        width={900}
                                        height={500}
                                        className='d-block w-100'
                                        src={img2}
                                        alt='segunda imagen' />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                        width={900}
                                        height={500}
                                        className='d-block w-100'
                                        src={img3}
                                        alt='tercer imagen' />
                                </Carousel.Item>
                            </Carousel> */}
                            <div className='text-white px-3 py-4 p-md-5 mx-md-4'>
                                <h4 className='mb-4'>Nos alegra tenerte aquí</h4>
                                <p className='small mb-0'> I journeyed long in walkin beyond the place of stopping
                                    where there was no more returning to the people i had known i saw the world forgotten
                                    where the grass gives up on growing and i knew that i would never make another journey home
                                    upon that fleshy plain below the final rock outcropping stretch the vast and empty desert
                                    of the hungry, bleeding thing encompasing the earth to the horizon, all-consuming, crying in
                                    a thousand voices to its desolate god-king. And the music of its crying, never deade, ever dying,
                                    sent me running in a madness i can scarce compare to fear</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
