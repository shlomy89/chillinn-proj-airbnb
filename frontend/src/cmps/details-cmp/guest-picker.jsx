import { ReactComponent as PlusIcon } from '../../assets/img/icons/plus-icon.svg'
import { ReactComponent as MinusIcon } from '../../assets/img/icons/minus-icon.svg'
import clsx from 'clsx'

export const GuessPicker = ({ type, info, 'data-value': value, onChange }) => {
    return (
        <div className='guest-picker-container'>
            <div className='age-container'>
                <span className='type-text'>{type}</span>
                <span className='info-text'>{info}</span>
            </div>
            <div className='value-container'>
                <div
                    onClick={() => onChange(type, value - 1)}
                    className={clsx('icon-container', {
                        disabled: value <= 0
                    })}
                >
                    <MinusIcon />
                </div>
                <span>{value}</span>
                <div
                    onClick={() => onChange(type, value + 1)}
                    className={clsx('icon-container', {
                        disabled: value >= 10
                    })}
                >
                    <PlusIcon />
                </div>
            </div>
        </div>
    )
}
