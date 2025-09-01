import React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Carrusel from './componentes/corrusel';
import Footer from './componentes/footer';
import Login from './componentes/login';
import Register from './componentes/register';
import Inicio from './componentes/inicio';
import Categorias from './componentes/categorias';
import CategoriaComida from './componentes/categoriaComida';
import Cabecera from './componentes/header';
import Carrito from './componentes/carrito';
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
import MostrarProductos from './componentes/componentes-admin/mostrarProductosPrueba';
import PrivateRoute from './PrivateRoute'; // Importa el PrivateRoute
import AdminRoute from './AdminRoute'; // Importa el AdminRoute
import UserDetails from './componentes/UserDetails';
import NoAccess from './componentes/NoAccess'; // Importa el componente NoAccess

function App() {
  const router = createBrowserRouter([
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
    },
    {
      path: '/correoContraseña',
      element: <CorreoContraseña />
    },
    {
      path: '/codigoContraseña',
      element: <EnlaceContraseña />
    },
    {
      path: '/UserDetails',
      element: (
        <PrivateRoute>
          <UserDetails />
        </PrivateRoute>
      )
    },
    {
      path: '/Admin',
      element: (
        <AdminRoute>
          <Dashboard />
        </AdminRoute>
      ),
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
        },
        {
          path: '/Admin/mostrarProductosPrueba',
          element: <MostrarProductos />
        }
      ]
    },
    {
      path: '/NoAccess',
      element: <NoAccess />
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
