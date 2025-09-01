import React, { useContext } from 'react';
import { ShopContext } from './context-shop/context-shop';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './carritoDetalle.css';

const CarritoDetalle = ({ data }) => {
  const { agregarProducto, removerProducto, actualizarCantidadProducto, detalleCompra } = useContext(ShopContext);
  const { id, productName, precio, productImage } = data;
  const cantidad = detalleCompra[id]?.cantidad || 0;

  const handleCantidadChange = (e) => {
    const nuevaCantidad = parseInt(e.target.value, 10);
    if (nuevaCantidad >= 0 && nuevaCantidad <= 10) {
      actualizarCantidadProducto(id, nuevaCantidad);
    }
  };

  const handleKeyDown = (e) => {
    // Prevenir entrada de teclas no deseadas
    if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown' && e.key !== 'Tab' && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };

  return (
    <Card className="my-2">
      <Card.Body>
        <div className="d-flex align-items-center detalle">
          <img src={productImage} alt={productName} width="50" height="50" className="fotoProducto" />
          <div className="ms-3">
            <Card.Title>{productName}</Card.Title>
            <Card.Text>${precio}</Card.Text>
            <Card.Text>Total: ${cantidad * precio}</Card.Text>
          </div>
          <div className="ms-auto d-flex align-items-center">
            <Button variant="outline-danger" onClick={() => actualizarCantidadProducto(id, cantidad - 1)} disabled={cantidad <= 0}>-</Button>
            <Form.Control
              type="number"
              min="0"
              max="10"
              value={cantidad}
              onChange={handleCantidadChange}
              onKeyDown={handleKeyDown}
              className="cantidad-input mx-2"
            />
            <Button variant="outline-success" onClick={() => actualizarCantidadProducto(id, cantidad + 1)} disabled={cantidad >= 10}>+</Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default CarritoDetalle;
