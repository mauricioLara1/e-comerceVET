import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import user from './iconos/login.svg';
import './modal.css';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Componente UserModal
 * Muestra un modal con opciones de perfil y autenticación para el usuario.
 */
export default function UserModal() {
    const [show, setShow] = useState(false);
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    /**
     * Recupera los datos del usuario desde sessionStorage cuando el componente se monta.
     */
    useEffect(() => {
        const usuarioGuardado = sessionStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUsuarioAutenticado(JSON.parse(usuarioGuardado));
        }
    }, []);

    /**
     * Maneja el cierre de sesión del usuario.
     */
  const handleLogout = () => {
    sessionStorage.removeItem('usuario');
    setUsuarioAutenticado(null);
    handleClose(); // Cierra el modal

    // Redirige al usuario a la página de inicio
    window.location.href = '/';
  };

    /**
     * Navega a la página de detalles del usuario.
     */
    const handleViewProfile = () => {
        handleClose();
        navigate('/UserDetails');
    };

    return (
        <>
            <div className='div-user button' onClick={handleShow}>
                <img src={user} alt='logo de usuario' />
            </div>
            <div className='div-modal'>
                <Modal
                    show={show}
                    onHide={handleClose}
                    animation={false}
                    centered
                    style={{ left: '35%', top: '-10%' }}
                    size='sm'
                ><Modal.Header className='modal-header'>
                <div className='modal-header-div'>
                    <h2 className=' usuario'>
                        {usuarioAutenticado ? 
                            <>
                                Bienvenido <br />{usuarioAutenticado.nombre}<br /> 
                                
                            </> 
                            : 
                            <>
                                Bienvenido cliente
                            </> }
                    </h2>
                </div>
            </Modal.Header>
            
                    <Modal.Body>
                        <div className='modal-body-div'>
                            {usuarioAutenticado ? (
                                <>
                                    <Button variant="success" onClick={handleViewProfile} className='mx-2 verperfil'>
                                        Ver Perfil
                                    </Button>
                                    <Button variant="danger" onClick={handleLogout} className='mx-2 cerrarsesion'>
                                        Cerrar Sesión
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to='/Register' >
                                        <Button variant="success" className='mx-2 registrarse' onClick={handleClose}>
                                            Registrarse
                                        </Button>
                                    </Link>
                                    <Link to='/Login'>
                                        <Button variant="outline-success" className='mx-2 iniciarSesion' onClick={handleClose}>
                                            Iniciar Sesión
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
}
