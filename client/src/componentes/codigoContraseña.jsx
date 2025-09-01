import React, { useEffect, useState } from 'react'
import './login.css'
import logo from './Logo la merced.png'
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

const schema = z.object({
    nombre: z.string().min(1),
    apellidos: z.string().min(1),
    email: z.string().email({ message: "Correo invalido" }),

    nuip: z.coerce.number()
        .int()
        .min(10000000, { message: "El número de identificación debe contener mínimo 8 cifras" })
        .max(9999999999, { message: "El número de identificación debe contener máximo 10 cifras" }),

    telefono: z.coerce.number()
        .int()
        .min(1000000, { message: "El número de identificación debe contener mínimo 8 cifras" })
        .max(9999999999, { message: "El número de identificación debe contener máximo 10 cifras" }),

    password: z.string().min(8, { message: "Contraseña invalida" }).regex(regex, { message: "La contraseña debe contener al menos una letra en mayuscula, una en minuscula y un caracter especial" }),
    confirmPassword: z.string().min(8)
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no conciden",
    path: ["confirmPassword"],
});

export default function Register() {

    useEffect(() => {
        document.title = "Registrarse"
    })

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    const [userName, setUserName] = useState("")
    const [userSurname, setUserSurname] = useState("")
    const [userNuip, setUserNuip] = useState("")
    const [userTel, setUserTel] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPass, setUserPass] = useState("")

    // let userInfo = { userName, userSurname, userNuip, userTel, userEmail, userPass }


    const onSubmit = async (e) => {
        // e.preventDefault();
        try {
            // await new Promise((resolve) => setTimeout(resolve, 1000))
            // throw new Error()

            const body = {userName, userSurname, userNuip, userTel, userEmail, userPass}

            // const response = await fetch('',{
            //     method: "POST",
            //     headers:{"content-type": "application/json"},
            //     body: JSON.stringify(body)
            // } )

            console.log(body)
            // const bodyJson = JSON.stringify(body)
            // console.log(bodyJson)
        } catch (err) {
            setError("root", {
                message: err.message
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
                                <Link to='/'><img src={logo} alt="Logo veterinaria La merced" width="100px" height="100px" /></Link>
                                <h4>Somos clinica veterinaria La Merced </h4>
                                <p>Bienvenido</p>
                            </div>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row className="mb-3">
                                    <FormGroup as={Col} controlId='formGridName'>
                                        <FormLabel>Nombre</FormLabel>
                                        <Form.Control {...register("nombre")} required value={userName} onChange={(e) => setUserName(e.target.value)} />
                                        {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}
                                    </FormGroup>

                                    <FormGroup as={Col} controlId='formGridSurname'>
                                        <FormLabel>Apellidos</FormLabel>
                                        <Form.Control {...register("apellidos")} required value={userSurname} onChange={(e) => setUserSurname(e.target.value)} />
                                        {errors.apellidos && (<div style={{ color: "red" }}>{errors.apellidos.message}</div>)}
                                    </FormGroup>
                                </Row>

                                <Row>

                                    <FormGroup as={Col} controlId='formGridId' >
                                        <FormLabel>Número de identificación</FormLabel>
                                        <Form.Control {...register("nuip")} required value={userNuip} onChange={(e) => setUserNuip(e.target.value)} />
                                        {errors.nuip && (<div style={{ color: "red" }}>{errors.nuip.message}</div>)}
                                    </FormGroup>

                                    <FormGroup as={Col} controlId='formGridPhoneNumber' >
                                        <FormLabel>Telefono</FormLabel>
                                        <Form.Control {...register("telefono")} required value={userTel} onChange={(e) => setUserTel(e.target.value)} />
                                        {errors.telefono && (<div style={{ color: "red" }}>{errors.telefono.message}</div>)}
                                    </FormGroup>

                                    <FormGroup className='mb-4' controlId='formGridEmail'>
                                        <FormLabel>Correo Electrónico</FormLabel>
                                        <Form.Control {...register("email")} type="email" placeholder="Example@hotmail.com" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                                        {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                    </FormGroup>

                                    <FormGroup className='mb-4' controlId='formGridPassword'>
                                        <FormLabel>Contraseña</FormLabel>
                                        <FormControl {...register("password")} type='password' required value={userPass} onChange={(e) => setUserPass(e.target.value)} />
                                        {errors.password && (<p role='alert' style={{ color: "red" }}>{errors.password.message}</p >)}
                                    </FormGroup>

                                    <FormGroup className='mb-4' controlId='formGridConfirmPassword'>
                                        <FormLabel>Confirma tu contraseña</FormLabel>
                                        <FormControl {...register("confirmPassword")} type='password' required />
                                        {errors.confirmPassword && (<p role='alert' style={{ color: "red" }}>{errors.confirmPassword.message}</p>)}
                                    </FormGroup>

                                    <div className='text-center pt-1 mb-5 pb-1 '>
                                        <Button
                                            className='mb-4 w-100 gradient-custom-2' v
                                            ariant='secondary'
                                            type='submit'
                                            disabled={isSubmitting}
                                        >{isSubmitting ? "Espere..." : "Crear Cuenta"}</Button>
                                    </div>

                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                        <p className='mb-0'>Ya tienes una cuenta?</p>
                                        <Link to='/Login'> <Button className='mx-2' variant='outline-primary' >Iniciar sesión</Button></Link>
                                    </div>
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
