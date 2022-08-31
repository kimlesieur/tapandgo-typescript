import React from 'react';
import {Typography, Paper} from '@mui/material';


const AdressItem = ({address}: {address: Address}) => {

    const style = {
        addressItem: {
            padding: 1,
            marginTop: 1,
            marginBottom: 1
        }
    }

    return (
        <Paper sx={style.addressItem} >
            <Typography>{address.address}</Typography>
        </Paper>
    )
}

export default AdressItem;