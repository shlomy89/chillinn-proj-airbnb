import { StayPreview } from './stay-preview.jsx'

export function StayList({ stays, onRemoveStay, onAddReview }) {
    
    return (
        <section className='stay-list simple-cards-grid'>
            {console.log('stays:', stays)}
            {stays?.map(stay => 
            <StayPreview onAddReview={onAddReview} key={stay._id} stay={stay} onRemoveStay={onRemoveStay}  />)}
        </section>
    )
}