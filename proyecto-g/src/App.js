import logo from './logo.svg';
// import './App.css';
import Carrusel from './componentes/corrusel';
// import Cards from './componentes/cards';
import Footer from './componentes/footer';
import Login from './componentes/login';
import Register from './componentes/register';
// import UserModal from './componentes/modal';
import Inicio from './componentes/inicio';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Categorias from './componentes/categorias';
import CategoriaComida from './componentes/categoriaComida';
import Cabecera from './componentes/header';
import React, { useState } from 'react';
import Carrito from './componentes/carrito';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pqrs from './componentes/pqrs';
import EditarPerfil from './componentes/EditarPerfil';
import Formulario from './componentes/FormularioCitas(1)';
import CategoriaHogar from './componentes/categoriaHogar';
import CategoriaJuguetes from './componentes/categoriaJuguetes';
import CategoriaSalud from './componentes/categoriaSalud';
import CategoriaViaje from './componentes/categoriaViaje';
import CategoriaPaseo from './componentes/categoriaPaseo';
import CategoriaArenas from './componentes/categoriaArenas';
import CorreoContraseña from './componentes/correoContraseña';
import EnlaceContraseña from './componentes/codigoContraseña';
import Dashboard from './componentes/componentes-admin/dashboard';
import Citas from './componentes/componentes-admin/citas';
import Ventas from './componentes/componentes-admin/ventas';
import Inventario from './componentes/componentes-admin/inventario';
import Proveedores from './componentes/componentes-admin/proveedores';
import Servicios from './componentes/componentes-admin/servicios';

function App() {

  const router = createBrowserRouter(

    [
      {
        path: '/',
        element: <Inicio />,
        errorElement: <div>404 Page not found</div> //Crear una pagina que los devuelva al Inicio cuando la caguen
      },
      {
        path: '/Register',
        element: <Register />
      },
      {
        path: '/Login',
        element: <Login />
      },
      {
        path: '/Carrito',
        element: <Carrito />
      },
      {
        path: '/pqrs',
        element: <Pqrs />
      },
      {
        path: '/Editarperfil',
        element: <EditarPerfil />
      },
      {
        path: '/Agendarcita',
        element: <Formulario />
      },
      {
        path: '/Comida',
        element: <CategoriaComida />
      },
      {
        path: '/Hogar',
        element: <CategoriaHogar />
      },
      {
        path: '/Juguetes',
        element: <CategoriaJuguetes />
      },
      {
        path: '/Salud',
        element: <CategoriaSalud />
      },
      {
        path: '/Viaje',
        element: <CategoriaViaje />
      },
      {
        path: '/Paseo',
        element: <CategoriaPaseo />
      },
      {
        path: '/Arenas',
        element: <CategoriaArenas />
      }, {
        path: '/correoContraseña',
        element: <CorreoContraseña />
      },
      {
        path: '/codigoContraseña',
        element: <EnlaceContraseña />
      },
      {
        path: '/Admin',
        element: <Dashboard />,
        children: [
          {
            path: '/Admin/Citas',
            element: <Citas />
          },
          {
            path: '/Admin/Ventas',
            element: <Ventas />
          },
          {
            path: '/Admin/Inventario',
            element: <Inventario />
          },
          {
            path: '/Admin/Servicios',
            element: <Servicios />
          },
          {
            path: '/Admin/Proveedores',
            element: <Proveedores />
          }
        ]
      },
    ]);

  return (


    <div className="App">

      <RouterProvider router={router} />
      {/* <Dashboard/> */}


      {/* <header className='App-header'>
          <Cabecera />
        </header>
        <body>
          <Carrusel />
          <Routes>
            <Route path='/Register' element={<Register />}></Route>
            <Route path='/Cat' element={<CategoriaComida />}></Route>
            <Route path='/Carrito' element={<Carrito />}></Route>
          </Routes>
        </body>
        <footer>
          <Footer />
        </footer> */}

    </div>
  );
}

export default App;
