import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StayList } from '../cmps/stay-list'
import { reviewService } from '../services/review.service'
import TransitionsModal from '../cmps/filter-modal.jsx'

import {
    loadStays,
    removeStay,
    setFilterBy
} from '../store/actions/stay.action'

export const StayApp = () => {
    const { stays } = useSelector((state) => state.stayModule)

    const dispatch = useDispatch()

    useEffect(() => {
        // console.log('loadStays:', loadStays())

        // loadStays()
        dispatch(loadStays())
    }, [])

    const onRemoveStay = (stayId) => {
        dispatch(removeStay(stayId))
    }

    const onChangeFilter = (filterBy) => {
        dispatch(setFilterBy(filterBy))
        dispatch(loadStays())
    }

    const onSetLikeBtn = () => {
        // dispatch(setLikeBtn())
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
            <TransitionsModal onChangeFilter={onChangeFilter} />
            <StayList onSetLikeBtn={onSetLikeBtn} stays={stays} />
        </div>
    )
}
