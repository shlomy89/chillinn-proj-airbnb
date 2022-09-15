import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from "react"
import { Stack } from "@mui/system"
import { Button } from '@mui/material'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function GoogleMaps() {
    const [coordinates, setCoordinates] = useState(({ lat: 33.0038, lng: 35.0870 }))
    const zoom = 13
    const citiesPos = [
        { city: 'Haifa', pos: { lat: 32.0853, lng: 34.7818 } },
        { city: 'Tel-Aviv', pos: { lat: 29.5577, lng: 34.9519 } },
        { city: 'Eilat', pos: { lat: 32.794, lng: 34.9896 } }
    ]

    const onClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    const onChangePos = (coordinates) => {
        setCoordinates(coordinates)
    }

    return (
        <section className="map full">
            <div style={{ height: '60vh', width: '100%' }}>
                <GoogleMapReact
                    onClick={onClick}
                    bootstrapURLKeys={{ key: "AIzaSyBy0xz2MmQf1eMfcFvkVZ5Py8HHtu1Ykbs" }}
                    // defaultCenter={coordinates}
                    center={coordinates}
                    defaultZoom={zoom}
                >
                    {citiesPos.map(({ pos: { lat, lng } }) => {
                        return (<AnyReactComponent
                            key={lat}
                            lat={lat}
                            lng={lng}
                            text="📍"
                        />)
                    })}

                </GoogleMapReact>
            </div>
            <Stack spacing={2} direction="row" style={{ margin: '10px' }} className="flex justify-center align-center">
                <Button variant="outlined"
                    onClick={() => onChangePos({ lat: 32.0853, lng: 34.7818 })}>
                    Tel Aviv
                </Button>
                <Button variant="outlined"
                    onClick={() => onChangePos({ lat: 29.5577, lng: 34.9519 })}>
                    Eilat
                </Button>
                <Button variant="outlined"
                    onClick={() => onChangePos({ lat: 32.794, lng: 34.9896 })}>
                    Haifa
                </Button>
            </Stack>
        </section>
    )
}