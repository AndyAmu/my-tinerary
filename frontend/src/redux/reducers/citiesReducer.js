const initialState = {
    cities: [],
    auxiliar: [],
    oneCity: {},
    filter: []
}

const citiesReducer = (state = initialState, action) => {

    switch(action.type){
        case "GETCITIES":
            return{
                ...state,
                cities: action.payload,
                auxiliar: action.payload,
                filter: action.payload // Cargo todas las ciudades en filter
            }
        case "GET_ONE_CITY":
            return {
                ...state,
                oneCity: action.payload,
                auxiliar: action.payload
            }
        case "FILTERCITIES":
            let cityFilter = state.cities.filter(city => city.name.toLowerCase().startsWith(action.payload.trim().toLowerCase()))
            return {
                ...state,
                filter: cityFilter
            }
        
            default:
                return state
    }
}
export default citiesReducer