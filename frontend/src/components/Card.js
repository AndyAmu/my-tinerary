import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ListSubheader from '@mui/material/ListSubheader';
import { Link as LinkRouter } from 'react-router-dom'
import '../components/Styles/Cities.css'


export default function Card({ filterCard }) {

    return (
        <>
        
        <ImageList sx={{ gap: '40px!important', marginLeft: "15%", width: "70%" }}>

            <ImageListItem className='imagenes-cities' key="Subheader" cols={2}>
                <ListSubheader sx={{backgroundColor: '#1b1919', borderRadius: '1rem', color: 'white', textAlign: 'center' }} component="div">Cities</ListSubheader>
            </ImageListItem>
            {filterCard.map((item) => (
                
                <ImageListItem key={item.image}>
                    <img className='img-cities1'
                        src={`${item.image}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.name}
                        loading="lazy"
                    />
                    <ImageListItemBar
                        title={item.name}
                        subtitle={item.country}
                        actionIcon={
                            <LinkRouter to={`/Details/${item._id}`}>
                                <IconButton
                                    sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                    aria-label={`info about ${item.name}`}
                                >
                                    <InfoIcon />
                                </IconButton>
                            </LinkRouter>
                        }
                    />
                </ImageListItem>
                
            ))}
        </ImageList>
        
        </>
    );
    
}

