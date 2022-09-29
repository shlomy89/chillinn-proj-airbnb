import { stayService } from '../../services/stay.service.js'

export function loadStays() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().stayModule
            dispatch({ type: 'SET_LOADING', isLoading: true })
            const stays = await stayService.query(filterBy)
            dispatch({ type: 'SET_STAYS', stays })
            console.log('stays.length:', stays.length)
        } catch (error) {
            console.log('load stays error in stay action:', error)
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function loadHostStays() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().stayModule
            dispatch({ type: 'SET_LOADING', isLoading: true })
            const stays = await stayService.query(filterBy)
            console.log({ stays })
            dispatch({ type: 'SET_HOST_STAYS', stays })
        } catch (error) {
            console.log('load stays error in stay action:', error)
        } finally {
            dispatch({ type: 'SET_LOADING', isLoading: false })
        }
    }
}

export function removeStay(stayId) {
    return async (dispatch, getState) => {
        try {
            await stayService.remove(stayId)
            dispatch({ type: 'REMOVE_STAY', stayId })
        } catch (error) {
            console.log('remove stay error in stay action:', error)
        }
    }
}

export function updateStay(stay) {
    return async (dispatch) => {
        try {
            await stayService.save(stay)
            dispatch({ type: 'UPDATE_STAY', stay })
        } catch (error) {
            console.log('updated stay error in stay action:', error)
        }
    }
}

export function addStay(stay) {
    return async (dispatch) => {
        try {
            await stayService.save(stay)
            dispatch({ type: 'ADD_STAY', stay })
        } catch (error) {
            console.log('add stay error in stay action:', error)
        }
    }
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER_BY', filterBy })
    }
}
