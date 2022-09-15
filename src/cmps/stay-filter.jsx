import { useFormRegister } from '../hooks/useFormRegister'
import TextField from '@mui/material/TextField'

export const StayFilter = (props) => {

    const [register] = useFormRegister({
        name: '',
        minPrice: 0,
        stock: '',
        labels: '',
    }, props.onChangeFilter)

    const classObj = { className: 'stay-filter' }
    const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
    return (
        <form {...classObj} >
            <section>
                <label htmlFor="name">Name</label>
                <input {...register('name', 'text')} />
            </section>
            <section>
                <label htmlFor="minPrice">Min Price</label>
                <input {...register('minPrice', 'number')} />
            </section>
            <section>
                <label htmlFor="stock">Stock</label>
                <select  {...register('stock')}>
                    <option value="">All</option>
                    <option value="true">In stock</option>
                    <option value="false">Out of stock</option>
                </select>
            </section>
            <section>
                <label htmlFor="labels">Labels</label>
                <select  {...register('labels')}>
                    <option
                        key={labels}
                        value="">
                        All</option>
                    {labels.map(label => <option
                        key={label}
                        value={label}>
                        {label}</option>)}
                </select>
            </section>
        </form>
    )
}