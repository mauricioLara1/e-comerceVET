import Carousel from 'react-bootstrap/Carousel';
import Logo from './Logo la merced.png';
import img1 from './imagenes/promo-la-merced.jpg'
import img2 from './imagenes/dia-del-gato-la-merced.jpg'
import img3 from './imagenes/servicios-la-merced.jpg'
import './carrusel.css'
export default function Carrusel() {
    return (
        <div className='todo'>
            <Carousel>
                <Carousel.Item>
                    <img
                        width={1920}
                        height={500}
                        className='d-block w-100'
                        src={img1}
                        alt='primer imagen' />
                    {/* <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={900}
                        height={500}
                        className='d-block w-100'
                        src={img2}
                        alt='segunda imagen' />
                    {/* <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption> */}
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={900}
                        height={500}
                        className='d-block w-100'
                        src={img3}
                        alt='tercer imagen' />
                    {/* <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption> */}
                </Carousel.Item>
            </Carousel>
        </div>

    );
}

