import { Navigate } from 'react-router-dom';

function AdminRoute({ children }) {
  const usuarioAutenticado = JSON.parse(sessionStorage.getItem('usuario'));

  if (!usuarioAutenticado) {
    return <Navigate to="/Login" />;
  }

  if (usuarioAutenticado.idroll !== 2) {
    return <Navigate to="/NoAccess" />; // Redirige a una página de acceso denegado si no es admin
  }

  return children;
}

export default AdminRoute;
