import React, { Fragment } from 'react'
import Carousel from '../Body/Carousel'
import cities from '../datos'
import Body from "../Body/Body"


export default function Pagehome () {
    return (
        <Fragment>
        <Body />
        <Carousel datos={cities} />
        </Fragment>
    )
} 
