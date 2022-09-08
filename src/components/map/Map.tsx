import './Map.css';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../app/hooks';
import Modal from '../modal/Modal';
import {TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import {Button, Typography} from '@mui/material';
import {iconBike, iconPlace, iconUser} from '../../utils/icons';
import { selectGeolocation } from '../../app/appSlice';
import { LatLngTuple } from 'leaflet';

const style = {
    modalBox: {
        position: "absolute",
        top: "50%",
        left: '50%',
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "background.paper",
        p: 4
    },
    backdrop: {
        background: 'rgba(255,255,255,0.2)',
    },
    loader: {
        position: "absolute",
        top: "50vh",
        left: "25vw",
        color: "rgba(0, 0, 0, 0.6)",
        zIndex: 500
    }
};

interface Props {
    stations: (Station | Address)[];
    isLoading: boolean;
}

const Map = ({stations, isLoading}: Props) => {
    const [currentStation, setCurrentStation] = useState<Station | Address | null>(null);
    const [open, setOpen] = useState(false);
    const geolocation = useAppSelector(selectGeolocation);
    const map = useMap();
    const bike = "bike";

    useEffect(() => {
        if(stations.length === 4){
            let array: LatLngTuple[] = [];
            stations.map(station => array.push([station.lat, station.long]));
            map.fitBounds(array);
            map.setZoom(12);
        }
        
    }, [stations, map])


    const handleOpen = (station: Station) => {
        setCurrentStation(station);
        setOpen(true);
    }

    const handleClose = () => {
        setCurrentStation(null);
        setOpen(false);
    }

    return (
    <>
        <TileLayer
            attribution='OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentStation && <Modal station={currentStation} open={open} handleClose={handleClose} />}
        {(!isLoading && stations?.length === 0) ? 
            <Typography variant={"h4"} sx={style.loader}>Aucune station trouvée.</Typography>
            :
            stations.map((station, index) => (
                <Marker position={[station.lat, station.long]} key={index} icon={station.type === bike ? iconBike : iconPlace}>
                    {'name' in station ? 
                        (
                        <>
                        <Popup className='popup'>
                            {station.name}
                            <br/>
                            <Button onClick={e => handleOpen(station)}>Détails</Button>
                        </Popup>
                        </>
                        )
                        :
                        null
                    }
                </Marker>
            ))
        }
        {geolocation.length !== 0 && <Marker position={geolocation} key={1} icon={iconUser}></Marker>}
    </>
    );
};

export default Map;