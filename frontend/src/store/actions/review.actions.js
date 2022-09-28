// import { showSuccessMsg } from '../../services/event-bus.service'
import { reviewService } from '../../services/review.service'

// Action Creators
export function getActionRemoveReview(reviewId) {
    return { type: 'REMOVE_REVIEW', reviewId }
}
export function getActionAddReview(review) {
    return { type: 'ADD_REVIEW', review }
}
export function getActionSetWatchedUser(user) {
    return { type: 'SET_WATCHED_USER', user }
}

export function loadReviews() {
    return async (dispatch) => {
        try {
            const reviews = await reviewService.query()
            dispatch({ type: 'SET_REVIEWS', reviews })
        } catch (err) {
            console.log('ReviewActions: err in loadReviews', err)
        }
    }
}

export function addReview(review) {
    return async (dispatch, getState) => {
        try {
            const { _id: userId } = getState().userModule.user
                ? getState().userModule.user
                : { _id: null }
            const addedReview = await reviewService.add({
                ...review,
                byUserId: userId
            })
            dispatch(getActionAddReview(addedReview))
        } catch (err) {
            console.log('ReviewActions: err in addReview', err)
            throw err
        }
    }
}

export function removeReview(reviewId) {
    return async (dispatch) => {
        try {
            await reviewService.remove(reviewId)
            dispatch(getActionRemoveReview(reviewId))
        } catch (err) {
            console.log('ReviewActions: err in removeReview', err)
            throw err
        }
    }
}
