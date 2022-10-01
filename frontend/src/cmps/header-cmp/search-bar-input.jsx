import { useDispatch, useSelector } from 'react-redux'
import { React, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import searchSvg from '../../assets/img/icons/search-icon.svg'
import { DatePicker } from './header-date-picker.jsx'
import { find, sum, sumBy, values } from 'lodash'
import { Dropdown } from '../details-cmp/guests-dropdown.jsx'

export function SearchInput({ handelClick }) {

   const agesInfo = {
      Adults: {
         type: 'Adults',
         info: 'Age 13+',
         value: 1,
      },
      Children: {
         type: 'Children',
         info: 'Ages 2-12',
         value: 0,
      },
      Infants: {
         type: 'Infants',
         info: 'Under 2',
         value: 0,
      },
   }

   const { filterBy } = useSelector(state => state.stayModule)

   const [filter, setFilter] = useState(filterBy)
   const [startDate, setStartDate] = useState(null)
   const [endDate, setEndDate] = useState(null)
   const [agesData, setAgesData] = useState(agesInfo)

   const dispatch = useDispatch()

   useEffect(() => {
      setFilter(filterBy)
   }, [filterBy])
   
   useEffect(() => {
      console.log('filter:', filter)
   }, [filter])

   // const onClick = () => {
   //       setFilter(prevFields => ({
   //          ...prevFields,
   //          dates: {
   //              ...prevFields.dates,
   //              [type]: !prevFields.dates[type]
   //          }
   //      }))
      // dispatch(setFilterBy(filter))
      // dispatch(loadStays())
      //    dispatch(
      //       onAddOrder({
      //          startDate,
      //          endDate,
      //          guestsNum: sumBy(values(agesData), 'value'),
      //       })
      //    )
   // }

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
               <DatePicker
                  checkIn={startDate}
                  checkOut={endDate}
                  setCheckIn={setStartDate}
                  setCheckOut={setEndDate}
               />
            </div>
            <span className='divider'></span>

            <div className="search-input last-input flex">
               <div className="who-input">
                  <label className='search-input-btn'>
                     Who
                     {/* <Dropdown
                        agesData={agesData}
                        setAgesData={setAgesData} /> */}
                     <input
                        name='guests'
                        type='text'
                        placeholder='Add guests' />
                  </label>
               </div>
               <div className='btn-search-container flex justify-center align-center'>
                  <button
                     onClick={() => handelClick('findStays')}
                     className='btn-search'>
                     <img src={searchSvg} />
                     &nbsp; Search
                  </button>
               </div>
            </div>
         </form>
      </div>
   )
}
