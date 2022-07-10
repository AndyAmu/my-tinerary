import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useParams } from 'react-router-dom'
import '../components/Styles/Details.css'
import { useEffect } from 'react';
import { Link as LinkRouter } from "react-router-dom"
import { useDispatch } from 'react-redux';
import citiesActions from '../redux/actions/citiesActions';
import { useSelector } from 'react-redux';
import Itineraries from './Itineraries';
import itinerariesActions from '../redux/actions/itinerariesActions';
import NotItinerarios from './NotItineraries';


export default function ActionAreaCard() {
    const { id } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(citiesActions.getOneCity(id))
        dispatch(itinerariesActions.getItinerariesByCity(id))
        // eslint-disable-next-line
    }, [id])


    const itinerary = useSelector(store => store.itinerariesReducer.getItinerariesFromCity)
    // console.log(itinerary)
    const card = useSelector(store => store.citiesReducer.oneCity)

    function getItineraries() {
        dispatch(itinerariesActions.getItinerariesByCity(id))

    }

    return (
        <>
            <div className='contenedor-details'>
                
                <div key={card._id} className='details-contenedor'>
                    <Card key='index'>
                    
                        <CardActionArea sx={{backgroundColor: "#1b1919" }}>
                            <CardMedia
                                className='card-details'
                                component="img"
                                image={card.image}
                                alt={card.name}
                            />
                            <CardContent>
                                <Typography style={{ color: "white" }} gutterBottom variant="h5" component="div">
                                    {card.name}

                                </Typography>
                                <p style={{ color: "white" }}>{card.description}</p>

                            </CardContent>
                            <LinkRouter style={{ textDecoration: 'none', textAlign: 'center', color: '#ffc107' }} to='/Cities'><p>Return to Cities</p></LinkRouter>
                        </CardActionArea>
                    </Card>


                </div>
                <div>
                    {itinerary.length > 0 ?
                        itinerary.map((item, index) =>
                            <Itineraries 
                            key={index}
                            title={item.title} 
                            profilePic={item.profilePic} 
                            profilename={item.profilename} 
                            price={item.price} 
                            hours={item.hours} 
                            hashtag={item.hashtag} 
                            likes={item.likes} 
                            activities={item.activities} 
                            activitiesId={item.activitiesId}
                            id={item._id}
                            comments={item.comments}
                            getItineraries={getItineraries}
                            />) : (<NotItinerarios />)}
                </div>
            </div>

        </>
    )
        ;
}

