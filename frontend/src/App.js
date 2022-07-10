import React from 'react'
import NavBar from "./components/Navbar/NavBar"
import Footer from "./components/Footer/Footer"
import "./components/Styles/Body.css"
import "./components/Styles/Carousel.css"
import "./components/Styles/Cities.css"
import "./components/Styles/Login.css"
import Pagehome from './components/pages/Pagehome'
import { Routes, Route } from 'react-router-dom'
import  Cities  from './components/pages/Cities'
import  Login  from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import ActionAreaCard from './components/Details'
import ScrollToTop from "react-scroll-to-top";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {useEffect} from 'react'
import citiesActions from './redux/actions/citiesActions'
import { useDispatch} from "react-redux"
import Snackbar from './components/Snackbar'
import {connect} from 'react-redux'
import userActions from './redux/actions/userActions'


function App(props) {

  const dispatch = useDispatch()

  

  useEffect(() => {
    dispatch(citiesActions.getCities())
    if(localStorage.getItem('token')!== null) {// si en el local storage tenemos token
      const token = localStorage.getItem("token")
      dispatch(userActions.verificationToken(token))
    }
    
    // eslint-disable-next-line 
  }, [])
  

  return (
    <>
    <NavBar />  
    <Routes>
      <Route path="*" element={<Pagehome />} />
      <Route path="/" element={<Pagehome />} />
      <Route path="/cities" element={<Cities />} />
      <Route path="/details/:id" element={<ActionAreaCard />} />
      {!props.user && <Route path='/login' element={<Login />} />}
      {!props.user && <Route path='/signup' element={<SignUp />} />}
    </Routes>
    
    <Snackbar />
    
    <Footer />
    <ScrollToTop
                style={{backgroundColor: 'white', opacity:'70%', width:'50px', height:'50px'}}                
                smooth
                viewBox="0 0 24 24"
                component={<FileUploadIcon />} />

    
    </>
    
  );
  
}
const mapDispathToProps ={
  verificationToken: userActions.verificationToken,
}
const mapStateToProps = (state) => {
  return{
    user: state.userReducer.user,
  }
}
export default connect(mapStateToProps, mapDispathToProps) (App);
