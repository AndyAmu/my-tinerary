import axios from "axios";


const itinerariesActions = {

    getItineraries: () => {
        return async (dispatch, getState) => {
            const res = await axios.get("http://localhost:4000/api/itineraries%22")
        // console.log(res)
        dispatch({ type: "GETITINERARIES", payload: res.data.response.itineraries })

    }
    },


    getOneItinerary: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/itinerary/${id}`)
                // console.log(res)
                return res.data.response.itinerary
        // dispatch({ type: 'GETONEITINERARY', payload: res.data.response.itinerary })
    }
    },

    getItinerariesByCity: (id) => {
        return async (dispatch, getState) => {
            const res = await axios.get(`http://localhost:4000/api/ItinerariesByCity/${id}`)
            // console.log(res)
        dispatch({ type: 'GETITINERARIESBYCITY', payload: res.data.response })
    }
    },

    likeDislike: (id) => {
        const token = localStorage.getItem('token')//levantamos el token que va necesitar passport
        //console.log(token)
        return async () => {
            try {
                let response = await axios.put(`http://localhost:4000/api/like/${id}`, {}, // ponemos un objeto vacio para pasarlo como primer parametro
                {headers: {
                    Authorization: 'Bearer '+token
                    }
                })
                console.log(response)
                return response
                
            }catch (error) {
                console.log(error)
            }
        }
    },

    

}

export default itinerariesActions