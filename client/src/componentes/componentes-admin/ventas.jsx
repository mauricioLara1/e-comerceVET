import React, { useEffect, useState } from 'react';
import { Col, Form, FormControl, FormGroup, FormLabel, Row, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Toaster, toast } from 'sonner';
import DataTable from 'react-data-table-component';

export default function Ventas() {
  // Estados para almacenar los datos
  const [ventas, setVentas] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [estadosVentas, setEstadosVentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detallesVenta, setDetallesVenta] = useState([]);

  // Estados para la venta seleccionada
  const [selectedRow, setSelectedRow] = useState(null);
  const [productos, setProductos] = useState([]);
  const [datosUsuario, setDatosUsuario] = useState([]);

  // Cargar datos de la API
  useEffect(() => {
    fetch('http://localhost:5000/ventas')
      .then(res => res.json())
      .then(data => setVentas(data));

    fetch('http://localhost:5000/barriosaprovados')
      .then(res => res.json())
      .then(data => setBarrios(data));

    fetch('http://localhost:5000/estadosventas')
      .then(res => res.json())
      .then(data => setEstadosVentas(data));

    fetch('http://localhost:5000/clientes')
      .then(res => res.json())
      .then(data => setClientes(data));

    fetch('http://localhost:5000/detalleventa')
      .then(res => res.json())
      .then(data => setDetallesVenta(data));
  }, []);

  // Actualizar detalles de la venta seleccionada
  useEffect(() => {
    if (selectedRow) {
      const detalles = detallesVenta.filter(detalle => detalle.idventa === selectedRow.idventa);
      const cliente = clientes.find(cliente => cliente.idcliente === selectedRow.idcliente);
      setProductos(detalles);
      setDatosUsuario(cliente);
    }
  }, [selectedRow, detallesVenta, clientes]);

  // Manejadores de ventas
  const despacharVenta = () => {
    try {
      const venta = selectedRow;
  
      fetch(`http://localhost:5000/ventas/despachar/${venta.idventa}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        // Enviar un correo electrónico al cliente
        fetch(`http://localhost:5000/send-sell-email`, {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            cliente: datosUsuario.nombres,
            correo: datosUsuario.correo,
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error enviando el correo');
          }
          return response.text(); // Cambiado a text() para asegurar que se reciba el mensaje de respuesta
        })
        .then(emailData => {
          console.log(emailData);
          toast.success('Correo de notificación enviado exitosamente');
        })
        .catch(error => {
          console.error('Error al enviar el correo:', error);
          toast.error('Error al enviar el correo de notificación');
        });
  
        toast.success('Venta despachada exitosamente');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  

  const finalizarVenta = () => {
    try {
      const venta = selectedRow;
      fetch(`http://localhost:5000/ventas/Finalizar/${venta.idventa}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.success('Venta finalizada exitosamente');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
      
    } catch (error) {
      console.log(error.message)     
    }
  };

  // Columnas de la tabla de ventas
  const columnsVentas = [
    {
      name: "ID Venta",
      selector: row => row.idventa,
      sortable: true
    },
    {
      name: "Fecha",
      selector: row => new Date(row.fechaventa).toLocaleDateString(),
      sortable: true
    },
    {
      name: "Valor Total",
      selector: row => row.valortotal,
      sortable: true
    }
  ];

  // Columnas de la tabla de productos
  const columnsProductos = [
    {
      name: "ID Producto",
      selector: row => row.idproducto
    },
    {
      name: "Cantidad",
      selector: row => row.cantidad
    },
    {
      name: "Valor Total",
      selector: row => row.valortotal
    }
  ];

  // Filtrar ventas según el estado
  const ventasIniciadas = ventas.filter(venta => venta.idestadoventa === 2);
  const ventasDespachadas = ventas.filter(venta => venta.idestadoventa === 3);
  const ventasFinalizadas = ventas.filter(venta => venta.idestadoventa === 4);

  // Estilos personalizados para DataTable
  const customStyles = {
    rows: {
      style: {
        cursor: 'pointer',
        '&:nth-of-type(n)': {
          backgroundColor: row =>
            selectedRow && row.idventa === selectedRow.idventa
              ? '#d3d3d3'
              : 'white',
        },
        '&:hover': {
          backgroundColor: '#d3d3d3',
        },
      },
    },
  };

  return (
    <>
      <Tabs defaultActiveKey="Ventas a despachar" id="tab-ventas" className='mb-3' fill justify>
        <Tab eventKey='Ventas a despachar' title='Ventas a despachar'>
          <div>
            <h1 className='tituloAdmin'>Administrar Ventas a despachar</h1>
          </div>
          <div>
            <DataTable
              columns={columnsVentas}
              data={ventasIniciadas}
              customStyles={customStyles}
              fixedHeader
              onRowClicked={row => setSelectedRow(row)}
              pagination
              responsive
            />
          </div>

          <p>Datos de venta a despachar</p>
          <Row>
            <FormGroup as={Col} className='mt-3'>
              <FormLabel>ID Venta</FormLabel>
              <FormControl value={selectedRow ? selectedRow.idventa : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha compra</FormLabel>
              <FormControl value={selectedRow ? new Date(selectedRow.fechaventa).toLocaleDateString() : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Valor Total</FormLabel>
              <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
            </FormGroup>
          </Row>

          <p className='mt-4'>Productos</p>
          <div>
            <DataTable
              columns={columnsProductos}
              data={productos}
              customStyles={customStyles}
              fixedHeader
              pagination
              responsive
            />
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <FormLabel>Total</FormLabel>
            <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
          </div>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={selectedRow ? selectedRow.direccion : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={selectedRow ? barrios.find(barrio => barrio.idbarrioaprovado === selectedRow.idbarriosaprovado)?.barrioaprovado || "" : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Nuip</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nuipcliente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Nombre</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nombres : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Correo</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.correo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Telefono</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.telefono : ""} disabled />
            </FormGroup>
              <div className='d-flex justify-content-center align-items-center gap-4 my-4 p-4'>
                <Button variant='outline-success' onClick={() => { despacharVenta() }}>Venta Despachada</Button>
              </div>
              <Toaster richColors expand={false} position='top-right' />
          </Row>
        </Tab>

        <Tab eventKey='Ventas despachadas' title='Ventas despachadas'>
          <div>
            <h1 className='tituloAdmin'>Administrar ventas despachadas</h1>
          </div>
          <div>
            <DataTable
              columns={columnsVentas}
              data={ventasDespachadas}
              customStyles={customStyles}
              fixedHeader
              onRowClicked={row => setSelectedRow(row)}
              pagination
              responsive
            />
          </div>

          <p>Datos de venta despachada</p>
          <Row>
            <FormGroup as={Col} className='mt-3'>
              <FormLabel>ID Venta</FormLabel>
              <FormControl value={selectedRow ? selectedRow.idventa : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha compra</FormLabel>
              <FormControl value={selectedRow ? new Date(selectedRow.fechaventa).toLocaleDateString() : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Valor Total</FormLabel>
              <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
            </FormGroup>
          </Row>

          <p className='mt-4'>Productos</p>
          <div>
            <DataTable
              columns={columnsProductos}
              data={productos}
              customStyles={customStyles}
              fixedHeader
              pagination
              responsive
            />
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <FormLabel>Total</FormLabel>
            <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
          </div>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={selectedRow ? selectedRow.direccion : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={selectedRow ? barrios.find(barrio => barrio.idbarrioaprovado === selectedRow.idbarriosaprovado)?.barrioaprovado || "" : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Nuip</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nuipcliente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Nombre</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nombres : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Correo</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.correo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Telefono</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.telefono : ""} disabled />
            </FormGroup>
              <div className='d-flex justify-content-center align-items-center gap-4 my-4 p-4'>
                <Button variant='outline-success' onClick={() => { finalizarVenta() }}>Venta Despachada</Button>
              </div>
              <Toaster richColors expand={false} position='top-right' />
          </Row>
        </Tab>

        <Tab eventKey='Ventas finalizadas' title='Ventas finalizadas'>
          <div>
            <h1 className='tituloAdmin'>Ventas Finalizadas</h1>
          </div>
          <div>
            <DataTable
              columns={columnsVentas}
              data={ventasFinalizadas}
              customStyles={customStyles}
              fixedHeader
              onRowClicked={row => setSelectedRow(row)}
              pagination
              responsive
            />
          </div>

          <p>Datos de venta finalizada</p>
          <Row>
            <FormGroup as={Col} className='mt-3'>
              <FormLabel>ID Venta</FormLabel>
              <FormControl value={selectedRow ? selectedRow.idventa : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha compra</FormLabel>
              <FormControl value={selectedRow ? new Date(selectedRow.fechaventa).toLocaleDateString() : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Valor Total</FormLabel>
              <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
            </FormGroup>
          </Row>

          <p className='mt-4'>Productos</p>
          <div>
            <DataTable
              columns={columnsProductos}
              data={productos}
              customStyles={customStyles}
              fixedHeader
              pagination
              responsive
            />
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <FormLabel>Total</FormLabel>
            <FormControl value={selectedRow ? selectedRow.valortotal : ""} disabled />
          </div>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={selectedRow ? selectedRow.direccion : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={selectedRow ? barrios.find(barrio => barrio.idbarrioaprovado === selectedRow.idbarriosaprovado)?.barrioaprovado || "" : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Nuip</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nuipcliente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Nombre</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nombres : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Correo</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.correo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Telefono</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.telefono : ""} disabled />
            </FormGroup>
          </Row>
        </Tab>
      </Tabs>
    </>
  );
}
