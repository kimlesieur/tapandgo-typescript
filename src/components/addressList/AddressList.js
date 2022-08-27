import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import AdressItem from '../addressItem/AddressItem';
import { useMap } from 'react-leaflet';
import { updateValue } from '../../features/routing/routingSlice';
import { loadStations, selectStations } from '../../app/appSlice';
import {getNearestStations} from '../../utils/utils';


const AddressList = ({addresses, type}) => {
    const dispatch = useDispatch();
    const stations = useSelector(selectStations);
    const map = useMap();

    const handleClick = async (address, type) => {
        dispatch(updateValue({value: address.address, type, input: "input"}));
        dispatch(updateValue({value: address, type, input: "point"}));
        dispatch(updateValue({value: [], type, input: "list"}));
        if(stations.length !== 0){
            const nearestStation = await getNearestStations({lat: address.lat, long: address.long}, stations, map);
            dispatch(updateValue({value: nearestStation, type, input: "station"}));
        } else {
            console.log("impossible de charger les stations")
        }
        dispatch(loadStations());
    }


    return (
        <>
        { addresses &&
        addresses.map((address) => (
            <Button onClick={(e) => handleClick(address, type)} key={address.index}><AdressItem address={address} key={address.index}/></Button>
        ))
        }
        </>
    )
}

export default AddressList;