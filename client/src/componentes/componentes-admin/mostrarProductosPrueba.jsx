import React, { useEffect, useState } from 'react';
import { Form, FormControl, FormGroup, FormLabel, Col, Row, Tab, Tabs, Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import './prueba.css';

export default function MostrarProductos() {
  const [nombreproductointrahospitalario, setNombreProductoIntrahospitalario] = useState('');
  const [preciocompra, setPrecioCompra] = useState('');
  const [descripccion, setDescripccion] = useState('');
  const [inventarioactual, setInventarioActual] = useState('');
  const [mininventariorecomendado, setMinInventarioRecomendado] = useState('');

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [lotes, setLotes] = useState([]);
  const [salidas, setSalidas] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/productosintrahospitalarios/activos');
        if (!response.ok) {
          throw new Error('Error al obtener productos');
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
  }, [selectedProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/productosIntrahospitalarios', {
        method: 'POST',
        body: JSON.stringify({
          nombreProductoIntrahospitalario: nombreproductointrahospitalario,
          preciocompra: preciocompra,
          descripccion: descripccion,
          inventarioactual: inventarioactual,
          mininventariorecomendado: mininventariorecomendado,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setProducts([...products, data]);
      alert('Producto agregado con éxito!');
    } catch (error) {
      console.error('Error al insertar el producto:', error);
      alert('Error al insertar el producto.');
    }
  };

  const handleRowClick = (row) => {
    setSelectedProduct(row);
  };

  const handleUpdate = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`http://localhost:5000/productosIntrahospitalarios/${selectedProduct.idproductointrahospitalario}`, {
        method: 'PUT',
        body: JSON.stringify({
          preciocompra: selectedProduct.preciocompra,
          inventarioactual: selectedProduct.inventarioactual,
          mininventariorecomendado: selectedProduct.mininventariorecomendado,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setProducts(products.map(product => product.idproductointrahospitalario === data.idproductointrahospitalario ? data : product));
      alert('Producto actualizado con éxito!');
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      alert('Error al actualizar el producto.');
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;

    try {
      const response = await fetch(`http://localhost:5000/productosIntrahospitalarios/${selectedProduct.idproductointrahospitalario}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();
      setProducts(products.filter(product => product.idproductointrahospitalario !== data.idproductointrahospitalario));
      setSelectedProduct(null);
      alert('Producto eliminado con éxito!');
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto.');
    }
  };

  const columnsProductosIntra = [
    {
      name: 'ID Producto Intrahospitalario',
      selector: row => row.idproductointrahospitalario,
      sortable: true,
    },
    {
      name: 'Nombre del Producto',
      selector: row => row.nombreproductointrahospitalario,
      sortable: true,
    },
    {
      name: 'Inventario Actual',
      selector: row => row.inventarioactual,
      sortable: true,
    }
  ];

  const conditionalRowStyles = [
    {
      when: row => row.inventarioactual <= row.mininventariorecomendado,
      style: {
        backgroundColor: 'red',
        color: 'white',
      },
    },
  ];

  const columnsLotes = [
    {
      name: 'ID Lote',
      selector: row => row.idloteproducto,
      sortable: true,
    },
    {
      name: 'Cantidad Lote',
      selector: row => row.cantlote,
      sortable: true,
    },
    {
      name: 'Fecha de Compra',
      selector: row => row.compralote,
      sortable: true,
    },
    {
      name: 'Fecha de Vencimiento',
      selector: row => row.vecimientolote,
      sortable: true,
    }
  ];

  const columnsSalidas = [
    {
      name: 'ID Salida',
      selector: row => row.idsalidaproducto,
      sortable: true,
    },
    {
      name: 'Fecha de Salida',
      selector: row => row.fechasalida,
      sortable: true,
    },
    {
      name: 'Cantidad',
      selector: row => row.cantidad,
      sortable: true,
    }
  ];

  return (
    <Tabs defaultActiveKey="Administrar Productos" id="tab-ventas" className='mb-3' fill justify>
      <Tab eventKey='Administrar Productos' title='Administrar Productos'>
        <div className='adminProducts'>
          <h1  className='principalTitulo'>Lista de Productos</h1>
          <DataTable
            columns={columnsProductosIntra}
            data={products}
            onRowClicked={handleRowClick}
            conditionalRowStyles={conditionalRowStyles}
            customStyles={{
              rows: {
                style: {
                  cursor: 'pointer',
                  '&:nth-of-type(n)': {
                    backgroundColor: row => selectedProduct && row.idproductointrahospitalario === selectedProduct.idproductointrahospitalario ? '#d3d3d3' : 'white',
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
          <div>
            <h2  className='principalTitulo'>Detalles del Producto</h2>
            <Form>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>ID Producto</FormLabel>
                  <FormControl type='text' value={selectedProduct ? selectedProduct.idproductointrahospitalario : ''} readOnly />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Nombre del Producto</FormLabel>
                  <FormControl type='text' value={selectedProduct ? selectedProduct.nombreproductointrahospitalario : ''} readOnly />
                </FormGroup>
              </Row>
              <FormGroup as={Col} className='mt-3'>
                <FormLabel>Descripción</FormLabel>
                <FormControl type='text' value={selectedProduct ? selectedProduct.descripccion : ''} readOnly />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Precio de Compra</FormLabel>
                  <FormControl 
                    type='text' 
                    value={selectedProduct ? selectedProduct.preciocompra : ''} 
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, preciocompra: e.target.value })}
                  />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Inventario Actual</FormLabel>
                  <FormControl 
                    type='text' 
                    value={selectedProduct ? selectedProduct.inventarioactual : ''} 
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, inventarioactual: e.target.value })}
                  />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Mínimo de Inventario Recomendado</FormLabel>
                  <FormControl 
                    type='text' 
                    value={selectedProduct ? selectedProduct.mininventariorecomendado : ''} 
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, mininventariorecomendado: e.target.value })}
                  />
                </FormGroup>
              </Row>
              <div className='centrar'>
              <Button className='mt-3 customButton' variant='outline-primary' onClick={handleUpdate}>Actualizar Producto</Button>
              <Button className='mt-3 customButton' variant='outline-danger' onClick={handleDelete}>Eliminar Producto</Button>

              </div>
            </Form>
          </div>
        </div>
      </Tab>
      <Tab eventKey='Agregar Productos' title='Agregar Productos'>
        <div className="inventario-container">
          <h1  className='principalTitulo'>Agregar Productos</h1>
          <form onSubmit={handleSubmit} className="inventario-form">
            <label>
              Nombre del Producto:
              <input 
                type="text" 
                value={nombreproductointrahospitalario}
                onChange={(e) => setNombreProductoIntrahospitalario(e.target.value)}
                required
              />
            </label>
            <label>
              Precio de Compra:
              <input 
                type="text" 
                value={preciocompra}
                onChange={(e) => setPrecioCompra(e.target.value)}
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
              Inventario Actual:
              <input 
                type="number" 
                value={inventarioactual}
                onChange={(e) => setInventarioActual(parseInt(e.target.value))}
                required
              />
            </label>
            <label>
              Mínimo de Inventario Recomendado:
              <input 
                type="number" 
                value={mininventariorecomendado}
                onChange={(e) => setMinInventarioRecomendado(parseInt(e.target.value))}
                required
              />
            </label>
            <button type="submit" >Agregar Producto</button>
          </form>
        </div>
      </Tab>
    </Tabs>
  );
}
