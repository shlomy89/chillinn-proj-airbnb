import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import searchSvg from '../../assets/img/icons/search-icon.svg'

export function SearchBar({ handelClick }) {

    return (
        <div className='search-bar flex justify-space-between align-center'>
            <button className='btn-where'
                onClick={() => handelClick('where')}
            >
                Anywhere
            </button>

            <span className='divider'></span>

            <button className='btn-dates'
                onClick={() => handelClick('dates')}
            >
                AnyWeek
            </button>

            <span className='divider'></span>

            <button
                className='btn-guests'
                onClick={() => handelClick('guests')}
            >
                Add guests
            </button>

            <div className='btn-search-container flex justify-center align-center'>
                <button
                    className='btn-search'
                    onClick={() => handelClick('search')}
                >
                    <img src={searchSvg} />
                </button>
            </div>
        </div>
    )
}
