import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import { CardGroup } from 'react-bootstrap';
import { PRODUCTS } from './productos';
import './cards.css'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


export default function Cards() {
    return (
        <>
            <div className='card-cont'>
                <Row>
                    <Col>
                        {PRODUCTS.map((producto) => (
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={producto.productImage} />
                                <Card.Body className='card-body'>
                                    <Card.Title className='card-title'> {producto.productName}</Card.Title>
                                    <Card.Text className='card-text'>
                                        {producto.precio}
                                    </Card.Text>
                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                                        <Button className='mx-2' variant='outline-success' >Agregar Al Carrito</Button>
                                    </div>
                                </Card.Body>
                            </Card>

                        ))}
                    </Col>
                </Row>
            </div>
        </>

    )
}
