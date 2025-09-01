import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const usuarioAutenticado = JSON.parse(sessionStorage.getItem('usuario'));

  return usuarioAutenticado ? children : <Navigate to="/Login" />;
}

export default PrivateRoute;
