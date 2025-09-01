import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { PRODUCTS } from './productosoferta';
import './carruselDescuentos.css'

export default function CarruselDescuentos() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} bsPrefix='' >
            {PRODUCTS.map((producto) => (
                <Carousel.Item className='carrusel-elem'>
                    <div className="card-wrapper">
                    <Card className='tarjeta-carrusel'>
                        <div className='img-wrapper'>
                            <Card.Img variant="top" src={producto.productImage}  className='maximos'/>
                        </div>
                        <Card.Body className='card-body'>
                            <Card.Title className='card-title text-center'> <small>{producto.productName}</small></Card.Title>
                            <Card.Text className='card-text text-center'>
                                <small className='text-muted'>{producto.precio}</small>
                            </Card.Text>
                            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <Button className='mx-2' variant='outline-success'>Agregar Al Carrito</Button>
                                {/* onClick={() => agregarProducto(producto.id)} */}
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className='tarjeta-carrusel'>
                        <div className='img-wrapper'>
                            <Card.Img variant="top" src={producto.productImage}   className='maximos'/>
                        </div>
                        <Card.Body className='card-body'>
                            <Card.Title className='card-title text-center'> <small>{producto.productName}</small></Card.Title>
                            <Card.Text className='card-text text-center'>
                                <small className='text-muted'>{producto.precio}</small>
                            </Card.Text>
                            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <Button className='mx-2' variant='outline-success'>Agregar Al Carrito</Button>
                                {/* onClick={() => agregarProducto(producto.id)} */}
                            </div>
                        </Card.Body>
                    </Card>
                    <Card className='tarjeta-carrusel'>
                        <div className='img-wrapper'>
                            <Card.Img variant="top" src={producto.productImage}   className='maximos'/>
                        </div>
                        <Card.Body className='card-body'>
                            <Card.Title className='card-title text-center'> <small>{producto.productName}</small></Card.Title>
                            <Card.Text className='card-text text-center'>
                                <small className='text-muted'>{producto.precio}</small>
                            </Card.Text>
                            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                <Button className='mx-2' variant='outline-success'>Agregar Al Carrito</Button>
                                {/* onClick={() => agregarProducto(producto.id)} */}
                            </div>
                        </Card.Body>
                    </Card>
                    </div>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}
