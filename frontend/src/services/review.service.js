import { userService } from './user.service'
import {
    getActionRemoveReview,
    getActionAddReview
} from '../store/actions/review.actions'
import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_REVIEW_ADDED, SOCKET_EVENT_REVIEW_ABOUT_YOU } from './socket.service'
// import { store } from '../store/store'
// import { showSuccessMsg } from '../services/event-bus.service'

const reviewChannel = new BroadcastChannel('reviewChannel')

// ;(() => {
//   reviewChannel.addEventListener('message', (ev) => {
//     store.dispatch(ev.data)
//   })
//   socketService.on(SOCKET_EVENT_REVIEW_ADDED, (review) => {
//     console.log('GOT from socket', review)
//     store.dispatch(getActionAddReview(review))
//   })
//   socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
//     showSuccessMsg(`New review about me ${review.txt}`)
//   })
// })()

export const reviewService = {
    add,
    query,
    remove
}

function query(filterBy) {
    // var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
    // return httpService.get(`review${queryStr}`)
    return httpService.get('review', filterBy)
}

async function remove(reviewId) {
    // await httpService.delete(`review/${reviewId}`)
    await httpService.remove('review', reviewId)
    reviewChannel.postMessage(getActionRemoveReview(reviewId))
}
async function add(review) {
    const addedReview = await httpService.post('review', review)
    return addedReview
}
