import React from "react";
import {List as Listing, Typography} from '@mui/material';
import ListItem from "../listItem/ListItem";


const List = ({stations}) => {

    const style = {
        message: {
            marginTop: 2
        }
    }


    return (
        <Listing>
            {stations?.length === 0 ?
                <Typography variant={"body1"} sx={style.message}>Aucune station ne correspond à votre recherche.</Typography>
            :
                stations.map((station) => (
                    <ListItem station={station} key={station.number}/>
                ))
            }
        </Listing>
    );
};

export default List;