import React from 'react'
import Carousel from 'react-grid-carousel'


const Gallery = (props) => {
    return (
        <div className='foto-dos'>
            <div className='contenedor-corousel'>
            <h3 className='Popular'>Popular MyTineraries</h3>

                <Carousel autoplay={4000} className='carousel' cols={2} rows={2} gap={10} loop mobileBreakpoint={300}>

                    {props.datos && props.datos.map((item, index) =>
                        <Carousel.Item key={index}>
                            <div className='texto-carousel'>
                                
                                <img className='img-carousel' src={item.image} alt={item.name} />

                                <h2 className='name-img-carusel'><b>{item.name}</b></h2>
                                <h4>{item.country}</h4>
                            </div>

                        </Carousel.Item>
                    )}
                </Carousel>
            </div>
        </div>
    )
}

export default Gallery