import React from "react";
import {Box, FormControl, Input, InputAdornment} from '@mui/material';
import {Search as SearchIcon} from '@mui/icons-material';


const Search = ({handleChange, searchTerm}) => {
    return (
        <Box sx={{mt: 2, mb: 2}}>
            <FormControl variant="standard">
                <Input
                id="input-with-icon-adornment"
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                }
                onChange={e => handleChange(e)}
                value={searchTerm || ''}
                />
            </FormControl>
        </Box>
    );
};


export default Search;