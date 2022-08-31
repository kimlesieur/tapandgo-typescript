import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import { Button } from '@mui/material';
import AdressItem from '../addressItem/AddressItem';
import { useMap } from 'react-leaflet';
import { updateValue } from '../../features/routing/routingSlice';
import { loadStations, selectStations } from '../../app/appSlice';
import {getNearestStations} from '../../utils/utils';

interface Props {
    addresses: Address[];
    type: "starting" | "arrival";
}

const AddressList = ({addresses, type}: Props) => {
    const dispatch = useAppDispatch();
    const stations = useAppSelector(selectStations);
    const map = useMap();

    const handleClick = async (address: Address, type: "starting" | "arrival") => {
        dispatch(updateValue({value: address.address, type, input: "input"}));
        dispatch(updateValue({value: address, type, input: "point"}));
        dispatch(updateValue({value: [], type, input: "list"}));
        if(stations.length !== 0){
            const nearestStation: Station = await getNearestStations({lat: address.lat, long: address.long}, stations, map);
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