import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../components/Styles/Itineraries.css'
import { Box } from '@mui/system';
import Activities from './Activities'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import itinerariesActions from '../redux/actions/itinerariesActions';
import { useEffect } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CustomInput from '@mui/base/InputUnstyled';
import SendIcon from '@mui/icons-material/Send'
import commentAction from '../redux/actions/commentsActions'

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



function Itineraries(props) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const [reload, setReload] = useState(false)
    const [likes, setLikes] = useState(props.likes)

    const user = useSelector(store => store.userReducer.user)

    const [text, setText] = useState('')

    const [modify, setModify] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(itinerariesActions.getOneItinerary(props.id))
            .then(response => setLikes(response.likes))
        //eslint-disable-next-line
    }, [!reload])

    // console.log(props)

    const like = async (event) => {
        event.preventDefault();
        await dispatch(itinerariesActions.likeDislike(props.id))
        setReload(!reload)
    }

    const handleText = (event) => {
        setText(event.target.value)
        // console.log(event)

        // console.log(text)
    }

    const handleSend = () => {
        dispatch(commentAction.addComment(text, props.id))
            .then(props.getItineraries)
            .catch(error => console.log(error))

    }

    async function handleModify(event) {
        const commentsMsj = {
            commentId: event,
            comment: modify
        }
        const res = await dispatch(commentAction.modifyComment(commentsMsj))
        setReload(!reload)
        // console.log(res)
        // .then(props.getItineraries)
    }


    async function handleDelete(id) {
        await dispatch(commentAction.deleteComment(id))
            .then(props.getItineraries)
        // console.log(id)
    }

    return (
        <Box>
            <Card className='card-itineraries' sx={{ height: "100%", backgroundColor: "#1b1919", color: "white" }}>

                <Typography sx={{ textAlign: "center", fontSize: "2rem", marginBottom: "1rem", marginTop: "1rem" }}>{props.title}</Typography>

                <CardMedia
                    sx={{ borderRadius: "50%", height: "10rem", width: "10rem" }}
                    className='img-profile'
                    component="img"
                    image={props.profilePic}

                />
                <Typography>{props.profilename}</Typography>

                <CardContent>

                    <Typography sx={{ fontSize: '1rem', color: "white", textAlign: "center" }} variant="body2" color="text.secondary">

                        {props.price}ㅤㅤ

                        {props.hours}

                    </Typography>

                    <Typography sx={{ color: "#ffc107", textAlign: "center", padding: "1rem", letterSpacing: "3pt", marginTop: '1rem' }} variant="body2" color="text.secondary">

                        {props.hashtag}
                    </Typography>

                </CardContent>

                <CardActions disableSpacing>

                    {user ?
                        <IconButton onClick={like}>
                            {likes.includes(user.id) ?
                                <FavoriteIcon sx={{ color: 'red' }} /> :
                                <FavoriteBorderIcon sx={{ color: 'white' }} />}
                            <Typography sx={{ color: 'white', marginLeft: '.4rem' }}> {likes.length} </Typography>
                        </IconButton>
                        :
                        <IconButton>
                            <FavoriteBorderIcon sx={{ color: 'white' }} />
                            <Typography sx={{ color: 'white', marginLeft: '.4rem' }}> {likes.length} </Typography>

                        </IconButton>
                    }
                    {/* <IconButton sx={{ color: "white" }} aria-label="share">
                        <ShareIcon />
                    </IconButton> */}

                    <ExpandMore
                        sx={{ color: "white" }}
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                    Activities
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent className='card-content'>

                        {props.activitiesId.length > 0 ?

                            <Activities activitiesId={props.activitiesId} />
                            :
                            <Box>
                                <Typography variant='h3'>There are no itineraries at the moment</Typography>
                            </Box>}
                    </CardContent>


                    <Box>
                        <Typography sx={{ borderRadius: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', color: 'black', fontSize: '1.4rem', marginBottom: '2rem' }}>Comment</Typography>
                    </Box>
                    <Box>

                    </Box>
                    {props.comments.map((item, index) => {
                        // console.log(item)
                        return (

                            <Box key={index} sx={{ borderRadius: '.3rem', margin: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', color: 'black', height: '10rem' }}>
                                <Box sx={{margin:'1rem', color: 'white', borderRadius: '2rem', margin: '1rem', backgroundColor: '#1b1919', marginRight: '1rem', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                                    {props.user ?

                                        <Avatar src={item.userId.photoUser} sx={{margin:'1rem', marginRight: '2rem', width: '40px', height: '40px', marginLeft: '2rem' }} /> :
                                        <Avatar sx={{ marginRight: '2rem', width: '40px', height: '40px', marginLeft: '2rem' }} alt="Remy Sharp" src={item.userId.photoUser} size="lg" />}

                                    <Typography><b>{item.userId.nameUser}</b></Typography>
                                </Box>

                                <Typography onInput={(event) => setModify(event.currentTarget.textContent)} suppressContentEditableWarning={true} contentEditable key={index} sx={{ color: 'black', fontSize: '1.4rem', marginRight: '1rem' }}>{item.comment}</Typography>

                                {props.user && props.user.id === item.userId._id ?


                                    <Box sx={{ marginRight: '2rem' }}>

                                        <Button onClick={() => handleModify(item._id)} sx={{ margin: '1rem' }} variant="outlined" color="success">
                                            <EditIcon />
                                        </Button>
                                        <Button onClick={() => handleDelete(item._id)} sx={{ margin: '1rem' }} variant="outlined" color="error">
                                            <DeleteIcon />
                                        </Button>
                                    </Box> : <Box>ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</Box>}

                            </Box>)
                    })}

                    <Box className="panel-comment" sx={{ margin: '2rem', borderRadius: '.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', color: 'black', height: '15rem' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                            {props.user ?
                                <Avatar className='avatar' src={props.user.photoUser} sx={{ marginRight: '2rem', width: '40px', height: '40px', marginLeft: '2rem', }} /> :
                                <Avatar sx={{ marginRight: '2rem', width: '40px', height: '40px', marginLeft: '2rem' }} alt="Remy Sharp" src="https://icon-library.com/images/log-in-icon/log-in-icon-15.jpg" size="lg" />}

                            {props.user ?
                                <p><b>{props.user.nameUser}</b></p> :
                                <p></p>
                            }
                        </Box>

                        <CustomInput onChange={(event) => handleText(event)} multiline placeholder="Write a comment..." />

                        <Button className='sendIcon' sx={{ marginRight: '2rem', marginLefet: '2rem' }} onClick={() => handleSend()} variant="contained" endIcon={<SendIcon />}>
                            Send
                        </Button>
                    </Box>
                </Collapse>

            </Card>

        </Box>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    }
}

export default connect(mapStateToProps, null)(Itineraries)