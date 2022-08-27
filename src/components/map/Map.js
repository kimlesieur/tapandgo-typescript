import './Map.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import {Box, Button, Typography, Modal, Grid} from '@mui/material';
import {DirectionsBike, LocalParking} from "@mui/icons-material";
import {iconBike, iconPlace, iconUser} from '../../utils/icons';
import { selectGeolocation } from '../../app/appSlice';

const style = {
    modalBox: {
        position: "absolute",
        top: "50%",
        left: '50%',
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4
    },
    loader: {
        position: "absolute",
        top: "50vh",
        left: "25vw",
        color: "rgba(0, 0, 0, 0.6)",
        zIndex: 500
    }
  };

const Map = ({stations, isLoading}) => {
    const [currentStation, setCurrentStation] = useState(null);
    const [open, setOpen] = useState(false);
    const geolocation = useSelector(selectGeolocation);
    const map = useMap();
    const bike = "bike";

    useEffect(() => {
        if(stations.length === 4){
            let array = [];
            stations.map(station => array.push([station.lat, station.long]));
            map.fitBounds(array);
            map.setZoom(12);
        }
    }, [stations, map])


    const handleOpen = (station) => {
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
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style.modalBox}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography variant="h6" gutterBottom component="h2">
                        {currentStation ? currentStation.name : ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom component="div">
                        {currentStation ? currentStation.status : ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2" gutterBottom component="div" >
                        {currentStation ? currentStation.address : ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={5}>
                        <Box>
                            {currentStation ? currentStation.available_bikes : ''}
                            <DirectionsBike sx={{pl: 2}}/>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        {currentStation ? currentStation.available_bike_stands : ''}
                        <LocalParking sx={{pl: 2}}/>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
        {(!isLoading && stations?.length === 0) ? 
            <Typography variant={"h4"} sx={style.loader}>Aucune station trouvée.</Typography>
            :
            stations.map((station, index) => (
            <Marker position={[station.lat, station.long]} key={index} icon={station.type === bike ? iconBike : iconPlace}>
                <Popup className='popup'>
                    {station.name}
                    <br/>
                    <Button onClick={e => handleOpen(station)}>Détails</Button>
                </Popup>
            </Marker>
            ))
        }
        {geolocation.length !== 0 && <Marker position={geolocation} key={1} icon={iconUser}></Marker>}
    </>
    );
};

export default Map;