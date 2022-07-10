const initialState = {
    itineraries: [],
    getOneItinerary: {},
    getItinerariesFromCity: []
}

const itinerariesReducer = (state = initialState, action) => {

    switch (action.type) {
        case "GETITINERARIES":
            return {
                ...state,
                itineraries: action.payload
            }
        case "GETONEITINERARY":
            return {
                ...state,
                getOneItinerary: action.payload
            }
        case "GETITINERARIESBYCITY":
            return {
                ...state,
                getItinerariesFromCity: action.payload
            }
        default:
            return state
    }
}

export default itinerariesReducer