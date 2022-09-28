import React from 'react'
import { useState, useEffect } from 'react'
import { Carousel } from 'react-responsive-carousel'

export const FilterCarousel = ({ filter }) => {
    const [icon, setIcon] = useState([])

    useEffect(() => {
        const getIcon = async () => {
            let iconUrl = []
            for (let i = 1; i <= 55; i++) {
                let imgData = await import(
                    `../assets/img/filter-carousel-icon/filter-carusel-icon_${i}.jpg`
                )
                iconUrl.push(imgData.default)
            }
            setIcon(iconUrl)
        }
        getIcon()
        // console.log('filter:', filter.labels)
    }, [])

    // function onClickItem(stayId) {
    // 	window.scrollTo(0, 0)
    //     navigate(`/stay/${stayId}`)
    // }

    return (
        <React.Fragment>
            <section className='filter-carousel-container'>
                <Carousel
                    className='filter-carousel'
                    showThumbs={false}
                    infiniteLoop
                >
                    {/* onClickItem={() => onClickItem(stay._id)}> */}
                    {icon.map((url, index) => (
                        <img className='icon-carusel' key={index} src={url} />
                    ))}
                </Carousel>
            </section>
        </React.Fragment>
    )
}
