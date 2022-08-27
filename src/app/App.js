import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { Container, Alert, Stack, IconButton, CardMedia, CircularProgress, Box } from '@mui/material';
import {SearchSharp, DirectionsSharp, GpsFixed } from '@mui/icons-material';
import { MapContainer } from 'react-leaflet';

import Map from "../components/map/Map";
import SearchList from '../features/searchList/SearchList';
import Routing from '../features/routing/Routing';

import { loadStations, hasErrorStations, selectStations, isLoadingStations, selectPosition } from './appSlice';
import { clear } from '../features/routing/routingSlice';
import { updateSearch } from '../features/searchList/searchListSlice';
import Geolocation from '../components/geolocation/Geolocation';

export const App = () => {
  const dispatch = useDispatch();
  const [openLateral, setOpenLateral] = useState(false);
  const [openRouting, setOpenRouting] = useState(false);
  const [geo, setGeo] = useState(false);
  const stations = useSelector(selectStations);
  const isLoading = useSelector(isLoadingStations);
  const hasError = useSelector(hasErrorStations);
  
  const position = useSelector(selectPosition);

  useEffect(() => {
    dispatch(loadStations());
  }, [dispatch]);

  const handleOpenLateral = () => {
    dispatch(updateSearch({type:"searchTerm", input: ""}));
    setOpenLateral(!openLateral);
  }

  const handleOpenRouting = () => {
    setOpenRouting(!openRouting);
    dispatch(clear({type: 'starting'}));
    dispatch(clear({type: 'arrival'}));
    dispatch(loadStations());
  }

  const handleGeolocation = () => {
    setGeo(!geo);
  }

  const style = {
    button: {
      position: "absolute",
      zIndex: 500,
    },
    icon: {
      backgroundColor: "#f99c5e", 
      color: "white", 
      borderRadius: "100px", 
      padding: 2,
      fontSize: "1.5rem",
      "&:hover": {
        backgroundColor: "#d66853"
      }
    },
    loader: {
      position: "absolute",
      top: "50vh",
      left: 0,
      right: 0,
      marginLeft: "auto",
      marginRight: "auto",
      zIndex: 500,
      width: "10%",
      ariaLabel: "loading-spinner"
    }, 
    error: {
      position: "absolute",
      bottom: "10vh",
      left: 0,
      right: 0,
      zIndex: 500,
      width: "50%",
      marginLeft: "auto",
      marginRight: "auto"
    },
    logo: {
      position: "absolute",
      top: "2vh",
      left: 0,
      right: 0,
      zIndex: 500,
      width: "80px",
      marginLeft: "auto",
      marginRight: "auto"
    }
  }


  return (
    <>
    {hasError &&   
      (<Stack spacing={2} sx={style.error}>
        <Alert variant="filled" severity="error">Erreur lors du chargement des données</Alert>
      </Stack>)
    }
    {isLoading && (
      <Box sx={style.loader}>
        <CircularProgress />
      </Box>)
    }
    <CardMedia
        component="img"
        image="/assets/img/bicycle-logo.png"
        alt="Logo TapandGo"
        sx={style.logo}
      />
    <Container maxWidth="false" style={{top: 0, left: 0, padding: 0, margin: 0}}>
      <MapContainer center={position} zoom={13} scrollWheelZoom={true} id="map" >
        <IconButton  onClick={handleGeolocation} sx={{...style.button, bottom: 150, right: 50}} data-testid="btn-lateral">
          <GpsFixed sx={style.icon} />
        </IconButton>
        <IconButton  onClick={handleOpenRouting} sx={{...style.button, bottom: 80, right: 50}}>
          <DirectionsSharp sx={style.icon} />
        </IconButton>
        <IconButton  onClick={handleOpenLateral} sx={{...style.button, bottom: 10, right: 50}} data-testid="btn-lateral">
          <SearchSharp sx={style.icon} />
        </IconButton>
        {openRouting && <Routing handleOpen={handleOpenRouting}/>}
        {openLateral && <SearchList stationsInit={stations} open={openLateral} handleOpen={handleOpenLateral} />}
        {geo && <Geolocation />}
        {stations && <Map stations={stations} isLoading={isLoading}/>}
      </MapContainer>
    </Container>
    </>
  );

}

export default App;
