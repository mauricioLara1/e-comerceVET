import React, { useContext, useEffect } from 'react'; // Importa React y hooks useContext y useEffect
import { Container, Row, Col, Form, Card, CardGroup, Button } from 'react-bootstrap'; // Importa componentes de React-Bootstrap
import Cabecera from './header'; // Importa el componente Cabecera
import { ShopContext } from './context-shop/context-shop'; // Importa el contexto ShopContext
import './categoriaComida.css'; // Importa los estilos CSS para el componente
import { Link } from 'react-router-dom'; // Importa el componente Link de react-router-dom para la navegación
import { Toaster, toast } from 'sonner'; // Importa componentes para mostrar notificaciones
import Footer from './footer'; // Importa el componente Foote


// Componente principal que muestra productos de la categoría "Comida"
export default function CategoriaComida({ baseInfo, type = "Comida" }) {
    // Obtiene el estado y las funciones del contexto ShopContext
    const { productos, detalleCompra, agregarProducto, filtrarProductos, handleCategory, preFiltrar } = useContext(ShopContext);

    // Actualiza el título del documento cuando el componente se monta
    useEffect(() => {
        document.title = "Comida";
    }, []);

    // Filtra los productos por tipo "Comida" y luego aplica filtros adicionales
    const primerfiltro = preFiltrar(productos, type); // Primer filtro por tipo
    const filtrados = filtrarProductos(primerfiltro); // Filtro adicional

    return (
        <>
            <Cabecera /> {/* Muestra el encabezado */}
            <Container fluid onLoad={() => window.scrollTo({ top: -1000, behavior: "smooth" })}>
                <Row className="justify-content-center">
                    <Col className='col-filtros' xs='3'>
                        <div className='sidebar'>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Comida'>Comida</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Hogar'>Hogar</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Juguetes'>Juguetes</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Salud'>Salud</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Viaje'>Viaje</Link>
                            </div>
                            <div className='div-filtro'>
                                <Link className='filtro-link' to='/Paseo'>Paseo</Link>
                            </div>
                        </div>
                    </Col>
                    <Col className='col-main productos'>
                        <Form.Group className="cmb-filtro" id="formGridCheckbox">
                            <Form.Label htmlFor='category' className='cmb-filtro-label'>Especie Mascota</Form.Label>
                            <Form.Select defaultValue="Escoge..." style={{ width: '200px' }} onChange={handleCategory}>
                                <option value='all'>Todos</option>
                                <option value='Perro'>Perros</option>
                                <option value='Gato'>Gatos</option>
                            </Form.Select>
                        </Form.Group>
                        lo mejor para los peluditos
                        <Container>
                            <div className='row justify-content-center align-items-start'>
                                <CardGroup>
                                    {filtrados.map((producto) => (
                                        <div key={producto.id} className='col col-sm-3'>
                                            <Card>
                                                <Card.Img variant="top" src={producto.productImage}  className='imagenProducto'/> {/* Muestra la imagen del producto */}
                                                <Card.Body className='card-body'>
                                                    <Card.Title className='card-title text-center'>
                                                        <small>{producto.productName}</small> {/* Muestra el nombre del producto */}
                                                    </Card.Title>
                                                    <Card.Text className='card-text text-center'>
                                                        <small className='text-muted'>{producto.precio}</small> {/* Muestra el precio del producto */}
                                                    </Card.Text>
                                                    <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4 agregarCarrito">
                                                        <Toaster richColors expand={false} closeButton /> {/* Muestra notificaciones */}
                                                        {/* Botón para agregar el producto al carrito */}
                                                        <Button className='mx-2 ' variant='outline-success' onClick={() => { agregarProducto(producto.id); toast.info('Producto agregado al carrito') }}>
                                                            Agregar al Carrito
                                                        </Button>
                                                    </div>
                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))}
                                </CardGroup>
                            </div>
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Footer /> {/* Muestra el pie de página */}
        </>
    );
}
