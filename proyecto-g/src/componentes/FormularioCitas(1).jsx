
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./FormularioCitas(1).css"
import UserModal from './modal';
import NotificacionCitas from "./NotificacionCitas";

import success from './iconos/success.svg'
import Image from 'react-bootstrap/Image';
import Alert from 'react-bootstrap/Alert';
import Cabecera from "./header";
import Footer from './footer'
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'


import { Container, FormLabel } from "react-bootstrap";
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { Component, useState, useEffect } from "react";
import { setDefaultLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
registerLocale('es', es)
setDefaultLocale('es', es)


const schema = z.object({
    nombre: z.string().min(1),
    apellidos: z.string().min(1),
    email: z.string().email({ message: "Correo invalido" }),
    direccion: z.string().min(1),


    nuip: z.coerce.number()
        .int()
        .min(10000000, { message: "El número de identificación debe contener mínimo 8 cifras" })
        .max(9999999999, { message: "El número de identificación debe contener máximo 10 cifras" }),

    telefono: z.coerce.number()
        .int()
        .min(1000000, { message: "El número de identificación debe contener mínimo 8 cifras" })
        .max(9999999999, { message: "El número de identificación debe contener máximo 10 cifras" }),
 
});



export default function Formulario() {

    useEffect(() => {
        document.title = "Agendar Cita"
    })

    const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // throw new Error()
            console.log(data);
        } catch (error) {
            // setError("root", {
            //     message: "Correo o contraseña incorrectos"
            // })
        }

    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedData, setSelectedDate] = useState(null);



    return (

        <>

            <Cabecera />
            <div className="div-Formulario d-flex flex-column md-5">
                <h1 className="titulo">En nuestra veterinaria nos preocupamos por tu mascota,<br /> agenda tu cita con nosotros</h1>
                <br />
                <div>


                    <Form onSubmit={handleSubmit(onSubmit)}>

                        <div className=" container">
                            <h3 className="encabezado-persona">DATOS PERSONALES:</h3>
                            <br />
                            <Row className="mb-3">

                                <Form.Group as={Col} className='mb-4' controlId='formGridEmail'>
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Nombre</Form.Label>
                                    <Form.Control {...register("nombre")} required />
                                    {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}
                                </Form.Group>

                                <Form.Group as={Col} className='mb-4' controlId='formGridPassword'>
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Apellido</Form.Label>
                                    <Form.Control  {...register("apellidos")} required />
                                    {errors.apellidos && (<div style={{ color: "red" }}>{errors.apellidos.message}</div>)}
                                </Form.Group>

                                <Form.Group as={Col} className='mb-4' controlId='formGridPassword'>
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Nuip</Form.Label>
                                    <Form.Control {...register("nuip")} required />
                                    {errors.nuip && (<div style={{ color: "red" }}>{errors.nuip.message}</div>)}
                                </Form.Group>

                                <Form.Group className='mb-4' controlId='formGridPassword'>
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Correo</Form.Label>
                                    <Form.Control {...register("email")} type="email" placeholder="Example@hotmail.com" required />
                                    {errors.email && (<div style={{ color: "red" }}>{errors.email.message}</div>)}
                                </Form.Group>

                                <Form.Group className='mb-4' controlId='formGridPassword'>
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Telefono</Form.Label>
                                    <Form.Control  {...register("telefono")} required />
                                    {errors.telefono && (<div style={{ color: "red" }}>{errors.telefono.message}</div>)}
                                </Form.Group>
                            </Row>
                        </div>



                        <div className="container">
                            <h3 className="encabezado-persona">DATOS DE LA MASCOTA:</h3>
                            <br />
                            <Row className="mb-3">

                                <Form.Group as={Col} className='mb-4' controlId='formGridEmail'>
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Nombre</Form.Label>
                                    <Form.Control {...register("nombre")} required />
                                    {errors.nombre && (<div style={{ color: "red" }}>{errors.nombre.message}</div>)}

                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Especie</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option value="NULL" >...</option>
                                        <option value="perro">Perro</option>
                                        <option value="gato">Gato</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                        </div>

                        <div className="container">

                            <h3 className="encabezado-persona">DATOS DE LA CITA:</h3>
                            <br />
                            <Row className="mb-3">

                                <Form.Group as={Col} className='mb-4' controlId='formGridEmail'>
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Fecha</Form.Label>
                                    <br />
                                    <DatePicker className='calendario' selected={selectedData} onChange={date => setSelectedDate(date)}
                                        showIcon
                                        toggleCalendarOnIconClick
                                        dateFormat="dd/MM/yyyy"
                                        minDate={new Date}
                                        locale="es"
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Hora</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option>Hora</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Servicio</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option value="NULL" >...</option>
                                        <option value="Estetica">Estetica</option>
                                        <option value="General">General</option>
                                    </Form.Select>
                                </Form.Group>

                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridState">
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Tipo de domicilio</Form.Label>
                                    <Form.Select defaultValue="Choose...">
                                        <option>Tipo de domicilio</option>
                                        <option>...</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridPassword'>
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Direccion</Form.Label>
                                    <Form.Control {...register("direccion")} required />
                                    {errors.direccion && (<div style={{ color: "red" }}>{errors.direccion.message}</div>)}
                                </Form.Group>
                                {/* <Form.Group as={Col} controlId="formGridCity"> */}
                                {/* <Form.Control placeholder="Calendario" /> */}
                                {/* <FormLabel style={{marginRight:'10px'}}>Fecha y Hora</FormLabel> */}

                                {/* <DateTimePicker className='imp-calendario' id='' value={fechaSeleccionada} onChange={cambiarFechaSeleccionada} />

                                </Form.Group> */}
                            </Row>
                            <Row className="mb-3">

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label style={{ color: 'white' }} className='etiqueta'>Observaciones (Opcional)</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>

                            </Row>

                        </div>
                        <Container className="d-flex justify-content-center allign-items-center">
                            <Row>
                                <Col>
                                    {/* <NotificacionCitas modificarModal="Tu solicitud de cita se envio con  exito!" modificarbtnModal="Enviar"
                                        disabled={isSubmitting}
                                    >{isSubmitting ? "Espere..." : "Enviar"}</NotificacionCitas> */}
                                    <Button
                                        className=' btn-submitCita'
                                        variant='primary'
                                        type='submit'
                                        disabled={isSubmitting}>
                                        {isSubmitting ? "Espere..." : "Iniciar Sesión"}
                                    </Button>
                                    {errors.root && (<div>{errors.root.message}</div>)}
                                </Col>
                            </Row>
                        </Container>

                    </Form>
                </div>

            </div>

            <Footer />
        </>

    )



}