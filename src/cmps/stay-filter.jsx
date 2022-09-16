import { useFormRegister } from '../hooks/useFormRegister'
import {AirbnbSlider} from './range-slider.jsx'

export const StayFilter = (props) => {

    const [register] = useFormRegister({
        minPrice: 0,
        maxPrice: 5000,
        bedrooms: 0,
        propertyType: '',
        placeType: '',
        amenities: ''
    }, props.onChangeFilter)


    const classObj = { className: 'stay-filter' }

    const placeTypes = ["Entire place", "Privet room", "Shared room"]
    const propertyTypes = ["House", "Apartment", "Guesthouse", "Hotel"]
    const amenities = [
        'TV',
        'Wifi',
        'Kitchen',
        'Dryer',
        'Washer',
        'Air conditioning',
        'Heating',
        'Iron',
        'Smoking allowed',
        'Pets allowed',
        'Cooking basics'
    ]

    const resetFilters = (ev) => {
        ev.preventDefault()
        const filter = {
            minPrice: 0,
            maxPrice: 5000,
            bedrooms: 0,
            propertyType: '',
            placeType: '',
            amenities: ''
        }
        props.onChangeFilter(filter)
    }

    return (
        <form {...classObj} >
            <AirbnbSlider  />
            {/* <section>
                <label htmlFor="minPrice">Min Price</label>
                <input {...register('minPrice', 'range')} />
            </section>
            <section>
                <label htmlFor="maxPrice">Min Price</label>
                <input {...register('maxPrice', 'range')} />
            </section> */}
            <section>
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                    min={0}
                    max={8}
                    step={1}
                    {...register('bedrooms', 'range')} />
            </section>
            <section>
                <label htmlFor="placeType">Place Type</label>
                <select  {...register('placeType', 'text')}>
                    <option
                        key={placeTypes}
                        value="">
                        Any</option>
                    {placeTypes.map(placeType => <option
                        key={placeType}
                        value={placeType}>
                        {placeType}</option>)}
                </select>
            </section>
            <section>
                <label htmlFor="amenities">Amenities</label>
                <select  {...register('amenities', 'text')}>
                    <option
                        key={amenities}
                        value="">
                        Any</option>
                    {amenities.map(amenitie => <option
                        key={amenitie}
                        value={amenitie}>
                        {amenitie}</option>)}
                </select>
            </section>
            <section>
                {/* <label htmlFor="propertyType">Property Type</label> */}
                <select  {...register('propertyType', 'text')}>
                    <option
                        key={propertyTypes}
                        value="">
                        Any</option>
                    {propertyTypes.map(propertyType => <option
                        key={propertyType}
                        value={propertyType}>
                        {propertyType}</option>)}
                </select>
            </section>
            <button onClick={(ev) => resetFilters(ev)}>Reset filter</button>
        </form>
    )
}