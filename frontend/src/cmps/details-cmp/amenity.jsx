import { useState } from 'react'
import { useEffect } from 'react'

export function Amenity({ amenity }) {
    const [renderIcon, setRenderIcon] = useState(null)

    useEffect(() => {
        import(
            `../../assets/img/icons/${amenity
                .replaceAll(' ', '-')
                .toLowerCase()}-icon.svg`
                ).then((_) => setRenderIcon(_.default))
    }, [])

    if (!renderIcon) {
        return null
    }

    return (
        <div className='amenity-container'>
            <img src={renderIcon} />
            {amenity}
        </div>
    )
}
