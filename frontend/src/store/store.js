import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore as createStore
} from 'redux'
import thunk from 'redux-thunk'
import { orderReducer } from './reducers/order.reducer'
import { reviewReducer } from './reducers/review.reducer'
import { stayReducer } from './reducers/stay.reducer'
import { userReducer } from './reducers/user.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    stayModule: stayReducer,
    userModule: userReducer,
    orderModule: orderReducer,
    reviewModule: reviewReducer
})

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)
window.gStore = store
