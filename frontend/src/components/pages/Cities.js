import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '../Card'
import Notfound from '../Notfound';
import { useDispatch, useSelector } from 'react-redux'
import citiesActions from '../../redux/actions/citiesActions';


function Cities() {

    const [search, setSearch] = React.useState('')

    
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(citiesActions.filterCities(search))
        // eslint-disable-next-line
    }, [search])

    const city = useSelector(store => store.citiesReducer.filter)

    return (

        <div className='contenedor-cities'>
            
            <Box className='buscador' sx={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', }}>
                <input className='input' onKeyUp={(e) => { setSearch(e.target.value) }} placeholder='Search City' type='text'></input>
            </Box>
            

            <Box>
                {city?.length > 0 ? (<Card filterCard={city} />) : (<Notfound />)}
            </Box>
            
        </div>

    )

}
export default Cities