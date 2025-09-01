import React, { useState, useEffect } from 'react';
import { Form, FormControl, FormGroup, FormLabel, Col, Row, Tab, Tabs, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import './producto.css';

export default function Inventario() {
  const [producto, setProducto] = useState('');
  const [descripccion, setDescripccion] = useState('');
  const [precioventa, setPrecioventa] = useState(0);
  const [idespecie, setIdespecie] = useState(0);
  const [idcategoria, setIdcategoria] = useState(0);
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [newPrecioVenta, setNewPrecioVenta] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/productos/activos');
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  //publicar un producto
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('producto', producto);
    formData.append('descripccion', descripccion);
    formData.append('precioventa', precioventa);
    formData.append('idespecie', idespecie);
    formData.append('idcategoria', idcategoria);
    formData.append('foto', foto);

    fetch('http://localhost:5000/productos', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Producto agregado con éxito!');
        window.location.reload(); // Recargar la página después de agregar el producto
      })
      .catch((error) => {
        console.error('Error al insertar el producto:', error);
        alert('Error al insertar el producto.');
      });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    setFoto(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  const handleRowClick = (row) => {
    setSelectedProduct(row);
    setNewPrecioVenta(row.precioventa);
  };

  const cambiarPrecio = () => {
    if (!selectedProduct) {
      alert('Selecciona un producto para cambiar el precio.');
      return;
    }
    try {
      console.log(selectedProduct.idproducto)
      console.log(newPrecioVenta)
      fetch(`http://localhost:5000/productos/precio/${selectedProduct.idproducto}/precioventa`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({ precioventa: newPrecioVenta }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          alert('Precio del producto actualizado exitosamente');
          window.location.reload(); // Recargar la página después de actualizar el precio
        })
        .catch(error => {
          console.error('Error:', error);
        });
      
    } catch (error) {
      console.log(error.message)
    }
  };

  const borrarProducto = () => {
    if (!selectedProduct) {
      alert('Selecciona un producto para eliminar.');
      return;
    }

    fetch(`http://localhost:5000/productos/borrar/${selectedProduct.idproducto}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('Producto eliminado exitosamente');
        window.location.reload(); // Recargar la página después de eliminar el producto
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const columnsProductos = [
    {
      name: 'ID Producto',
      selector: row => row.idproducto,
      sortable: true,
    },
    {
      name: 'Producto',
      selector: row => row.producto,
      sortable: true,
    },
    {
      name: 'Precio Venta',
      selector: row => row.precioventa,
      sortable: true,
    },
    {
      name: 'ID Categoría',
      selector: row => row.idcategoria,
      sortable: true,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="Administrar productos" id="tab-ventas" className='mb-3' fill justify>
        <Tab eventKey='Administrar productos' title='Administrar productos'>
          <div>
            <h1 className='principalTitulo'>Administrar productos</h1>
            <div className='linia'></div>
            <DataTable
              columns={columnsProductos}
              data={products}
              onRowClicked={handleRowClick}
              customStyles={{
                rows: {
                  style: {
                    cursor: 'pointer',
                    '&:nth-of-type(n)': {
                      backgroundColor: row => selectedProduct && row.idproducto === selectedProduct.idproducto ? '#d3d3d3' : 'white',
                    },
                    '&:hover': {
                      backgroundColor: '#d3d3d3',
                    },
                  },
                },
              }}
              fixedHeader
              pagination
              responsive
            />
            <div className="selected-product-details">
              <h2 className='principalTitulo'>Detalles del Producto Seleccionado</h2>
              <Form>
                <Row>
                  <FormGroup as={Col} className='mt-3'>
                    <FormLabel>ID Producto</FormLabel>
                    <FormControl type="text" value={selectedProduct ? selectedProduct.idproducto : ''} readOnly />
                  </FormGroup>
                  <FormGroup as={Col} className='mt-3'>
                    <FormLabel>Producto</FormLabel>
                    <FormControl type="text" value={selectedProduct ? selectedProduct.producto : ''} readOnly />
                  </FormGroup>
                  <FormGroup as={Col} className='mt-3'>
                    <FormLabel>Precio Venta</FormLabel>
                    <FormControl
                      type="number"
                      value={newPrecioVenta}
                      onChange={(e) => setNewPrecioVenta(parseFloat(e.target.value))}
                    />
                  </FormGroup>
                </Row>
                <FormGroup>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl type="text" value={selectedProduct ? selectedProduct.descripccion : ''} readOnly />
                </FormGroup>
                <Row>
                  <FormGroup as={Col} className='mt-3'>
                    <FormLabel>Especie</FormLabel>
                    <FormControl type="text" value={selectedProduct ? selectedProduct.idespecie : ''} readOnly />
                  </FormGroup>
                  <FormGroup as={Col} className='mt-3'>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl type="text" value={selectedProduct ? selectedProduct.idcategoria : ''} readOnly />
                  </FormGroup>
                </Row>
              </Form>
            </div>
            <div className='d-flex justify-content-center align-items-center gap-4 my-4 p-4'>
              <Button variant='outline-danger' onClick={borrarProducto}>Eliminar Producto</Button>
              <Button variant='outline-primary' onClick={cambiarPrecio}>Cambiar Precio</Button>
            </div>
          </div>
        </Tab>
        <Tab eventKey='Agregar un Producto' title='Agregar un Producto'>
          <div className="inventario-container">
            <h1 className='principalTitulo'>Agregar Producto</h1>
            <form onSubmit={handleSubmit} className="inventario-form">
              <label>
                Nombre del Producto:
                <input
                  type="text"
                  value={producto}
                  onChange={(e) => setProducto(e.target.value)}
                  required
                />
              </label>
              <label>
                Descripción:
                <input
                  type="text"
                  value={descripccion}
                  onChange={(e) => setDescripccion(e.target.value)}
                  required
                />
              </label>
              <label>
                Precio de Venta:
                <input
                  type="number"
                  value={precioventa}
                  onChange={(e) => setPrecioventa(parseFloat(e.target.value))}
                  required
                />
              </label>
              <label>
                Especie:
                <select
                  value={idespecie}
                  onChange={(e) => setIdespecie(parseInt(e.target.value, 10))}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="2">Perro</option>
                  <option value="1">Gato</option>
                </select>
              </label>
              <label>
                Categoría:
                <select
                  value={idcategoria}
                  onChange={(e) => setIdcategoria(parseInt(e.target.value, 10))}
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="1">Comida</option>
                  <option value="2">Hogar</option>
                  <option value="3">Juguetes</option>
                  <option value="4">Salud</option>
                  <option value="5">Viaje</option>
                  <option value="6">Paseo</option>
                </select>
              </label>
              <label>
                Foto:
                <input type="file" onChange={handleFotoChange} required />
              </label>
              {preview && (
                <div className="preview">
                  <p>Previsualización de la imagen:</p>
                  <img src={preview} alt="Preview" className='fotoproducto'/>
                </div>
              )}
              <button type="submit">Agregar Producto</button>
            </form>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
