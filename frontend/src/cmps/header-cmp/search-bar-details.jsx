import { React } from 'react'
import searchSvg from '../../assets/img/icons/search-icon.svg'

export function SearchBarDetails() {

    return (
        <div className='search-bar flex justify-space-between align-center'>
            <button className='btn-where'
            >
                Start your search
            </button>

            <div className='btn-search-container flex justify-center align-center'>
                <button
                    className='btn-search'
                >
                    <img src={searchSvg} />
                </button>
            </div>
        </div>
    )
}
