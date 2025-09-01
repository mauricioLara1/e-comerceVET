import React from 'react'
import logo from './Logo la merced.png'
import facebook from './iconos/facebook.svg'
import instagram from './iconos/instagram.svg'
import whatsapp from './iconos/WhatsApp (2).svg'
import mapPinPoint from './iconos/map-pinpoint.svg'
import './footer.css'

export default function Footer() {
    return (
        <div className='footer-padding '>
            <div className='footer-link'>
                <div className='footer-link-logo'>
                    <img src={logo} alt='logo' width="100" height="100" />
                    <p className='  txtwhite'>Calle 56 # 28-12 Esquina B/ Mirriñao, Palmira</p>
                </div>
                <div className='footer-links-div'>
                    <h4 className='  txtwhite'>Siguenos</h4>
                    <a href='https://www.facebook.com/Clinicaveterinarialamerced/?locale=es_LA' target='_blank'>
                        <img src={facebook} alt='icono Facebook' />
                        Facebook
                    </a>
                    <a href='https://www.instagram.com/veterinarialamerced/' target='_blank'>
                        <img src={instagram} alt='icono Instagram' />
                        Instagram
                    </a>

                    {/* 
                    El siguiente codigo es el que proporciona ws para incluir el link a
                    un chat en especifico. Buscar terminos y condiciones de esto

                    <a aria-label="Chat on WhatsApp" href="https://wa.me/1XXXXXXXXXX">
                        <img alt="Chat on WhatsApp" src="WhatsAppButtonGreenLarge.svg" />
                    </a> 
                    */}


                </div>
                <div className='footer-links-div '>
                    <h4 className='txtwhite'>Contáctanos</h4>
                    <a href='https://www.facebook.com/Clinicaveterinarialamerced/?locale=es_LA' target='_blank'>
                        <img src={whatsapp} alt='icono Whatsapp' />
                        WhatsApp
                    </a>
                </div>
                <div className='footer-links-div'>
                    <h4 className='txtwhite'>Visitanos</h4>
                    <a href='https://maps.app.goo.gl/e9cvtQSzCiyG9ppp8' target='_blank'>
                        <img src={mapPinPoint} alt="Puntero de mapa" />
                        Clinica veterinaria La merced
                    </a>
                </div>
            </div>
            <div className='footer-derechos'>
                <p className='txtwhite'>Derechos reservados</p>
            </div>
        </div>
    )
}

