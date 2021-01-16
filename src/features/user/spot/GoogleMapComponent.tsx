import React, { useContext, useState, Component } from 'react';
import { useDispatch, useSelector } from "react-redux";

import GoogleMapReact, { MapOptions, Maps } from 'google-map-react';

import { selectSelectedSpot } from './spotSlice';
import customStyles from './Top.module.css';

type Props = {
    lat: number;
    lng: number;
    text: string;
}

const Pin: React.FC<Props> = ({ lat, lng, text }) => <div className={customStyles.google_map_pin}></div>


const GoogleMapComponent: React.FC = () => {

    const selectedSpot = useSelector(selectSelectedSpot);

    const createMapOptions = (maps: Maps): MapOptions => {
        return {
            mapTypeControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: maps.ControlPosition.RIGHT_TOP,
            },
            scaleControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            styles: [
                {
                    featureType: 'administrative.country',
                    elementType: 'geometry',
                    stylers: [
                        {
                            visibility: 'simplified',
                        },
                        {
                            hue: "#ff0000",
                        },
                    ],
                },
            ]
        }
    }

    const pins: {lat: number, lng: number, name: string}[] = [
        {
            lat: Number(selectedSpot.profile.latitude),
            lng: Number(selectedSpot.profile.longitude),
            name: "場所"
        }
    ]

    return (
        <div className={customStyles.google_map_wrapper}>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: `${process.env.REACT_APP_GEOCODING_API_KEY}`
                }}
                defaultCenter={{
                    lat: Number(selectedSpot.profile.latitude),
                    lng: Number(selectedSpot.profile.longitude)
                }}
                defaultZoom={15}
                options={createMapOptions}
            >
                {
                    pins.map( (pin: {lat: number, lng: number, name: string}) => (
                        <Pin
                            key={pin.lat + pin.lng}
                            lat={pin.lat}
                            lng={pin.lng}
                            text={pin.name}
                        />
                    ))
                }
            </GoogleMapReact>
        </div>
    )
}

export default GoogleMapComponent;
