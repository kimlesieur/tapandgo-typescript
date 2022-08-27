import React from "react";
import {ListItem as ListElement, Typography, Grid, Box, Divider, Paper} from '@mui/material';
import {DirectionsBike, LocalParking, Circle} from "@mui/icons-material";

const ListItem = ({station}) => {

    const style = {
        alignCenter: {
            display: "flex",
            margin: "0 auto",
            width:"80%",
            padding: 2,
            marginBottom: 1
          },
          iconBike: {
            justifyContent: "end",
            color: "#f99c5e"
          },
          iconParking: {
            color: "#253659"
          }, 
          number: {
            display:"flex", 
            justifyContent:"flex-end", 
            alignItems:"center",
            paddingRight: 1
          }, 
          name: {
            fontSize: "1.2rem"
          },
          address: {
            paddingLeft: 1
          }
    }
    
    const isOpen = (status) => {
        if(status === 'Fermée'){
            return <Circle color="error" fontSize="2rem"/>;
        }
        return <Circle color="success" fontSize="2rem"/>;
    }

    return (
        <>
        <ListElement p={0}>
            <Paper sx={style.alignCenter}>
                <Grid container spacing={1}>
                    <Grid item xs={3} >
                        {isOpen(station.status)}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography sx={style.name} gutterBottom component="div">
                            {station.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        n°{station.number}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography sx={style.address} gutterBottom component="div">
                        {station.address}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} sx={style.number}>
                        <Box  >
                            {station.available_bikes}
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                            <DirectionsBike sx={style.iconBike}/>
                    </Grid>
                    <Grid item xs={1} sx={style.number}>
                        {station.available_bike_stands} 
                    </Grid>
                    <Grid item xs={5}>
                        <LocalParking sx={style.iconParking}/>
                    </Grid>
                </Grid>
            </Paper>
        </ListElement>
        <Divider/>
        </>

    );
};

export default ListItem;