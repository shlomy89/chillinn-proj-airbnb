
const INITIAL_STATE = {
    stays: [],
    filterBy: null,
    isLoading: false
}

export function stayReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_STAYS':
            return {
                ...state,
                stays: action.stays
            }
        case 'ADD_STAY':
            console.log('action.stay:', action.stay);
            return {
                ...state,
                stays: [...state.stays, action.stay]
            }
        case 'REMOVE_STAY':
            return {
                ...state,
                stays: state.stays.filter(stay => stay._id !== action.stayId)
            }
        case 'UPDATE_STAY':
            return {
                ...state,
                stays: state.stays.map(stay => stay._id === action.stay._id ? action.stay : stay)
            }
        case 'SET_FILTER_BY':
            return {
                ...state,
                filterBy: { ...action.filterBy }
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state;
    }
}