import React, { useEffect, useState } from 'react';
import './UserDetails.css'; 
import Footer from './footer';
import Cabecera from './header';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

/**
 * Schema de validación para el formulario usando Zod
 */
const schema = z.object({
    email: z.string().email({ message: "Correo invalido" }),
    password: z.string().min(1, { message: "Contraseña invalida" })
});

/**
 * Componente UserDetails
 * Muestra los detalles del usuario autenticado y permite actualizar el teléfono.
 */
function UserDetails() {
    const [user, setUser] = useState(null);

    /**
     * Recupera los datos del usuario desde sessionStorage cuando el componente se monta.
     */
    useEffect(() => {
        const usuarioGuardado = sessionStorage.getItem('usuario');
        if (usuarioGuardado) {
            setUser(JSON.parse(usuarioGuardado));
        }
    }, []);

    /**
     * Maneja el envío del formulario para actualizar el teléfono del usuario.
     * @param {Object} data - Los datos del formulario.
     */
    const onSubmit = async (data) => {
        try {
            console.log("aqui");
        } catch (err) {
            console.log(err.message);
        }
    };

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });

    // Muestra un mensaje de carga si el usuario no está disponible
    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div className='todo'>
            <Cabecera />
            <div className="user-details-container">
                <h2 className="user-details-title">Detalles del Usuario</h2>
                <div className='separador'></div>
                <div className="user-details-item">
                    <span className="user-details-label">Correo:</span>
                    <span className="user-details-value">{user.correo}</span>
                </div>
                <div className="user-details-item">
                    <span className="user-details-label">Nombre:</span>
                    <span className="user-details-value">{user.nombre}</span>
                </div>
                <div className="user-details-item">
                    <span className="user-details-label">NUIP Usuario:</span>
                    <span className="user-details-value">{user.nuipusuario}</span>
                </div>
                
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className="user-details-item">
                        <span className="user-details-label">Teléfono:</span>
                        <input
                            type="text"
                            name="telefono"
                            value={user.telefono}
                        />
                    </div>
                    <Button variant="success" type="submit" className="update-button">
                        Actualizar
                    </Button>
                </Form>
            </div>
            <Footer />
        </div>
    );
}

export default UserDetails;

