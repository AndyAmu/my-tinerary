import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import '../components/Styles/Details.css'

export default function Activities(activitiesId){
    const allActivities= activitiesId
    return(
        <>
        
        {allActivities.activitiesId.map( activity =>
        
        <CardContent key={activity._id} sx={{textAlign: 'center'}}>
            
        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea>
                
                <CardMedia
                    className='img-activity'
                    component="img"
                    image={activity.image}
                    alt={activity.name}
                />
                <CardContent >
                    <Typography paragraph>{activity.name}</Typography>           
                </CardContent>
            </CardActionArea>
        </Card>
    </CardContent>
            )}
        </>
    )
}