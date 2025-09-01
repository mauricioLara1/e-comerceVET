import React from 'react';
import './categorias.css';
import { Link } from 'react-router-dom';

export default function Categorias() {
    return (
        <div className='container text-center categorias-div'>
            <h2 className='titulo-separador'>Visita nuestra tienda</h2>
            <hr className='separador' />

            <div className='row align-items-start categories'>
    <Link to='/Comida' className='col-12 col-md-4'>
        <div className='items item-1'>
            <p>Comida</p>
        </div>
    </Link>
    <Link to='/Hogar' className='col-12 col-md-4'>
        <div className='items item-2'>
            <p>Hogar</p>
        </div>
    </Link>
    <Link to='/Juguetes' className='col-12 col-md-4'>
        <div className='items item-3'>
            <p>Juguetes</p>
        </div>
    </Link>
    <Link to='/Salud' className='col-12 col-md-4'>
        <div className='items item-4'>
            <p>Salud</p>
        </div>
    </Link>
    <Link to='/Viaje' className='col-12 col-md-4'>
        <div className='items item-5'>
            <p>Viaje</p>
        </div>
    </Link>
    <Link to='/Paseo' className='col-12 col-md-4'>
        <div className='items item-6'>
            <p>Paseo</p>
        </div>
    </Link>
</div>

        </div>
    );
}
