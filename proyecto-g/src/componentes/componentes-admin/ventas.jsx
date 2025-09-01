import React, { useEffect, useState } from 'react'
import { Col, Form, FormControl, FormGroup, FormLabel, Row, Tab, Tabs } from 'react-bootstrap'
import Cabecera from '../header'
import DataTable from 'react-data-table-component'
import data from "./MOCK_DATA-ventas.json"

export default function Ventas() {

  //Carga inicial de ventas
  const [ventas, setVentas] = useState(data)

  // useEffect(() => {
  //   fetch('https://664d399aede9a2b55652f8ed.mockapi.io/api/citas/solicitudes')
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log(data)
  //       setVentas(data)
  //     })
  // }, [ventas])

  //Columnas de la tabla 
  const columnsVentas = [
    {
      name: "Codigo de venta",
      selector: row => row.codigo_venta
    },
    {
      name: "Fecha",
      selector: row => row.fecha_compra
    },
    {
      name: "Metodo de pago",
      selector: row => row.metodo_compra
    }
  ]

  const columnsProductos = [
    {
      name: "Nombre producto",
      selector: row => row.nombre_producto
    },
    {
      name: "Codigo producto",
      selector: row => row.codigo_producto
    },
    {
      name: "Cantidad",
      selector: row => row.cantidad
    },
    {
      name: "Precio",
      selector: row => row.precio
    }
  ]



  const [selectedRow, setSelectedRow] = useState([])
  const [productos, setProductos] = useState([])
  const[datosUsuario, setDatosUsuario] = useState([])

  useEffect(() => {
    if (selectedRow !== undefined) {
      setProductos(selectedRow.detalle_compra)
      setDatosUsuario(selectedRow.usuario)
    }

    if (selectedRow === undefined) {
      setProductos([])
      setDatosUsuario([])
    }
  }, [selectedRow])



  return (
    <>
      <Cabecera />
      <Tabs
        defaultActiveKey="Ventas a despachar"
        id="tab-ventas"
        className='mb-3'
        fill
        justify
      >

        <Tab eventKey='Ventas a despachar' title='Ventas a despachar'>

          <div>
            <DataTable
              columns={columnsVentas}
              data={ventas}
              fixedHeader
              selectableRows
              onSelectedRowsChange={data => setSelectedRow(data.selectedRows[0])}
              pagination
              responsive
            />
          </div>

          <p>Datos de venta a despachar</p>


          <Row>
            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Codigo venta</FormLabel>
              <FormControl value={selectedRow ? selectedRow.codigo_venta : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha compra</FormLabel>
              <FormControl value={selectedRow ? selectedRow.fecha_compra : ""} disabled />
            </FormGroup>

            <FormLabel>Método de pago</FormLabel>
            <FormControl value={selectedRow ? selectedRow.metodo_compra : ""} disabled />
          </Row>


          <p className='mt-4'>Productos</p>
          <div>
            <DataTable
              columns={columnsProductos}
              data={productos}
              fixedHeader
              onSelectedRowsChange={data => setSelectedRow(data.selectedRows[0])}
              pagination
              responsive
            />
          </div>

          <div className='d-flex justify-content-end gap-2'>
            <FormLabel>Total</FormLabel>
            <input type='text' value={selectedRow ? selectedRow.total_compra : ""} disabled />
          </div>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.direccion : ""} disabled />
            </FormGroup>


            <FormGroup as={Col}>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.barrio : ""} disabled />
            </FormGroup>
          </Row>

          <Row className='mt-4'>
            <FormGroup as={Col}>
              <FormLabel>Nuip</FormLabel>
              <FormControl value={datosUsuario ? datosUsuario.nuip : ""} disabled />
            </FormGroup>

            <FormGroup as={Col}>
              <FormLabel>Nombre</FormLabel>
              <FormControl  value={datosUsuario ? datosUsuario.nombre : ""} disabled />
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

        <Tab eventKey='Ventas despachadas' title='Ventas despachadas'>
          <div>lalalalala</div>
        </Tab>

        <Tab eventKey='Ventas finalizadas' title='Ventas finalizada'>
          <div>xd</div>
        </Tab>


      </Tabs>
    </>
  )
}
