import { stayService } from "../../services/stay.service.js"

export function loadStays() {
  
  return (dispatch, getState) => {
    const { filterBy } = getState().stayModule
    stayService.query(filterBy)
      .then(stays => {
        dispatch({ type: 'SET_STAYS', stays })
      })
      .catch(err => {
        console.log('err:', err)
      })

  }
}

export function removeStay(stayId) {
  return (dispatch, getState) => {
    stayService.remove(stayId)
      .then(() => {
        dispatch({ type: 'REMOVE_STAY', stayId })
      })
      .catch(err => {
        console.log('err:', err)
      })
  }
}

export function updateStay(stay) {
  return async (dispatch) => {
    return stayService.save(stay)
      .then((savedStay) => {
        dispatch({ type: 'UPDATE_STAY', stay: savedStay })
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }
}

export function addStay(stay) {
  return async (dispatch) => {
    return stayService.save(stay)
      .then((savedStay) => {
        dispatch({ type: 'ADD_STAY', stay: savedStay })
      })
      .catch((err) => {
        console.log('err:', err)
      })
  }
}

export function setFilterBy(filterBy) {
  return (dispatch) => {
    dispatch({ type: 'SET_FILTER_BY', filterBy })
  }
}