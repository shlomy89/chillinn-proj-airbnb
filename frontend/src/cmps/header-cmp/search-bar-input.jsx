import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import searchSvg from '../../assets/img/icons/search-icon.svg'

export function SearchInput() {


   return (
      <div className='search-bar flex justify-space-between align-center'>
         <button className='btn-where' >
            bksdfsdfds
         </button>

         <span className='divider'></span>

         <button className='btn-dates' >
            AnyWeek
         </button>

         <span className='divider'></span>

         <button
            className='btn-guests'
         >
            Add guests
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
