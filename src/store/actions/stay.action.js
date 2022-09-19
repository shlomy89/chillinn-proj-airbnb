import { stayService } from '../../services/stay.service.js'

export function loadStays() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().stayModule
            const stays = await stayService.query(filterBy)
            console.log({ stays })
            console.log('stays:', stays)

            dispatch({ type: 'SET_STAYS', stays })
        } catch (error) {
            console.log('load toys error in stay action:', error)
        }
    }
}

// async function post(entityType, newEntity) {
//   try {
//       newEntity._id = _makeId()
//       const entities = await query(entityType)
//       entities.push(newEntity)
//       _save(entityType, entities)
//       return newEntity
//   } catch (error) {
//       console.log(error, 'post function failed')
//   }
// }

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

// export function setLikeBtn() {
//   return async (dispatch) => {
//     dispatch({ type: 'SET_LIKE_BTN',  })
//   }
// }
