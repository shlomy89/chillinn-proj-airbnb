import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import searchSvg from '../../assets/img/icons/search-icon.svg'
import { DatePicker } from '../details-cmp/date-picker'


export function SearchInput() {


   return (
      <div className='search-bar-input flex justify-space-between align-center'>

         <form className='flex columns'>
            <div className="search-input first-input">
               <label className='search-input-btn'>
                  Where
                  <input
                     name='where'
                     type='text'
                     placeholder='Search destination' />
               </label>
            </div>
            <span className='divider'></span>
            <div className="date-picker">
               <DatePicker />
            </div>
            <span className='divider'></span>

            <div className="search-input last-input flex">
               <div className="who-input">
                  <label className='search-input-btn'>
                     Who
                     <input
                        name='guests'
                        type='text'
                        placeholder='Add guests' />
                  </label>
               </div>
               <div className='btn-search-container flex justify-center align-center'>
                  <button className='btn-search'>
                     <img src={searchSvg} />
                     &nbsp; Search
                  </button>
               </div>
            </div>
         </form>
      </div>
   )
}
