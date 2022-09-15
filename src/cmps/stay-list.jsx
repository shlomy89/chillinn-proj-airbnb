import { StayPreview } from './stay-preview'

export function StayList({ stays, onRemoveStay, onAddReview }) {
    
    return (
        <section className='stay-list simple-cards-grid'>
            {stays.map(stay => 
            <StayPreview onAddReview={onAddReview} key={stay._id} stay={stay} onRemoveStay={onRemoveStay}  />)}
        </section>
    )
}