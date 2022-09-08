import {Box, Typography, Modal as ModalBox, Grid} from '@mui/material';
import {DirectionsBike, LocalParking} from "@mui/icons-material";

const style = {
    modalBox: {
        position: "absolute",
        top: "50%",
        left: '50%',
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "background.paper",
        p: 4
    }
  };

interface Props {
    station: Station | Address;
    open: boolean;
    handleClose: () => void ;
}

const Modal = ({station, open, handleClose}: Props) => {

    console.log(typeof station);

    return (
            <ModalBox
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            {'name' in station ? 
                (<Box sx={style.modalBox}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Typography variant="h6" gutterBottom component="h2">
                                {station.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom component="div">
                                {station.status}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2" gutterBottom component="div" >
                                {station.address}
                            </Typography>
                        </Grid>
                        <Grid item xs={5}>
                            <Box>
                                {station.available_bikes}
                                <DirectionsBike sx={{pl: 2}}/>
                            </Box>
                        </Grid>
                        <Grid item xs={5}>
                            {station.available_bike_stands}
                            <LocalParking sx={{pl: 2}}/>
                        </Grid>
                    </Grid>
                </Box>)
            :
                (<Box sx={style.modalBox}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="subtitle2" gutterBottom component="div" >
                                    {station.address}
                                </Typography>
                            </Grid>
                        </Grid>
                </Box>)
            }
                
            </ModalBox>
    )

}

export default Modal;