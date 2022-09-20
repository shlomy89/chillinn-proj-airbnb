import { StayPreview } from './stay-preview.jsx'

export function StayList({ stays, onSetLikeBtn }) {
    return (
        <section className='stay-list simple-cards-grid'>
            {stays.map(stay =>
                <StayPreview
                    onSetLikeBtn={onSetLikeBtn}
                    key={stay._id}
                    stay={stay}
                />)}
        </section>
    )
}
