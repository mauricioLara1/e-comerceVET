import React from 'react'
import './pqrs.css'

import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import Cabecera from './header'

export default function Pqrs() {
    return (
        <>
        <Cabecera/>
            <div className='formulario-div'>

                <Container className='formulario-div-container'>
                    <Row>
                        <Col>
                            <div className='d-flex flex-column ms-5 formulario-div-container-form'>
                                <div className='text-center'>
                                    {/* incluir logo veterinaria */}
                                    <h4>Tu opinión nos importa</h4>
                                    <p>Bienvenido</p>
                                </div>
                                <Form>
                                    <Row>
                                        <FormGroup className='mb-4' >
                                            <Form.Label>Asunto</Form.Label>
                                            <Form.Select defaultValue="Elija...">
                                                <option>Elija...</option>
                                                <option>Peticion</option>
                                                <option>Queja</option>
                                                <option>Reclamo</option>
                                                <option>Sugerencia</option>
                                            </Form.Select>
                                        </FormGroup>

                                        <FormGroup className='mb-4' >
                                            <Form.Label>Descripción</Form.Label>
                                            <Form.Control as="textarea" rows={3} />
                                        </FormGroup>

                                        <div className='text-center pt-1 mb-5 pb-1 div-pqrs-button'>
                                            <Button className='mb-4 w-100 gradient-custom-2' variant='secondary' type='submit'>Enviar</Button>
                                        </div>

                                    </Row>
                                </Form>
                            </div>
                        </Col>

                        <Col>
                            <div className='d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4'>

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
        </>
    )
}
