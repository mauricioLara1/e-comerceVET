import React from 'react'
import './categorias.css'
import { Link } from 'react-router-dom'

export default function Categorias() {
    return (
        <div className=' container text-center categorias-div'>
            <div className='row align-items-start'>
                
                <h2 className='titulo-separador'>Visita nuestra tienda</h2>
                <hr className='separador' />
                
                <div className='col items item-1'>
                    <Link to='/Comida'>
                        <p>Comida</p>
                    </Link>
                </div>
                <div className='col items item-2'>
                    <Link to='/Hogar'>
                        <p>Hogar</p>
                    </Link>
                </div>
                <div className='col items item-3'>
                    <Link to='/Juguetes'>
                        <p>Juguetes</p>
                    </Link>
                </div>
                <div className='col items item-4'>
                    <Link to='/Salud'>
                        <p>Salud</p>
                    </Link>
                </div>
                <div className='col items item-5'>
                    <Link to='/Viaje'>
                        <p>Viaje</p>
                    </Link>
                </div>
                <div className='col items item-6'>
                    <Link to='/Paseo'>
                        <p>Paseo</p>
                    </Link>
                </div>
            </div>

            <div className='row align-items-start'>

            </div>

            <div className='row align-items-start'>

                {/* <div className='col items item-7'>
                    <a href='#'>
                        <p>Arenas</p>
                    </a>
                </div> */}

            </div>


        </div>
    )
}
