import {combineReducers} from "redux"
import citiesReducer from './citiesReducer'
import itinerariesReducer from "./itinerariesReducer"
import userReducer from "./userReducers"

const mainReducer= combineReducers({
    citiesReducer,
    itinerariesReducer,
    userReducer
})
export default mainReducer