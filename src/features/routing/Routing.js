import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Container, Box, FormControl, Grid, Button, Typography} from '@mui/material';
import {ArrowBack, Place} from '@mui/icons-material';
import { DebounceInput } from 'react-debounce-input'
import AddressList from '../../components/addressList/AddressList';
import { updateValue, loadAddress, selectStarting, selectArrival} from './routingSlice';


const Routing = ({handleOpen}) => {
    
    const dispatch = useDispatch();
    const starting = useSelector(selectStarting);
    const arrival = useSelector(selectArrival);

    const handleChange = (e, type) => {
        const value = e.target.value;
        const input = "input";
        dispatch(updateValue({type, value, input}));
        if(value?.length > 3){
            dispatch(loadAddress({value, type}));
        }
    }

    const style = {
        container: {
            position: "absolute",
            zIndex:500,
            bottom: 0,
            left: 0,
            padding: 0
        },
        containerBox: {
            width: "100%",
            backgroundColor:"white",
            paddingTop: 20,
            paddingBottom: 50
        },
        center: {
            display:"flex", 
            justifyContent:"center", 
            alignItems:"center", 
        },
        left: {
            display:"flex", 
            justifyContent:"flex-start", 
            alignItems:"center", 
        },
        right: {
            display:"flex", 
            justifyContent:"flex-end", 
            alignItems:"center", 
        }, 
        title: {
            color: "rgb(214, 104, 83)"
        },
        input: {
            width: "90%", 
        },
        arrowBack: {
            fontSize:"1.4rem",
            fontWeight:"bolder"
        }
    };

    return (
        <Container maxWidth="false" style={style.container}>
            <Box style={style.containerBox}>
                <Grid container spacing={2} >
                    <Grid item xs={4} sx={{...style.left}}>
                        <Button  onClick={handleOpen} >
                            <ArrowBack color="black" sx={style.arrowBack}/>
                        </Button>
                    </Grid>
                    <Grid item xs={8} sx={style.left} >
                        <Typography variant="subtitle1" sx={style.title}>Itinéraire</Typography>
                    </Grid>
                    <Grid item left xs={3} sx={style.right}>
                        Départ
                    </Grid>
                    <Grid item xs={6} sx={style.center}>
                        <FormControl variant="standard" sx={style.input} >
                            <DebounceInput onChange={(e) => handleChange(e, "starting")} value={starting.input || ""} minLength={2} debounceTimeout={300} placeholder="12 rue du départ"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sx={style.left}>
                        <Place sx={{fontSize:"1.5rem", color:"red"}}/>
                    </Grid>
                    <Grid item xs={12} sx={{...style, flexDirection:"column"}}>
                        <AddressList addresses={starting.list} type={"starting"} />
                    </Grid>
                    <Grid item xs={3} sx={style.right}>
                        Arrivée
                    </Grid>
                    <Grid item xs={6} sx={style.center}>
                        <FormControl variant="standard" sx={style.input} >
                            <DebounceInput onChange={(e) => handleChange(e, "arrival")} value={arrival.input || ""} minLength={2} debounceTimeout={300} placeholder="23 rue de l'arrivée"/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} sx={style.left}>
                        <Place sx={{fontSize:"1.5rem", color:"green"}}/>
                    </Grid>
                    <Grid item xs={12} sx={{...style, flexDirection:"column"}}>
                        <AddressList addresses={arrival.list} type={"arrival"} />
                    </Grid>
                </Grid>
            </Box>
              
        </Container>
    )

}

export default Routing;