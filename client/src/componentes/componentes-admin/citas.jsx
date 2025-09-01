import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Col, Form, FormControl, FormGroup, FormLabel, Row, Tab, Tabs } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Toaster, toast } from 'sonner';
import Cabecera from '../header';
import "./citas.css";

export default function Citas() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [citasInfoRechazadas, setCitasInfoRechazadas] = useState([]);
  const [citasInfoSolicitud, setCitasInfoSolicitud] = useState([]);
  const [citasInfoAceptadas, setCitasInfoAceptadas] = useState([]);
  const [citasInfoFinalizadas, setCitasInfoFinalizadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [selectedRow, setSelectedRow] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citasRes, serviciosRes, tiposDomicilioRes, mascotasRes, barriosRes, estadosCitaRes, clientesRes] = await Promise.all([
          fetch('http://localhost:5000/citas').then(res => res.json()),
          fetch('http://localhost:5000/servicios').then(res => res.json()),
          fetch('http://localhost:5000/tiposdomicilios').then(res => res.json()),
          fetch('http://localhost:5000/mascotascitas').then(res => res.json()),
          fetch('http://localhost:5000/barriosaprovados').then(res => res.json()),
          fetch('http://localhost:5000/estadocita').then(res => res.json()),
          fetch('http://localhost:5000/clientes').then(res => res.json())
        ]);

        const citas = citasRes.map(cita => ({
          ...cita,
          servicio: serviciosRes.find(servicio => servicio.idservicio === cita.idservicio)?.servicio || "N/A",
          tipoDomicilio: tiposDomicilioRes.find(tipo => tipo.idtipodomicilio === cita.idtipodomicilio)?.tipodomicilio || "N/A",
          mascota: mascotasRes.find(mascota => mascota.idmascota === cita.idmascota)?.nombremascota || "N/A",
          raza: mascotasRes.find(mascota => mascota.idmascota === cita.idmascota)?.raza || "N/A",
          barrio: barriosRes.find(barrio => barrio.idbarrioaprovado === cita.idbarrioaprovado)?.barrioaprovado || "N/A",
          estado: estadosCitaRes.find(estado => estado.idestadocita === cita.idestadocita)?.estadocita || "N/A",
          cliente: clientesRes.find(cliente => cliente.idcliente === cita.idcliente)?.nombres || "N/A",
          nuip: clientesRes.find(cliente => cliente.idcliente === cita.idcliente)?.nuipcliente || "N/A",
          correo: clientesRes.find(cliente => cliente.idcliente === cita.idcliente)?.correo || "N/A",
          telefono: clientesRes.find(cliente => cliente.idcliente === cita.idcliente)?.telefono || "N/A"
        }));

        const rechazadas = citas.filter(cita => cita.idestadocita === 1);
        const solicitudes = citas.filter(cita => cita.idestadocita === 2);
        const aceptadas = citas.filter(cita => cita.idestadocita === 3);
        const finalizadas = citas.filter(cita => cita.idestadocita === 4);

        setCitasInfoRechazadas(rechazadas);
        setCitasInfoSolicitud(solicitudes);
        setCitasInfoAceptadas(aceptadas);
        setCitasInfoFinalizadas(finalizadas);
        setCargando(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const aceptarUnaCita = () => {
    try {
      const cita = selectedRow[0];
      fetch(`http://localhost:5000/citas/aceptar/${cita.idcitas}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.success('Cita aceptada');
        
        // Llamada para enviar el correo
        fetch(`http://localhost:5000/send-acceptance-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idcitas: cita.idcitas,
            cliente: cita.cliente,
            servicio: cita.servicio,
            fecha: cita.fechacita.split("T")[0],
            hora: cita.horacita,
            correo: cita.correo
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Correo enviado:', data);
        })
        .catch(error => {
          console.error('Error enviando el correo:', error);
        });
        
        // Recargar la página o actualizar el estado de la aplicación
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const rechazarUnaCita = () => {
    try {
      const cita = selectedRow[0];
      fetch(`http://localhost:5000/citas/rechazar/${cita.idcitas}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.error('Cita rechazada');
        // Llamada para enviar el correo
        return fetch(`http://localhost:5000/send-rejected-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idcitas: cita.idcitas,
            cliente: cita.cliente,
            servicio: cita.servicio,
            fecha: cita.fechacita.split("T")[0],
            hora: cita.horacita,
            correo: cita.correo
          })
        });
      })
      .then(response => response.json())
      .then(data => {
        console.log('Correo enviado:', data);
        // Actualiza el estado de la aplicación o realiza cualquier acción adicional necesaria
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  

  const finalizarUnaCita = () => {
    try {
      const cita = selectedRow[0];
      fetch(`http://localhost:5000/citas/finalizar/${cita.idcitas}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.success('Cita finalizada');
        
        // Llamada para enviar el correo
        fetch(`http://localhost:5000/send-completion-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            idcitas: cita.idcitas,
            cliente: cita.cliente,
            servicio: cita.servicio,
            fecha: cita.fechacita.split("T")[0],
            hora: cita.horacita,
            correo: cita.correo
          })
        })
        .then(response => response.json())
        .then(data => {
          console.log('Correo enviado:', data);
        })
        .catch(error => {
          console.error('Error enviando el correo:', error);
        });
  
        // Recargar la página o actualizar el estado de la aplicación
        window.location.reload();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    } catch (error) {
      console.log(error.message);
    }
  };
  

  const columns = [
    { name: "Codigo cita", selector: row => row.idcitas,sortable: true },
    { name: "Dueño paciente", selector: row => row.cliente },
    { name: "Raza paciente", selector: row => row.raza },
    { name: "Fecha solicitud", selector: row => row.fechacita },
    { name: "Estado", selector: row => row.estado, sortable: true }
  ];

  const onRowClicked = row => {
    setSelectedProduct(row);
  };


  const conditionalRowsStyles = [
    {
      when: row => row.estado === "Aceptada",
      style: { backgroundColor: 'rgb(131, 230, 152)' },
    },
    {
      when: row => row.estado === "Rechazada",
      style: { backgroundColor: 'rgba(255, 106, 89, 1)' },
    }
  ];

  const handleRowClicked = (row) => {
    setSelectedRow([row]);
  };

  const customStyles = {
    rows: {
      style: {
        cursor: 'pointer',
        '&:nth-of-type(n)': {
          backgroundColor: row => 
            selectedProduct && row.idproductointrahospitalario === selectedProduct.idproductointrahospitalario 
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
      <Tabs defaultActiveKey="Solicitudes" id="tab-ventas" className='mb-3' fill justify>
        <Tab eventKey='Solicitudes' title='Solicitudes citas'>
          <div>
            <h1 className='tituloAdmin'>
              Administrar Solicitudes Citas
            </h1>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={citasInfoSolicitud}
              fixedHeader
              conditionalRowStyles={conditionalRowsStyles}
              onRowClicked={handleRowClicked}
              pagination
              progressPending={cargando}
              responsive
              customStyles={customStyles}
            />
          </div>

          <div>
            <Form className='my-4'>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Codigo Cita</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].idcitas : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].fechacita.split("T")[0] : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Hora</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].horacita : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup>
                <FormLabel className='mt-3'>Descripción</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].comentariocliente : ""} disabled />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>Direccion</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].direccion : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>Barrio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].barrio : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup as={Col} className='mt-3'>
                <FormLabel className='mt-3'>correo</FormLabel>
                <FormControl value={selectedRow[0] ? selectedRow[0].correo : ""} disabled />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mt-3'>nombres</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].cliente : ""} disabled />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>nombre mascota</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].mascota : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>raza</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
                </FormGroup>
              </Row>
            </Form>

            <div className='d-grid gap-2'>
              <div className='buttonContainer'>
                <Button className='customButton mt-3 finalizar' variant='outline-success'  onClick={aceptarUnaCita}>Aceptar Solicitud</Button>
                <Button className='customButton mt-3  finalizar' variant='outline-danger'  onClick={rechazarUnaCita}>Rechazar Solicitud</Button>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey='Citas Aceptadas' title='Citas Aceptadas'>
          <div>
            <h1 className='tituloAdmin'>
              Administrar Citas Aceptadas
            </h1>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={citasInfoAceptadas}
              fixedHeader
              conditionalRowStyles={conditionalRowsStyles}
              onRowClicked={handleRowClicked}
              pagination
              progressPending={cargando}
              responsive
              customStyles={customStyles}
            />
          </div>

          <div>
            <Form className='my-4'>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Codigo Cita</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].idcitas : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].fechacita.split("T")[0] : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Hora</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].horacita : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup>
                <FormLabel className='mt-3'>Descripción</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].comentariocliente : ""} disabled />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>Direccion</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].direccion : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>Barrio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].barrio : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup as={Col} className='mt-3'>
                <FormLabel className='mt-3'>correo</FormLabel>
                <FormControl value={selectedRow[0] ? selectedRow[0].correo : ""} disabled />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mt-3'>nombres</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].cliente : ""} disabled />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>nombre mascota</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].mascota : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>raza</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
                </FormGroup>
              </Row>
            </Form>

            <div className='d-grid gap-2'>
              <div className='buttonContainer'>
                  <Button className='customButton finalizar' variant='outline-success' size='lg' onClick={finalizarUnaCita}>
                    Finalizar Cita
                  </Button>
              </div>
            </div>
          </div>
        </Tab>
        <Tab eventKey='Citas Finalizadas' title='Citas Finalizadas'>
          <div>
            <h1 className='tituloAdmin'>
              Administrar Citas Finalizadas
            </h1>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={citasInfoFinalizadas}
              fixedHeader
              conditionalRowStyles={conditionalRowsStyles}
              onRowClicked={handleRowClicked}
              pagination
              progressPending={cargando}
              responsive
              customStyles={customStyles}
            />
          </div>

          <div>
            <Form className='my-4'>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Codigo Cita</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].idcitas : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].fechacita.split("T")[0] : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Hora</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].horacita : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup>
                <FormLabel className='mt-3'>Descripción</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].comentariocliente : ""} disabled />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>Direccion</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].direccion : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>Barrio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].barrio : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup as={Col} className='mt-3'>
                <FormLabel className='mt-3'>correo</FormLabel>
                <FormControl value={selectedRow[0] ? selectedRow[0].correo : ""} disabled />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mt-3'>nombres</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].cliente : ""} disabled />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>nombre mascota</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].mascota : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>raza</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
                </FormGroup>
              </Row>
            </Form>
          </div>
        </Tab>
        <Tab eventKey='Citas Rechazadas' title='Citas Rechazadas'>
          <div>
            <h1 className='tituloAdmin'>
              Administrar Citas Rechazadas
            </h1>
          </div>
          <div>
            <DataTable
              columns={columns}
              data={citasInfoRechazadas}
              fixedHeader
              conditionalRowStyles={conditionalRowsStyles}
              onRowClicked={handleRowClicked}
              pagination
              progressPending={cargando}
              responsive
              customStyles={customStyles}
            />
          </div>

          <div>
            <Form className='my-4'>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Codigo Cita</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].idcitas : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Servicio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].servicio : ""} disabled />
                </FormGroup>
              </Row>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Fecha</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].fechacita.split("T")[0] : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel>Hora</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].horacita : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup as={Col} className='mt-3'>
                <FormLabel className='mt-3'>Descripción</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].comentarioclientecliente : ""} disabled />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>Direccion</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].direccion : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>Barrio</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].barrio : ""} disabled />
                </FormGroup>
              </Row>
              <FormGroup as={Col} className='mt-3'>
                <FormLabel className='mt-3'>correo</FormLabel>
                <FormControl value={selectedRow[0] ? selectedRow[0].correo : ""} disabled />
              </FormGroup>
              <FormGroup>
                <FormLabel className='mt-3'>nombres</FormLabel>
                <FormControl as="textarea" value={selectedRow[0] ? selectedRow[0].cliente : ""} disabled />
              </FormGroup>
              <Row>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>nombre mascota</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].mascota : ""} disabled />
                </FormGroup>
                <FormGroup as={Col} className='mt-3'>
                  <FormLabel className='mt-3'>raza</FormLabel>
                  <FormControl value={selectedRow[0] ? selectedRow[0].raza : ""} disabled />
                </FormGroup>
              </Row>
            </Form>
          </div>
        </Tab>
      </Tabs>
    </>
  );
}
