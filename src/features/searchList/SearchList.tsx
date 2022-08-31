import React, {useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import {Box, Drawer, Button, List as Listing, ToggleButton, ToggleButtonGroup, Stack, CardMedia} from '@mui/material';
import {Close} from "@mui/icons-material";
import Search from '../search/Search';
import List from '../../components/list/List';
import { selectSearchTerm, selectFilter, selectStationsFiltered, updateSearch, handleChangeValue, handleSelectionValue } from './searchListSlice';

interface Props {
  stationsInit: (Station | Address)[];
  handleOpen: () => void;
  open: boolean;
};


const SearchList = ({stationsInit, handleOpen, open}: Props) => {
  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectStationsFiltered);
  const filter = useAppSelector(selectFilter);
  const searchTerm = useAppSelector(selectSearchTerm);

  useEffect(() => {
    dispatch(updateSearch({type: "stationsFiltered", input: stationsInit}));
  }, [dispatch, stationsInit]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(handleChangeValue({value: e.target.value}));
  }

  const handleSelection = (e:  React.MouseEvent<HTMLElement>) => {
    if(e.target){
      dispatch(handleSelectionValue({filter: (e.target as HTMLInputElement).value}));
    }
  }

  const style = {
    listHeader: {
      backgroundColor: "rgba(214, 104, 83, 0.5)",
    },
    alignCenter: {
      display: "flex",
      justifyContent: "center",
      margin: "0 auto",
      width:"80%",
      paddingBottom: 1
    },
    icon: {
      color: "#253659",
      margin: 1
    },
    toggleGroup: {
      backgroundColor: "rgba(255, 255, 255, 0.4)",
      "&.Mui-selected": {
        color: "rgba(255, 255, 255, 0.6)",
        backgroundColor: "rgba(214, 104, 83, 0.6)"
      }
    }, 
    logo: {
      width: "80px",
      margin: "0 auto"
    }
  };  
 

  const list = () => (
    <Stack role="search list">
      <Box sx={style.listHeader} >
        <Button onClick={handleOpen}><Close sx={style.icon}/></Button>
        <CardMedia
        component="img"
        image="/assets/img/bicycle-logo.png"
        alt="Logo TapandGo"
        sx={style.logo}
        />
        <Box sx={style.alignCenter}>
          <Search handleChange={handleChange} searchTerm={searchTerm} />
        </Box>
        <Box>
          <ToggleButtonGroup
            sx={{...style.alignCenter, marginBottom: 2}}
            size="small"
            value={filter}
            exclusive
            onChange={handleSelection}
          >
            <ToggleButton value="all" sx={style.toggleGroup}>Toutes</ToggleButton>
            <ToggleButton value="open" sx={style.toggleGroup}>Ouvertes</ToggleButton>
            <ToggleButton value="closed" sx={style.toggleGroup}>Fermées</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
      <Listing>
        <List stations={stations} />
      </Listing>
    </Stack>
  );

  return (
    <div>
          <Drawer
            open={open}
          >
           {list()}
          </Drawer>
    </div>
  );
}

export default SearchList;
