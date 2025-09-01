import { React, useState } from "react";
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormCheck, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import Image from 'react-bootstrap/Image';
import check from "./imagenes/check confirmed or.png"
import './NotificacionCitas.css'



export default function NotificacionCodigo({ modificarModal, modificarbtnModal, modificarRuta, modificarColor }) {
    const myModal = document.getElementById('myModal')
    const myInput = document.getElementById('myInput')
    //const{show,setShow}=useState(false)

    return (

        <>
            <div className="botonEnviar">
                <button type="button" className='btnEnviar' data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    {modificarbtnModal}
                </button>
            </div>


            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header">
                            {/* <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1> */}
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="modal-body text-center">
                            <img src={check}
                                alt="check verde"
                                fluid
                                style={{ width: '100px', height: '100px', marginBottom: '50px' }} // Establece el tamaño de la imagen
                                className="mx-auto" // Centra la imagen horizontalmente

                            ></img>

                            <h2 className="codigoC">{modificarModal}</h2>
                        </div>
                        <div class="modal-footer">
                            <button type="button" id="btncontinue" class="btn btn-primary" data-bs-dismiss="modal">Continuar</button>
                            {/* <button type="button" class="btn btn-primary">Understood</button> */}
                        </div>


                    </div>
                </div>
            </div>



        </>
    )

}