import React, { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { z, ZodSchema } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "./FormularioCitas(1).css";
import { Container } from "react-bootstrap";
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import Cabecera from "./header";
import Footer from './footer';
import { format } from 'date-fns';
import { Modal } from 'react-bootstrap';

registerLocale('es', es);

export default function Formulario() {
    const usuario = sessionStorage.getItem('usuario');
    const [showModal, setShowModal] = useState(false);

    // Initialize state with an object for all form values
    const [formData, setFormData] = useState({
        nuipcliente: '',
        correo: '',
        telefono: '',
        nombres: '',
        nombremascota: '',
        raza: '',
        direccion: '',
        fechacita: '',
        horacita: '',
        comentariocliente: '',
        idservicio: '',
        idtipodomicilio: '',
        idbarrioaprovado: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setFormData({ ...formData, fechacita: formattedDate });
    };

    // Define validation schema
    const schema = z.object({
        nombres: z.string().min(3, { message: "El nombre es requerido y debe tener al menos 3 caracteres" }),
        nuipcliente: z.coerce.number().int().min(10000000, { message: "El número de identificación debe contener mínimo 8 cifras" }).max(9999999999, { message: "El número de identificación debe contener máximo 10 cifras" }),
        correo: z.string().email({ message: "Correo inválido" }),
        telefono: z.coerce.number().int().min(1000000, { message: "El número de teléfono debe contener mínimo 7 cifras" }).max(9999999999, { message: "El número de teléfono debe contener máximo 10 cifras" }),
        nombremascota: z.string().min(3, { message: "El nombre de la mascota es requerido y debe tener al menos 3 caracteres" }),
        raza: z.string().min(2, { message: "La raza es requerida y debe tener al menos 2 caracteres" }),
        direccion: z.string().min(6, { message: "La dirección es requerida y debe tener al menos 6 caracteres" }),
        fechacita: z.string().nonempty({ message: "La fecha de la cita es obligatoria" }),
        horacita: z.string().nonempty({ message: "La hora de la cita es obligatoria" }),
        idbarrioaprovado: z.string().nonempty({ message: "Debe seleccionar un barrio" })
    });

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 3);
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);

    const isSunday = (date) => {
        const day = date.getDay();
        return day !== 0;
    };

    useEffect(() => {
        document.title = "Agendar Cita";
    }, []);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            let bodyCliente = { nuipcliente: data.nuipcliente, correo: data.correo, telefono: data.telefono, nombres: data.nombres };

            if (usuario) {
                const usuarioObj = JSON.parse(usuario);
                bodyCliente = { nuipcliente: usuarioObj.nuipusuario, correo: usuarioObj.correo, telefono: usuarioObj.telefono, nombres: usuarioObj.nombre };
            }

            const urlcliente = `http://localhost:5000/clientes`;
            const responsecliente = await fetch(urlcliente, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyCliente)
            });
            const datacliente = await responsecliente.json();
            console.log("Cliente registrado:", datacliente);

            const urlmascota = `http://localhost:5000/mascotascitas`;
            const bodyMascota = { nombremascota: data.nombremascota, raza: data.raza };
            const responsemascota = await fetch(urlmascota, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyMascota)
            });
            const datamascota = await responsemascota.json();
            console.log("Mascota registrada:", datamascota);

            const bodyCita = { direccion: data.direccion, fechacita: data.fechacita, horacita: data.horacita, comentariocliente: data.comentariocliente, idservicio: data.idservicio, idtipodomicilio: data.idtipodomicilio, idmascota: datamascota.idmascota, idbarrioaprovado: data.idbarrioaprovado, idcliente: datacliente.idcliente };
            const urlcitas = `http://localhost:5000/citas`;
            const responsecitas = await fetch(urlcitas, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bodyCita)
            });

            console.log(bodyCita);
            console.log(bodyCliente);
            console.log(bodyMascota);
            const datacitas = await responsecitas.json();
            console.log("Solicitud cita:", datacitas);

            // Mostrar modal de éxito
            setShowModal(true);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Cabecera />
            <div className="div-Formulario d-flex flex-column md-5">
                <h1 className="titulo">En nuestra veterinaria nos preocupamos por tu mascota,<br /> agenda tu cita con nosotros</h1>
                <br />
                <div>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container">
                            <div className="lineasblancas">
                                <h3 className="encabezado-persona">DATOS PERSONALES</h3>
                            </div>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} className='mb-4' controlId='formGridNombre'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}> Nombres </Form.Label>
                                    <Form.Control
                                        {...register("nombres")}
                                        value={formData.nombres}
                                        onChange={handleInputChange}
                                        name="nombres"
                                        className={errors.nombres ? 'input-error' : ''}
                                        type='text'
                                    />
                                    {errors.nombres && (<div style={{ color: "red" }}>{errors.nombres.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridNuip'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Nuip</Form.Label>
                                    <Form.Control
                                        {...register("nuipcliente", { valueAsNumber: true })}
                                        value={formData.nuipcliente}
                                        onChange={handleInputChange}
                                        name="nuipcliente"
                                        className={errors.nuipcliente ? 'input-error' : ''}
                                    />
                                    {errors.nuipcliente && (<div style={{ color: "red" }}>{errors.nuipcliente.message}</div>)}
                                </Form.Group>
                                <Form.Group className='mb-4' controlId='formGridEmail'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Correo</Form.Label>
                                    <Form.Control
                                        {...register("correo")}
                                        type="email"
                                        className={errors.correo ? 'input-error' : ''}
                                        placeholder="Example@hotmail.com"
                                        value={formData.correo}
                                        onChange={handleInputChange}
                                        name="correo"
                                    />
                                    {errors.correo && (<div style={{ color: "red" }}>{errors.correo.message}</div>)}
                                </Form.Group>
                            </Row>
                            <Row className="mb-3">
                                <Form.Group className="mb-3" controlId="formGridPhone">
                                    <Form.Label className="etiqueta" style={{ color: 'white' }}>Teléfono</Form.Label>
                                    <Form.Control
                                        {...register("telefono", { valueAsNumber: true })}
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        name="telefono"
                                        className={errors.telefono ? 'input-error' : ''}
                                    />
                                    {errors.telefono && (<div style={{ color: "red" }}>{errors.telefono.message}</div>)}
                                </Form.Group>
                            </Row>
                            <div className="lineasblancas">
                                <h3 className="encabezado-persona">DATOS MASCOTA</h3>
                            </div>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col} className='mb-4' controlId='formGridNombreMascota'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Nombre</Form.Label>
                                    <Form.Control
                                        {...register("nombremascota")}
                                        value={formData.nombremascota}
                                        onChange={handleInputChange}
                                        name="nombremascota"
                                        className={errors.nombremascota ? 'input-error' : ''}
                                        type='text'
                                    />
                                    {errors.nombremascota && (<div style={{ color: "red" }}>{errors.nombremascota.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col} className='mb-4' controlId='formGridRaza'>
                                    <Form.Label className='etiqueta' style={{ color: 'white' }}>Raza</Form.Label>
                                    <Form.Control
                                        {...register("raza")}
                                        value={formData.raza}
                                        onChange={handleInputChange}
                                        name="raza"
                                        className={errors.raza ? 'input-error' : ''}
                                        type='text'
                                    />
                                    {errors.raza && (<div style={{ color: "red" }}>{errors.raza.message}</div>)}
                                </Form.Group>
                            </Row>
                            <div className="lineasblancas">
                                <h3 className="encabezado-persona">DATOS DE LA CITA</h3>
                            </div>
                            <br />
                            <Row className="mb-3">
                                <Form.Group as={Col}  className="mb-4" controlId="formGridAddress1">
                                    <Form.Label className="etiqueta" style={{ color: 'white' }}>Dirección</Form.Label>
                                    <Form.Control
                                        {...register("direccion")}
                                        value={formData.direccion}
                                        onChange={handleInputChange}
                                        name="direccion"
                                        className={errors.direccion ? 'input-error' : ''}
                                        type='text'
                                    />
                                    {errors.direccion && (<div style={{ color: "red" }}>{errors.direccion.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col}  className="mb-4" controlId="formGridBarrio">
                                    <Form.Label className="etiqueta" style={{ color: 'white' }}>Barrio</Form.Label>
                                    <Form.Control
                                        {...register("idbarrioaprovado")}
                                        as="select"
                                        value={formData.idbarrioaprovado}
                                        onChange={handleInputChange}
                                        name="idbarrioaprovado"
                                        className={`form-control ${errors.idbarrioaprovado ? 'input-error' : ''}`}
                                    >
                                        <option value="NULL" >...</option>
                                        <option value="15">Las Delicias</option>
                                        <option value="16">El Prado</option>
                                        <option value="17">El Recreo</option>
                                        <option value="18">Caimitos</option>
                                        <option value="19">Olímpico</option>
                                        <option value="20">Cincuentenario</option>
                                        <option value="21">San Carlos</option>
                                        <option value="22">Villa Claudia</option>
                                        <option value="23">Las Mercedes</option>
                                    </Form.Control>
                                    {errors.idbarrioaprovado && (<div style={{ color: "red" }}>{errors.idbarrioaprovado.message}</div>)}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridComments">
                                    <Form.Label className="etiqueta" style={{ color: 'white' }}>Comentarios</Form.Label>
                                    <Form.Control
                                        {...register("comentariocliente")}
                                        value={formData.comentariocliente}
                                        onChange={handleInputChange}
                                        name="comentariocliente"
                                        as="textarea"
                                        rows={3}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col}  className="mb-4" controlId="formGridDate">
                                    <Form.Label className="etiqueta" style={{ color: 'white' }}>Fecha de la cita</Form.Label>
                                    <DatePicker
                                        showIcon
                                        locale="es"
                                        selected={formData.fechacita ? new Date(formData.fechacita) : null}
                                        onChange={handleDateChange}
                                        filterDate={isSunday}
                                        minDate={minDate}
                                        maxDate={maxDate}
                                        dateFormat="yyyy-MM-dd"
                                        className={`calendario form-control ${errors.fechacita ? 'input-error' : ''}`}
                                        name="fechacita"
                                    />
                                    {errors.fechacita && (<div style={{ color: "red" }}>{errors.fechacita.message}</div>)}
                                </Form.Group>
                                <Form.Group as={Col}  className="mb-3" controlId="formGridTime">
                                    <Form.Label className="etiqueta" style={{ color: 'white' }}>Hora de la cita</Form.Label>
                                    <Form.Control
                                        {...register("horacita")}
                                        as="select"
                                        value={formData.horacita}
                                        onChange={handleInputChange}
                                        name="horacita"
                                        className={`form-control ${errors.horacita ? 'input-error' : ''}`}
                                    >
                                        <option value="">Seleccione una hora</option>
                                        <option value="08:00">08:00 AM</option>
                                        <option value="09:00">09:00 AM</option>
                                        <option value="10:00">10:00 AM</option>
                                        <option value="11:00">11:00 AM</option>
                                        <option value="12:00">12:00 PM</option>
                                        <option value="13:00">01:00 PM</option>
                                        <option value="14:00">02:00 PM</option>
                                        <option value="15:00">03:00 PM</option>
                                        <option value="16:00">04:00 PM</option>
                                    </Form.Control>
                                    {errors.horacita && (<div style={{ color: "red" }}>{errors.horacita.message}</div>)}
                                </Form.Group>
                            </Row>
                            <div className="alinearcentro">
                                <Button className="btndec" variant="primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enviando...' : 'Agendar Cita'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Solicitud Enviada</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Su cita ha sido registrada correctamente. Nos pondremos en contacto con usted para confirmar los detalles.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            <Footer />
        </>
    );
}
