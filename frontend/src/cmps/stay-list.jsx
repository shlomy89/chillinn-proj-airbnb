import { StayPreview } from './stay-preview.jsx'

export function StayList({ stays }) {
    return (
        <section className='stay-list simple-cards-grid'>
            {stays && stays.map(stay =>
                <StayPreview
                    key={stay._id}
                    stay={stay}
                />)}
        </section>
    )
}
