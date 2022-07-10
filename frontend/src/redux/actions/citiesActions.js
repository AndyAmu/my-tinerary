import axios from 'axios'

const citiesActions = {
    getCities:() => {
        return async(dispatch, getstate) => {
            const res = await axios.get('http://localhost:4000/api/cities')
            dispatch({type: 'GETCITIES', payload:res.data.response.cities})
        }
    },
    getOneCity: (id) => {
        return async(dispatch,getstate) => {
            // eslint-disable-next-line
            const res = await axios. get(`http://localhost:4000/api/cities/${id}`)
            dispatch ({type: 'GET_ONE_CITY', payload:res.data.response.city})
        }
    },
    filterCities: (input)=>{
        return async(dispatch,getState) =>{
            dispatch({type:"FILTERCITIES",payload:input})
        }
    }
}
export default citiesActions