import '../../assets/styles/cmps/_summary-price.scss'

export const SummaryPrice = ({ text, total }) => {
    return (
        <div className='summary-price'>
            <span className='text-summary-price'>{text}</span>
            <span>${total}</span>
        </div>
    )
}
