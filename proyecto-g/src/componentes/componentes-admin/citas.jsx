import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import data from "./MOCK_DATA.citas.json"
import { Col, Form, FormControl, FormGroup, FormLabel, Row } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';

import "./citas.css"
import { Toaster, toast } from 'sonner';
import Cabecera from '../header';

export default function Citas() {
  //Lugar donde se guardan las citas al cargarse
  const [citasInfo, setCitasInfo] = useState([])

  //Activa-descativa animacion de carga
  const [cargando, setCargando] = useState(true)

  //Funcion que llama los datos
  useEffect(() => {
    fetch('https://664d399aede9a2b55652f8ed.mockapi.io/api/citas/solicitudes')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setCitasInfo(data)
        setCargando(false)
      })
  }, [cargando])

  const actualizarEstado = () => {
    const cita = selectedRow[0]
    fetch(`https://664d399aede9a2b55652f8ed.mockapi.io/api/citas/solicitudes/${cita.codigo}`, {
      method: "PUT",
      body: JSON.stringify(cita),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    // .then(response => response.json())
    // .then(() =>{
    //   <Toaster/>
    //   toast.success('Cita actualizada')
    // })

  }

  const columns = [
    {
      name: "Codigo cita",
      selector: row => row.codigo
    },
    {
      name: "Dueño paciente",
      selector: row => row.dueno_paciente
    },
    {
      name: "Raza paciente",
      selector: row => row.raza
    },
    {
      name: "Fecha solicitud",
      selector: row => row.fecha_solicitud,

    },
    {
      name: "Estado",
      selector: row => row.estado,
      sortable: true
    },
  ]

  const conditionalRowsStyles = [
    {
      when: row => row.estado === "Aceptada",
      style: {
        backgroundColor: 'rgb(131, 230, 152)'
      },
    },
    {
      when: row => row.estado === "Rechazada",
      style: {
        backgroundColor: 'rgba(255, 106, 89, 1)'
      },
    },
  ]


  const [selectedRow, setSelectedRow] = useState([])
  const [toggledClearRows, setToggleClearRows] = React.useState(false);
  // const [estadosCitas, setEstadosCitas] = useState([data])

  const handleChange = (state) => {
    setSelectedRow(state.selectedRows)
    console.log("citas seleccionadas",selectedRow)
  }

  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  }

  const aceptarCita = () => {
    const seleccion = selectedRow[0]
    if (seleccion) {
      seleccion.estado = "Aceptada"
      setSelectedRow(seleccion)
      handleClearRows()
      toast.success('Cita aceptada')
      // console.log("Cita cambiada",estadosCitas)
    }
  }
  const rechazarCita = () => {
    const seleccion = selectedRow[0]
    if (seleccion) {
      seleccion.estado = "Rechazada"
      setSelectedRow(seleccion)
      toast.error('Cita rechazada')
    }
  }


  return (
    <>
      <Cabecera />
      <div className=''>
        <DataTable
          columns={columns}
          data={citasInfo}
          fixedHeader
          selectableRows
          conditionalRowStyles={conditionalRowsStyles}
          onSelectedRowsChange={handleChange}
          pagination
          progressPending={cargando}
          responsive
        />
      </div>

      <div>
        <Form className='my-4'>
          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Codigo Cita</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].codigo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Servicio</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
            </FormGroup>

          </Row>
          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Fecha</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].fecha_solicitud : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Hora</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].hora_solicitud : ""} disabled />
            </FormGroup>
          </Row>

          <FormGroup>
            <FormLabel className='mt-3'>Descripción</FormLabel>
            <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].descripcion : ""} disabled />
          </FormGroup>

          <FormGroup>
            <FormLabel className='mt-3'>Tipo de Domicilio</FormLabel>
            <FormControl value={selectedRow[0] ? selectedRow[0].tipo_domicilio : ""} disabled />
          </FormGroup>

          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Dirección</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].direccion : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Barrio</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].barrio : ""} disabled />
            </FormGroup>

          </Row>

          <p className='mt-3 d-flex'>Datos de Dueño <hr className='separator' /></p>

          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Nombre Completo</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].dueno_paciente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>NUIP</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].nuip : ""} disabled />
            </FormGroup>

          </Row>

          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Correo Electrónico</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].correo : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Telefono</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].telefono : ""} disabled />
            </FormGroup>

          </Row>

          <p className='mt-3 d-flex'>Datos de Mascota <hr className='separator' /></p>

          <Row>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Nombre de Mascota</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].paciente : ""} disabled />
            </FormGroup>

            <FormGroup as={Col} className='mt-3'>
              <FormLabel>Raza de Mascota</FormLabel>
              <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
            </FormGroup>

          </Row>

          <Toaster richColors expand={false} position='top-right' />
          <div className='d-flex justify-content-center align-items-center gap-4 my-4 p-4'>

            <Button variant='outline-success' onClick={() => { aceptarCita(); actualizarEstado() }} >Aceptar Solicitud</Button>
            <Button variant='outline-danger' onClick={() => { rechazarCita(); actualizarEstado() }} >Rechazar Solicitud</Button>
          </div>
        </Form>
      </div>

    </>
  )
}
