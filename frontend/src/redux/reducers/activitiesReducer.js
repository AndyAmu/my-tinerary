import axios from "axios";

//Las action solo describen que es lo que se va a pedir que haga
//Las action son el único mecanismo en Redux para enviar información a tu store.

const activitiesActions = { //action es un objeto que contiene una funcion con dos propiedades

    getActivities: () => {
        return async (dispatch, getState) => { // el dispatch es lo que recibe como parametro el reducer junto al estado para luego trabajarlo y cambiarlo
            const res = await axios.get('http://localhost:4000/api/activities')
            dispatch({type: "GET_ACTIVITIES", payload:res.data.response}) // payLoad/"carga util": nos referirnos a los datos que necesita un action en Redux para funcionar correctamente
        }
    },

    getOneActivity: (id) => {

        return async (dispatch, getState) => {
        const res = await axios.get(`http://localhost:4000/api/activities/${id}`)
        dispatch({type: "GET_ONE_ ACTIVITY", payload:res.data.response})
    }
},

getActivitiesByitinerary: (id) => { //muestra itinerarios por ID
                return async (dispatch, getState) => {
        const res = await axios.get(`http://localhost:4000/api/activitiesbyitinerary/${id}`)
        
        dispatch({type: "GET_ACTIVITY_BYITINERARY", payload:res.data.response})
    }
},
}

export default activitiesActions