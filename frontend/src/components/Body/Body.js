import React from 'react'
import Button from 'react-bootstrap/Button';
import {Link as LinkRouter} from "react-router-dom"

const Body = () => {

    return (
        <main className='mainPrincipal'>
            <div className='imagenprincipal'>
                <div className='Body-img'>ㅤ
                <div className='contenedor-textos-body'>
                    <h1 className='titulo-centro'>My<b className='Tinerary'>Tinerary</b> </h1>
                    <h4 className='texto-body'>Find your perfect trip, designed by insiders who know and love their cities!</h4>
                    <div className='boton-llamativo'>
                        <LinkRouter style={{linkStyle: "none"}} className='LinkRouter'  to='/Cities'>
                        
                        <Button onClick={() => { }} className='button-85' variant="warning"><b>Click Here!</b></Button>
                        
                        </LinkRouter>
                        </div>
                    </div>
                </div>
            </div>

            
        </main>
    )
}

export default Body