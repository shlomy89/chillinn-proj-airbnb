import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { AppHeader } from '../cmps/app-header'
import { StayFilter } from '../cmps/stay-filter'
import { StayList } from '../cmps/stay-list'
import { reviewService } from '../services/review.service'

import {
    loadStays,
    removeStay,
    setFilterBy
} from '../store/actions/stay.action'

export const StayApp = () => {

    const { stays } = useSelector((state) => state.stayModule)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadStays())
    }, [])

    const onRemoveStay = (stayId) => {
        dispatch(removeStay(stayId))
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadStays())
    }

    const onAddReview = async (stayId) => {
        const txt = prompt('Write the review here')
        try {
            const review = await reviewService.add({ txt, stayId })
        } catch (err) {
            console.error(err)
        }
    }

    // if (!stays)
    //     return (
    //         <section>
    //             <Link to='/stay/edit'>Add Stay</Link>
    //             {/* <div>Loading...</div> */}
    //         </section>
    //     )

    return (
        <div className='stay-app'>
            <StayFilter onChangeFilter={onChangeFilter} />
            {/* <StayList
                onAddReview={onAddReview}
                onRemoveStay={onRemoveStay}
                stays={stays}
            /> */}
        </div>
    )
}
